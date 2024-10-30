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

  private extractSkillIds(jobSkillMappings: SkillJobMapping[]): string[] {
    // Extract unique skill IDs using Set to avoid duplicates
    const uniqueSkillIds = new Set(jobSkillMappings.map(mapping => mapping.to));

    return Array.from(uniqueSkillIds);
  }

  private async getCourseSkillMappings(skillIds: string[]): Promise<SkillCourseMapping[]> {
    return this.prisma.skillCourseMapping.findMany({
      where: {
        fromType: 'skill',
        from: { in: skillIds },
      },
    });
  }

  private async getJobSkillMappings(jobs: string[]) {
    return this.prisma.skillJobMapping.findMany({
      where: {
        fromType: 'job',
        from: {
          in: jobs,
        },
      },
    });
  }

  async getCourses(
    getCoursesQueryDto: GetCoursesQueryDto,
  ): Promise<PaginateResponseDto<CourseResponseDto>> {
    const { page, perPage, search, day, group, subGroup, startAt, endAt, year, semester, job } =
      getCoursesQueryDto;

    let jobRelatedCourseIds: string[] = [];
    let courseScoresMap: Map<string, number> = new Map();

    if (job) {
      const normalizedJob = this.normalizeSearchTerm(job);
      const jobSkillMappings = await this.getJobSkillMappings([normalizedJob]);
      const skillIds = this.extractSkillIds(jobSkillMappings);
      const courseSkillMappings = await this.getCourseSkillMappings(skillIds);
      const courseScores = await this.calculateCourseScores(jobSkillMappings, courseSkillMappings);
      const maxScores = await this.calculateMaxCourseScores(courseSkillMappings);

      courseScoresMap = new Map(
        Array.from(courseScores.entries()).map(([courseId, data]) => [
          courseId,
          (data.rawScore / (maxScores.get(data.nameEn) ?? 1)) * 10 || 0,
        ]),
      );
      jobRelatedCourseIds = Array.from(courseScores.keys());
    }

    const query: Prisma.CourseWhereInput = {
      ...(search
        ? {
            OR: [
              { nameEn: { contains: search, mode: 'insensitive' } },
              { nameTh: { contains: search, mode: 'insensitive' } },
              { id: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(job
        ? {
            OR: [
              { nameEn: { in: jobRelatedCourseIds, mode: 'insensitive' } },
              { nameTh: { in: jobRelatedCourseIds, mode: 'insensitive' } },
            ],
          }
        : {}),
      sections: {
        some: {
          day,
          startAt: startAt && { gte: startAt },
          endAt: endAt && { lte: endAt },
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
          sections: { where: { year, semester }, include: this.baseInclude.sections.include },
        },
      }),
      this.prisma.course.count({ where: query }),
    ]);

    const coursesWithScores = courses.map(course => ({
      course,
      score: courseScoresMap.get(course.nameEn) ?? 0,
    }));

    const sortedCoursesWithScores = [...coursesWithScores].sort((a, b) => b.score - a.score);
    const allSortedCourses = sortedCoursesWithScores.map(item => item.course);
    const startIndex = (page - 1) * perPage;
    const paginatedCourses = allSortedCourses.slice(startIndex, startIndex + perPage);

    return PaginateResponseDto.formatPaginationResponse({
      data: CourseResponseDto.formatCoursesResponse(paginatedCourses),
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

  private async calculateCourseScores(
    jobSkillMappings: SkillJobMapping[],
    courseSkillMappings: SkillCourseMapping[],
  ): Promise<Map<string, { nameEn: string; nameTh: string; rawScore: number }>> {
    const courseScores = new Map<string, { nameEn: string; nameTh: string; rawScore: number }>();

    for (const jobSkill of jobSkillMappings) {
      for (const courseSkill of courseSkillMappings) {
        if (jobSkill.to === courseSkill.from) {
          const normalizedJobWeight = jobSkill.weight / 5; // Normalize job weight (1-5)
          const normalizedCourseWeight = courseSkill.weight / 5; // Normalize course weight (1-5)
          const scoreIncrement = normalizedJobWeight * normalizedCourseWeight;
          const current = courseScores.get(courseSkill.to) ?? {
            nameEn: courseSkill.to,
            nameTh: courseSkill.toTh,
            rawScore: 0,
          };

          courseScores.set(courseSkill.to, {
            ...current,
            rawScore: current.rawScore + scoreIncrement,
          });
        }
      }
    }

    return courseScores;
  }

  private async calculateMaxCourseScores(
    courseSkillMappings: SkillCourseMapping[],
  ): Promise<Map<string, number>> {
    const maxScores = new Map<string, number>();
    const courseGroups = courseSkillMappings.reduce((groups, mapping) => {
      const key = mapping.to;

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)?.push(mapping);

      return groups;
    }, new Map<string, SkillCourseMapping[]>());

    for (const [courseId, mappings] of courseGroups) {
      const maxScore = mappings.reduce((sum, mapping) => sum + mapping.weight, 0);

      maxScores.set(courseId, maxScore);
    }

    return maxScores;
  }

  private normalizeSearchTerm(term: string): string {
    return term.trim();
  }
}
