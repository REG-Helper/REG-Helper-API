import { Injectable } from '@nestjs/common';

import { Course, CourseGroup, CourseSubGroup, User } from '@prisma/client';

import { CoursesService } from '../courses/courses.service';
import { PrismaService } from '../prisma/prisma.service';

import { ICalcCourseSyllabus } from '@/shared/interfaces';
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
}
