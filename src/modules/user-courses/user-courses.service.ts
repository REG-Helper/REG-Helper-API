import { Injectable } from '@nestjs/common';

import { Course, CourseGroup, CourseSubGroup, User } from '@prisma/client';

import { CoursesService } from '../courses/courses.service';
import { PrismaService } from '../prisma/prisma.service';

import { ICalcRemainCourse } from '@/shared/interfaces';
import { checkRemainCourse } from '@/shared/utils/calculate-grade';

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
      },
    });

    const userCourseIds = userCourses.map(course => course.courseId);
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

    const missingCourseIds = await this.courseService.findMissingCourses(userCourseIds);

    missingCourseIds.forEach(course => {
      learnerCourse.push({
        id: course.id,
        group: CourseGroup.FREE_ELEC,
        subGroup: CourseSubGroup.FREE_ELEC,
        credit: 3,
      } as Course);
    });

    const remainingIds = checkRemainCourse(learnerCourse);
    const remainingCourse = await this.getRemainingCourseData(remainingIds);

    return remainingCourse;
  }

  async getRemainingCourseData(remainingCourse: ICalcRemainCourse) {
    const courseKeys = [
      'specificCoursesCore',
      'specificCoursesRequired',
      'genEdFundamentals',
      'genEdLanguageCommunication',
      'genEdFacultySpecific',
    ];

    for (const key of courseKeys) {
      remainingCourse[key] = await this.courseService.findCourses({
        where: {
          id: { in: remainingCourse[key] },
        },
      });
    }

    return remainingCourse;
  }
}
