import { ConflictException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCourseDto } from './dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly baseInclude = {
    sections: {
      include: {
        sectionTeachers: {
          include: {
            teacher: true,
          },
        },
        sectionTimes: true,
      },
    },
  };

  async createCourse(createCourseDto: CreateCourseDto) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: createCourseDto.id,
      },
    });

    if (course) {
      throw new ConflictException('Course already exists');
    }

    const createdCourse = await this.prisma.course.create({
      data: {
        ...createCourseDto,
        sections: {
          create: createCourseDto.sections.map(({ teachers, ...section }) => ({
            ...section,
            sectionTimes: {
              create: section.sectionTimes,
            },
            sectionTeachers: {
              create: teachers.map(teacher => ({
                teacher: {
                  connectOrCreate: {
                    where: {
                      firstnameTh_lastnameTh: {
                        firstnameTh: teacher.firstnameTh,
                        lastnameTh: teacher.lastnameTh,
                      },
                    },
                    create: teacher,
                  },
                },
              })),
            },
          })),
        },
      },
      include: this.baseInclude,
    });

    return createdCourse;
  }
}
