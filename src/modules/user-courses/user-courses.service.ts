import { Injectable } from '@nestjs/common';

import {
  Course,
  CourseGroup,
  CourseSubGroup,
  Prisma,
  SkillCourseMapping,
  User,
} from '@prisma/client';

import { CoursesService } from '../courses/courses.service';
import { PrismaService } from '../prisma/prisma.service';

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
}
