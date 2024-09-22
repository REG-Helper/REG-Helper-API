import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from '../sections/dto';
import { SectionsService } from '../sections/sections.service';
import { CreateTeacherDto } from '../teachers/dto';

import { CourseResponseDto, CreateCourseDto, GetCoursesQueryDto, UpdateCourseDto } from './dto';

import { PaginateResponseDto } from '@/shared/dto';
import { CourseWithSections, SectionWithTeachers } from '@/shared/interfaces';

@Injectable()
export class CoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sectionsService: SectionsService,
  ) {}

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

  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseWithSections> {
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

    return createdCourse;
  }

  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseWithSections> {
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

    return updatedCourse;
  }

  async getCourses(
    getCoursesQueryDto: GetCoursesQueryDto,
  ): Promise<PaginateResponseDto<CourseResponseDto>> {
    console.log(getCoursesQueryDto);

    const { page, perPage, id, name, day, group, subGroup, startAt, endAt, year, semester } =
      getCoursesQueryDto;

    const skip = (page - 1) * perPage;
    const query: Prisma.CourseWhereInput = {
      OR: name
        ? [
            {
              nameEn: {
                contains: name,
                mode: 'insensitive',
              },
            },
            {
              nameTh: {
                contains: name,
                mode: 'insensitive',
              },
            },
          ]
        : undefined,
      id: id && {
        contains: id,
        mode: 'insensitive',
      },
      sections: {
        some: {
          day,
          startAt: startAt && {
            gte: startAt,
          },
          endAt: endAt && {
            lte: endAt,
          },
        },
        every: {
          year,
          semester,
        },
      },
      group,
      subGroup,
    };

    const [courses, totalCourses] = await Promise.all([
      this.prisma.course.findMany({
        where: query,
        include: this.baseInclude,
        skip,
        take: perPage,
      }),
      this.prisma.course.count({
        where: query,
      }),
    ]);

    return PaginateResponseDto.formatPaginationResponse({
      data: CourseResponseDto.formatCoursesResponse(courses),
      page,
      perPage,
      total: totalCourses,
    });
  }

  async getCourseByIdOrThrow(courseId: string): Promise<CourseWithSections> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: this.baseInclude,
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async deleteCourse(courseId: string): Promise<CourseWithSections> {
    await this.getCourseByIdOrThrow(courseId);

    const deletedCourse = await this.prisma.course.delete({
      where: {
        id: courseId,
      },
      include: this.baseInclude,
    });

    return deletedCourse;
  }

  async createCourseSection(
    courseId: string,
    createSectionDto: CreateSectionDto,
  ): Promise<SectionWithTeachers> {
    await this.getCourseByIdOrThrow(courseId);

    await this.sectionsService.checkSectionExistOrThrow(
      createSectionDto.name,
      createSectionDto.year,
      createSectionDto.semester,
      courseId,
    );

    const { teachers, ...sectionDetail } = createSectionDto;
    const createdSection = await this.sectionsService.createSection({
      ...sectionDetail,
      sectionTeachers: this.createTeachersData(teachers),
      course: {
        connect: {
          id: courseId,
        },
      },
    });

    return createdSection;
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
