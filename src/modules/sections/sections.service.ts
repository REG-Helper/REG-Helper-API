import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { SectionResponseDto, UpdateSectionDto } from './dto';

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

  async getSections(): Promise<SectionResponseDto[]> {
    const sections = await this.prisma.section.findMany({
      include: this.baseInclude,
    });

    return SectionResponseDto.formatSectionsResponse(sections);
  }

  async getSectionByIdOrThrow(sectionId: string): Promise<SectionResponseDto> {
    const section = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
      include: this.baseInclude,
    });

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    return SectionResponseDto.formatSectionResponse(section);
  }

  async updateSection(
    sectionId: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionResponseDto> {
    await this.getSectionByIdOrThrow(sectionId);

    const { teachers, ...sectionDetail } = updateSectionDto;
    const sectionTeachers = teachers?.length
      ? {
          deleteMany: {},
          create: teachers?.map(teacher => ({
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

    return SectionResponseDto.formatSectionResponse(updatedSection);
  }

  async deleteSection(sectionId: string): Promise<SectionResponseDto> {
    await this.getSectionByIdOrThrow(sectionId);

    const deletedSection = await this.prisma.section.delete({
      where: {
        id: sectionId,
      },
      include: this.baseInclude,
    });

    return SectionResponseDto.formatSectionResponse(deletedSection);
  }
}
