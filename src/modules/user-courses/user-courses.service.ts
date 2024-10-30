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
  normalizedWeight: number;
}

interface JobScore {
  nameEn: string;
  nameTh: string;
  rawScore: number;
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
    // Then calculate actual weights for user's courses
    const skillWeights = await this.calculateSkillWeights(skillMappings, courseMap);
    // Create array and sort it
    const results = Array.from(skillWeights.values()).map(
      skill =>
        new UserSkillResponseDto({
          nameEn: skill.nameEn,
          nameTh: skill.nameTh,
          weight: Math.min(skill.normalizedWeight, 10),
        }),
    );

    return [...results].sort((a, b) => b.weight - a.weight);
  }

  private async maxPossibleWeight(name: string): Promise<number> {
    const mappings = await this.prisma.skillCourseMapping.findMany({
      where: {
        from: name,
      },
    });

    const maxWeight = mappings.reduce((sum, mapping) => sum + mapping.weight, 0);

    return maxWeight;
  }

  private async calculateSkillWeights(
    skillMappings: SkillCourseMapping[],
    courseMap: Map<string, CourseNames>,
  ): Promise<Map<string, SkillWeight>> {
    const skillWeights = new Map<string, SkillWeight>();

    for (const mapping of skillMappings) {
      const key = mapping.from;
      const courseName = mapping.to;
      const courseExists = Array.from(courseMap.values()).some(
        course => course.nameEn === courseName,
      );

      if (courseExists) {
        const current = skillWeights.get(key) ?? {
          nameEn: mapping.from,
          nameTh: mapping.fromTh,
          weight: 0,
          normalizedWeight: 0,
        };

        const newWeight = current.weight + mapping.weight;
        const maxWeight = await this.maxPossibleWeight(mapping.from);
        const normalizedWeight = Math.round((newWeight / maxWeight) * 10);

        skillWeights.set(key, {
          ...current,
          weight: newWeight,
          normalizedWeight,
        });
      }
    }

    return skillWeights;
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

  async getTopJobsForUser(user: User): Promise<TopJobsResponseDto> {
    const userSkills = await this.getUserSkills(user);
    const jobScores = await this.calculateJobScores(userSkills);
    const maxScores = await this.calculateMaxJobScores(userSkills);
    const topJobs = this.getTopThreeJobs(jobScores, maxScores);

    return new TopJobsResponseDto({ topJobs });
  }

  private async calculateJobScores(
    userSkills: UserSkillResponseDto[],
  ): Promise<Map<string, JobScore>> {
    const skillIds = userSkills.map(skill => skill.nameEn);
    const jobSkillMappings = await this.getJobSkillMappings(skillIds);
    const jobScores = new Map<string, JobScore>();

    for (const jobSkill of jobSkillMappings) {
      const userSkill = userSkills.find(skill => skill.nameEn === jobSkill.to);

      if (userSkill) {
        const normalizedSkillWeight = userSkill.weight / 10;
        const scoreIncrement = normalizedSkillWeight * jobSkill.weight;

        this.updateJobScore(jobScores, jobSkill, scoreIncrement);
      }
    }

    return jobScores;
  }

  private async maxPossibleWeightJobs(name: string): Promise<number> {
    const mappings = await this.prisma.skillJobMapping.findMany({
      where: {
        from: name,
      },
    });

    const maxWeight = mappings.reduce((sum, mapping) => sum + mapping.weight, 0);

    return maxWeight;
  }

  private async calculateMaxJobScores(
    userSkills: UserSkillResponseDto[],
  ): Promise<Map<string, number>> {
    const skillIds = userSkills.map(skill => skill.nameEn);
    const jobSkillMappings = await this.getJobSkillMappings(skillIds);
    const maxScores = new Map<string, number>();
    const jobGroups = jobSkillMappings.reduce((groups, mapping) => {
      const key = mapping.from;

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)?.push(mapping);

      return groups;
    }, new Map<string, SkillJobMapping[]>());

    for (const [jobId] of jobGroups) {
      const maxScore = await this.maxPossibleWeightJobs(jobId);

      maxScores.set(jobId, maxScore);
    }

    return maxScores;
  }

  private updateJobScore(
    jobScores: Map<string, JobScore>,
    jobSkill: SkillJobMapping,
    scoreIncrement: number,
  ): void {
    const currentScore = jobScores.get(jobSkill.from)?.rawScore ?? 0;

    jobScores.set(jobSkill.from, {
      nameEn: jobSkill.from,
      nameTh: jobSkill.fromTh,
      rawScore: currentScore + scoreIncrement,
    });
  }

  private getTopThreeJobs(
    jobScores: Map<string, JobScore>,
    maxScores: Map<string, number>,
  ): JobScoreDto[] {
    return Array.from(jobScores.values())
      .map(job => {
        const maxScore = maxScores.get(job.nameEn) ?? 1;
        const normalizedScore = Math.min(Math.round((job.rawScore / maxScore) * 10), 10);

        return new JobScoreDto({
          nameEn: job.nameEn,
          nameTh: job.nameTh,
          relevancyScore: normalizedScore,
        });
      })
      .sort((a, b) => b.relevancyScore - a.relevancyScore)
      .slice(0, 3);
  }

  async getJobSkillMappings(skillIds: string[]) {
    return this.prisma.skillJobMapping.findMany({
      where: {
        toType: 'skill',
        to: {
          in: skillIds,
        },
      },
    });
  }
}
