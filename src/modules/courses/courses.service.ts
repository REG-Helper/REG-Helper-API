import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Course, Prisma, SkillCourseMapping, SkillJobMapping } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from '../sections/dto';
import { SectionsService } from '../sections/sections.service';
import { CreateTeacherDto } from '../teachers/dto';

import {
  CourseResponseDto,
  CreateCourseDto,
  GetCourseDetailQuery,
  GetCoursesQueryDto,
  JobSearchRequestDto,
  UpdateCourseDto,
} from './dto';

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
    const { page, perPage, search, day, group, subGroup, startAt, endAt, year, semester } =
      getCoursesQueryDto;

    const skip = (page - 1) * perPage;
    const query: Prisma.CourseWhereInput = {
      ...(search
        ? {
            OR: [
              {
                nameEn: { contains: search, mode: 'insensitive' },
              },
              {
                nameTh: { contains: search, mode: 'insensitive' },
              },
              {
                id: { contains: search, mode: 'insensitive' },
              },
            ],
          }
        : {}),
      sections: {
        some: {
          day,
          startAt: startAt && {
            gte: startAt,
          },
          endAt: endAt && {
            lte: endAt,
          },
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
        include: {
          sections: {
            where: {
              year,
              semester,
            },
            include: this.baseInclude.sections.include,
          },
        },
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

  async getCourseByIdOrThrow(
    courseId: string,
    getCourseDetailQuery?: GetCourseDetailQuery,
  ): Promise<CourseWithSections> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        sections: {
          where: {
            year: getCourseDetailQuery?.year,
            semester: getCourseDetailQuery?.semester,
          },
          include: this.baseInclude.sections.include,
        },
      },
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

  async findCourses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CourseWhereUniqueInput;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput;
    select?: Prisma.CourseSelect;
  }): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy, select } = params;

    return this.prisma.course.findMany({ skip, take, cursor, where, orderBy, select });
  }

  async findMissingCourseIds(courseIds: string[]): Promise<string[]> {
    const courseExists = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true },
    });

    const courseIdsExists = new Set(courseExists.map(course => course.id));

    return courseIds.filter(courseId => !courseIdsExists.has(courseId));
  }

  async searchCoursesByJobs(
    jobSearchRequest: JobSearchRequestDto,
  ): Promise<PaginateResponseDto<CourseResponseDto>> {
    const { job, page = 1, perPage = 10, year, semester } = jobSearchRequest;
    const normalizedJob = this.normalizeSearchTerm(job);
    const jobSkillMappings = await this.getJobSkillMappings(normalizedJob);
    const skillIds = this.extractSkillIds(jobSkillMappings);
    const courseSkillMappings = await this.getCourseSkillMappings(skillIds);
    const courseScores = this.calculateCourseScores(jobSkillMappings, courseSkillMappings);
    const { courses, totalCourses } = await this.getRankedCourses(
      courseScores,
      page,
      perPage,
      year,
      semester,
    );

    const formattedCourses = CourseResponseDto.formatCoursesResponse(courses);

    return PaginateResponseDto.formatPaginationResponse({
      data: formattedCourses,
      page,
      perPage,
      total: totalCourses,
    });
  }

  private normalizeSearchTerm(term: string): string {
    return term;
  }

  private async getJobSkillMappings(job: string): Promise<SkillJobMapping[]> {
    return this.prisma.skillJobMapping.findMany({
      where: {
        fromType: 'job',
        from: {
          equals: job,
        },
      },
    });
  }

  private extractSkillIds(jobSkillMappings: SkillJobMapping[]): string[] {
    return jobSkillMappings.map(mapping => mapping.to);
  }

  private async getCourseSkillMappings(skillIds: string[]): Promise<SkillCourseMapping[]> {
    return this.prisma.skillCourseMapping.findMany({
      where: {
        fromType: 'skill',
        from: { in: skillIds },
      },
    });
  }

  private calculateCourseScores(
    jobSkillMappings: SkillJobMapping[],
    courseSkillMappings: SkillCourseMapping[],
  ): Map<string, number> {
    const courseScores = new Map<string, number>();

    for (const jobSkill of jobSkillMappings) {
      for (const courseSkill of courseSkillMappings) {
        if (jobSkill.to === courseSkill.from) {
          const score = jobSkill.weight * courseSkill.weight;
          const currentScore = courseScores.get(courseSkill.to) ?? 0;

          courseScores.set(courseSkill.to, currentScore + score);
        }
      }
    }

    return courseScores;
  }

  private async getRankedCourses(
    courseScores: Map<string, number>,
    page: number,
    perPage: number,
    year?: number,
    semester?: number,
  ): Promise<{ courses: CourseWithSections[]; totalCourses: number }> {
    const courseNames = Array.from(courseScores.keys());
    const skip = (page - 1) * perPage;
    // Prepare the sections filter
    const sectionsFilter: Prisma.SectionWhereInput = {};

    if (year !== undefined) {
      sectionsFilter.year = year;
    }

    if (semester !== undefined) {
      sectionsFilter.semester = semester;
    }

    // Fetch courses with case-insensitive name matching and include sections
    const coursesQuery = this.prisma.course.findMany({
      where: {
        OR: [
          { nameEn: { in: courseNames, mode: 'insensitive' } },
          { nameTh: { in: courseNames, mode: 'insensitive' } },
        ],
      },
      include: {
        ...this.baseInclude,
        sections: {
          where: sectionsFilter,
          ...this.baseInclude.sections,
        },
      },
    });

    const countQuery = this.prisma.course.count({
      where: {
        OR: [
          { nameEn: { in: courseNames, mode: 'insensitive' } },
          { nameTh: { in: courseNames, mode: 'insensitive' } },
        ],
      },
    });

    const [allCourses, totalCourses] = await Promise.all([coursesQuery, countQuery]);
    // Create a new sorted array without modifying the original
    const sortedCourses = [...allCourses].sort((a, b) => {
      const scoreA = courseScores.get(a.nameEn) ?? courseScores.get(a.nameTh) ?? 0;
      const scoreB = courseScores.get(b.nameEn) ?? courseScores.get(b.nameTh) ?? 0;

      return scoreB - scoreA;
    });

    // Apply pagination
    const courses = sortedCourses.slice(skip, skip + perPage);

    return { courses, totalCourses };
  }
}
