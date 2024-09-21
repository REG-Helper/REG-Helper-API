import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Section } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from '../teachers/dto';

import { UpdateSectionDto } from './dto';

import { SectionWithTeachers } from '@/shared/interfaces';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly baseInclude = {
    sectionTeachers: {
      include: {
        teacher: true,
      },
    },
  };

  async getSections(): Promise<SectionWithTeachers[]> {
    return this.prisma.section.findMany({
      include: this.baseInclude,
    });
  }

  async getSectionByIdOrThrow(sectionId: string): Promise<SectionWithTeachers | null> {
    const section = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
      include: this.baseInclude,
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return section;
  }

  async createSection(section: Prisma.SectionCreateInput): Promise<SectionWithTeachers> {
    const createdSection = await this.prisma.section.create({
      data: section,
      include: this.baseInclude,
    });

    return createdSection;
  }

  async updateSection(
    sectionId: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionWithTeachers> {
    const section = await this.getSectionByIdOrThrow(sectionId);

    await this.checkSectionExistOrThrow(
      updateSectionDto.name ?? section?.name,
      updateSectionDto.year ?? Number(section?.year),
      updateSectionDto.semester ?? Number(section?.semester),
      section?.courseId,
      sectionId,
    );

    const { teachers, ...sectionDetail } = updateSectionDto;
    const sectionTeachers = teachers?.length
      ? {
          deleteMany: {},
          ...this.createTeachersData(teachers),
        }
      : undefined;

    const updatedSection = await this.prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        ...sectionDetail,
        sectionTeachers,
      },
      include: this.baseInclude,
    });

    return updatedSection;
  }

  async deleteSection(sectionId: string): Promise<SectionWithTeachers> {
    await this.getSectionByIdOrThrow(sectionId);

    const deletedSection = await this.prisma.section.delete({
      where: {
        id: sectionId,
      },
      include: this.baseInclude,
    });

    return deletedSection;
  }

  async checkSectionExistOrThrow(
    sectionName: string | undefined,
    year: number,
    semester: number,
    courseId?: string,
    excludeId?: string,
  ): Promise<Section | null> {
    const section = await this.prisma.section.findFirst({
      where: {
        courseId,
        name: sectionName,
        year,
        semester,
        ...(excludeId && {
          NOT: {
            id: excludeId,
          },
        }),
      },
    });

    if (section) {
      throw new ConflictException('Section already exist');
    }

    return section;
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
