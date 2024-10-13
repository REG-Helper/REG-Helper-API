import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { checkRemainCourse } from '@/shared/utils/calc-grade';

@Injectable()
export class UserCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async getRemainCourse(user: User) {
    const userCourses = await this.prisma.userCourses.findMany({
      where: {
        userId: user.studentId,
      },
      select: {
        courseId: true,
      },
    });

    const userCourseIds = userCourses.map(course => course.courseId);
    const learnerCourse = await this.prisma.course.findMany({
      where: {
        id: {
          in: userCourseIds,
        },
      },
      select: {
        id: true,
        group: true,
        subGroup: true,
        credit: true,
      },
    });

    const learnerCourseIds = learnerCourse.map(course => course.id);
    const missingCourseIds = userCourseIds.filter(id => !learnerCourseIds.includes(id));

    missingCourseIds.forEach(id => {
      learnerCourse.push({
        id,
        group: 'FREE_ELEC',
        subGroup: 'FREE_ELEC',
        credit: 3,
      });
    });

    return checkRemainCourse(learnerCourse);
  }
}
