import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { SectionResponseDto } from './dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly baseInclude = {
    sectionTeachers: {
      include: {
        teacher: true,
      },
    },
    sectionTimes: true,
  };

  async getSections(): Promise<SectionResponseDto[]> {
    const sections = await this.prisma.section.findMany({
      include: this.baseInclude,
    });

    return SectionResponseDto.formatSectionsResponse(sections);
  }

  async getSection(sectionId: string): Promise<SectionResponseDto> {
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

  async deleteSection(sectionId: string): Promise<SectionResponseDto> {
    await this.getSection(sectionId);

    const deletedSection = await this.prisma.section.delete({
      where: {
        id: sectionId,
      },
      include: this.baseInclude,
    });

    return SectionResponseDto.formatSectionResponse(deletedSection);
  }
}
