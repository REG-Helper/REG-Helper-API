import { Injectable } from '@nestjs/common';

import {
  Course,
  CourseGroup,
  CourseSubGroup,
  Prisma,
  SkillCourseMapping,
  SkillJobMapping,
  User,
} from '@prisma/client';

import { CoursesService } from '../courses/courses.service';
import { PrismaService } from '../prisma/prisma.service';

import { JobScoreDto, TopJobsResponseDto } from './dto/response/get-top-jobs.dto';
import { UserSkillResponseDto } from './dto/response/get-user-skills.dto';

import { ICalcCourseSyllabus } from '@/shared/interfaces';
import { checkRemainCourse } from '@/shared/utils/calculate-grade';
interface CourseNames {
  nameEn: string;
  nameTh: string;
}

interface SkillWeight {
  nameEn: string;
  nameTh: string;
  weight: number;
}

interface JobScore {
  nameEn: string;
  nameTh: string;
  score: number;
}

type UserCourseSelect = Prisma.UserCoursesGetPayload<{
  select: { courseId: true };
}>;

type CourseSelect = Prisma.CourseGetPayload<{
  select: { id: true; nameEn: true; nameTh: true };
}>;

@Injectable()
export class UserCoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseService: CoursesService,
  ) {}

  async getRemainingCourse(user: User) {
    const userCourses = await this.prisma.userCourses.findMany({
      where: {
        userId: user.studentId,
      },
      select: {
        courseId: true,
        grade: true,
      },
    });

    const userCourseIds = userCourses
      .filter(course => course.grade == null || !['U', 'F'].includes(course.grade))
      .map(course => course.courseId);

    const learnerCourse = await this.courseService.findCourses({
      where: {
        id: { in: userCourseIds },
      },
      select: {
        id: true,
        group: true,
        subGroup: true,
        credit: true,
      },
    });

    const missingCourseIds = await this.courseService.findMissingCourseIds(userCourseIds);

    missingCourseIds.forEach(course => {
      learnerCourse.push({
        id: course,
        group: CourseGroup.FREE_ELEC,
        subGroup: CourseSubGroup.FREE_ELEC,
        credit: 3,
      } as Course);
    });

    const remainingIds = checkRemainCourse(learnerCourse);
    const remainingCourse = await this.getRemainingCourseData(remainingIds);

    return remainingCourse;
  }

  async getRemainingCourseData(remainingCourse: ICalcCourseSyllabus) {
    for (const key in remainingCourse) {
      if (remainingCourse[key].courses.fixedCourses instanceof Set) {
        remainingCourse[key].courses.fixedCourses = await this.courseService.findCourses({
          where: {
            id: { in: Array.from(remainingCourse[key].courses.fixedCourses) },
          },
        });
      }
    }

    return remainingCourse;
  }

  async getUserSkills(user: User): Promise<UserSkillResponseDto[]> {
    const userCourses = await this.getPassedUserCourses(user.studentId);
    const courseIds = this.extractCourseIds(userCourses);
    const courses = await this.getCourseDetails(courseIds);
    const courseMap = this.createCourseNameMap(courses);
    const courseNames = Array.from(courseMap.values()).map(course => course.nameEn);
    const skillMappings = await this.getSkillMappings(courseNames);
    const skillWeights = this.calculateSkillWeights(skillMappings, courseMap);

    return this.formatAndSortResults(skillWeights);
  }

  private async getPassedUserCourses(studentId: string): Promise<UserCourseSelect[]> {
    const result = await this.prisma.userCourses.findMany({
      where: {
        userId: studentId,
        OR: [{ grade: null }, { NOT: { grade: { in: ['F', 'U'] } } }],
      },
      select: {
        courseId: true,
      },
    });

    return result;
  }

  private extractCourseIds(userCourses: UserCourseSelect[]): string[] {
    return userCourses.map(course => course.courseId);
  }

  private async getCourseDetails(courseIds: string[]): Promise<CourseSelect[]> {
    const result = await this.prisma.course.findMany({
      where: {
        id: {
          in: courseIds,
        },
      },
      select: {
        id: true,
        nameEn: true,
        nameTh: true,
      },
    });

    return result;
  }

  private createCourseNameMap(courses: CourseSelect[]): Map<string, CourseNames> {
    return new Map(
      courses.map(course => [
        course.id,
        {
          nameEn: course.nameEn,
          nameTh: course.nameTh,
        },
      ]),
    );
  }

  private async getSkillMappings(courseNames: string[]): Promise<SkillCourseMapping[]> {
    return this.prisma.skillCourseMapping.findMany({
      where: {
        toType: 'subject',
        to: {
          in: courseNames,
        },
      },
    });
  }

  private calculateSkillWeights(
    skillMappings: SkillCourseMapping[],
    courseMap: Map<string, CourseNames>,
  ): Map<string, SkillWeight> {
    const skillWeights = new Map<string, SkillWeight>();

    for (const mapping of skillMappings) {
      const key = mapping.from;
      const courseName = mapping.to;
      const courseExists = Array.from(courseMap.values()).some(
        course => course.nameEn === courseName,
      );

      if (courseExists) {
        const current = skillWeights.get(key) || {
          nameEn: mapping.from,
          nameTh: mapping.fromTh,
          weight: 0,
        };

        skillWeights.set(key, {
          ...current,
          weight: current.weight + mapping.weight,
        });
      }
    }

    return skillWeights;
  }

  private formatAndSortResults(skillWeights: Map<string, SkillWeight>): UserSkillResponseDto[] {
    return Array.from(skillWeights.values())
      .map(skill => new UserSkillResponseDto(skill))
      .sort((a, b) => b.weight - a.weight);
  }

  async getTopJobsForUser(user: User): Promise<TopJobsResponseDto> {
    const userCourseSkills = await this.getUserCourseSkills(user.studentId);
    const jobScores = await this.calculateJobScores(userCourseSkills);
    const topJobs = this.getTopThreeJobs(jobScores, userCourseSkills.length);

    return new TopJobsResponseDto({ topJobs });
  }

  private async getUserCourseSkills(studentId: string) {
    const userCourses = await this.getPassedUserCourses(studentId);
    const courseIds = this.extractCourseIds(userCourses);
    const courses = await this.getCourseDetails(courseIds);
    const courseNames = courses.map(course => course.nameEn);

    return this.prisma.skillCourseMapping.findMany({
      where: {
        toType: 'subject',
        to: {
          in: courseNames,
        },
      },
    });
  }

  private async getJobSkillMappings(skillIds: string[]) {
    return this.prisma.skillJobMapping.findMany({
      where: {
        toType: 'skill',
        to: {
          in: skillIds,
        },
      },
    });
  }

  private async calculateJobScores(
    courseSkillMappings: SkillCourseMapping[],
  ): Promise<Map<string, JobScore>> {
    const userSkillIds = this.extractUniqueSkillIds(courseSkillMappings);
    const jobSkillMappings = await this.getJobSkillMappings(userSkillIds);
    const jobScores = new Map<string, JobScore>();

    for (const courseSkill of courseSkillMappings) {
      for (const jobSkill of jobSkillMappings) {
        if (courseSkill.from === jobSkill.to) {
          this.updateJobScore(jobScores, jobSkill, courseSkill.weight * jobSkill.weight);
        }
      }
    }

    return jobScores;
  }

  private extractUniqueSkillIds(courseSkillMappings: SkillCourseMapping[]): string[] {
    return [...new Set(courseSkillMappings.map(mapping => mapping.from))];
  }

  private updateJobScore(
    jobScores: Map<string, JobScore>,
    jobSkill: SkillJobMapping,
    scoreIncrement: number,
  ): void {
    const currentScore = jobScores.get(jobSkill.from)?.score ?? 0;

    jobScores.set(jobSkill.from, {
      nameEn: jobSkill.from,
      nameTh: jobSkill.fromTh,
      score: currentScore + scoreIncrement,
    });
  }

  private getTopThreeJobs(jobScores: Map<string, JobScore>, totalSkills: number): JobScoreDto[] {
    return Array.from(jobScores.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(job => this.createJobScoreDto(job, totalSkills));
  }

  private createJobScoreDto(job: JobScore, totalSkills: number): JobScoreDto {
    return new JobScoreDto({
      nameEn: job.nameEn,
      nameTh: job.nameTh,
      relevancyScore: this.calculateRelevancyScore(job.score, totalSkills),
    });
  }

  private calculateRelevancyScore(score: number, totalSkills: number): number {
    const maxPossibleScore = totalSkills * 25; // Maximum weight product is 5 * 5 = 25

    return Math.round((score / maxPossibleScore) * 100);
  }
}
