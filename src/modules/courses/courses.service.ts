import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto, SectionResponseDto } from '../sections/dto';
import { CreateTeacherDto } from '../teachers/dto';

import { CourseResponseDto, CreateCourseDto, UpdateCourseDto } from './dto';

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
    await this.getCourseByIdOrThrow(courseId);

    const sectionsData = updateCourseDto?.sections?.length
      ? {
          deleteMany: {},
          create: this.createSectionsData(updateCourseDto?.sections),
        }
      : undefined;

    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...updateCourseDto,
        sections: sectionsData,
      } as Prisma.CourseUpdateInput,
      include: this.baseInclude,
    });

    return CourseResponseDto.formatCourseResponse(updatedCourse);
  }

  async getCourses(): Promise<CourseResponseDto[]> {
    const courses = await this.prisma.course.findMany({ include: this.baseInclude });

    return CourseResponseDto.formatCoursesResponse(courses);
  }

  async getCourseByIdOrThrow(courseId: string): Promise<CourseResponseDto> {
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
    await this.getCourseByIdOrThrow(courseId);

    const deletedCourse = await this.prisma.course.delete({
      where: {
        id: courseId,
      },
      include: this.baseInclude,
    });

    return CourseResponseDto.formatCourseResponse(deletedCourse);
  }

  async createCourseSection(
    courseId: string,
    createSectionDto: CreateSectionDto,
  ): Promise<SectionResponseDto> {
    await this.getCourseByIdOrThrow(courseId);

    const { teachers, ...sectionDetail } = createSectionDto;
    const createdSection = await this.prisma.section.create({
      data: {
        ...sectionDetail,
        sectionTeachers: this.createTeachersData(teachers),
        course: {
          connect: {
            id: courseId,
          },
        },
      },
      include: this.baseInclude.sections.include,
    });

    return SectionResponseDto.formatSectionResponse(createdSection);
  }

  private createSectionsData(sections: UpdateCourseDto['sections']) {
    return sections?.map(({ teachers, ...section }) => ({
      ...section,
      sectionTeachers: this.createTeachersData(teachers),
    }));
  }

  private createTeachersData(teachers: CreateTeacherDto[]) {
    return {
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
    };
  }
}
