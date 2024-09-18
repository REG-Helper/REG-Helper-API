import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateCourseDto, UpdateCourseDto } from './dto';
import { CourseResponseDto } from './dto/response/course.dto';

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

  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
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
          create: this.createSectionsData(createCourseDto.sections),
        },
      },
      include: this.baseInclude,
    });

    return CourseResponseDto.formatCourseResponse(createdCourse);
  }

  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    await this.getCourse(courseId);

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...updateCourseDto,
        sections: {
          deleteMany: {},
          create: this.createSectionsData(updateCourseDto?.sections),
        },
      },
      include: this.baseInclude,
    });

    return CourseResponseDto.formatCourseResponse(updatedCourse);
  }

  async getCourses(): Promise<CourseResponseDto[]> {
    const courses = await this.prisma.course.findMany({ include: this.baseInclude });

    return CourseResponseDto.formatCoursesResponse(courses);
  }

  async getCourse(courseId: string): Promise<CourseResponseDto> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: this.baseInclude,
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return CourseResponseDto.formatCourseResponse(course);
  }

  async deleteCourse(courseId: string): Promise<CourseResponseDto> {
    await this.getCourse(courseId);

    const deletedCourse = await this.prisma.course.delete({
      where: {
        id: courseId,
      },
      include: this.baseInclude,
    });

    return CourseResponseDto.formatCourseResponse(deletedCourse);
  }

  private createSectionsData(sections: UpdateCourseDto['sections']) {
    return sections?.map(({ teachers, ...section }) => ({
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
    }));
  }
}
