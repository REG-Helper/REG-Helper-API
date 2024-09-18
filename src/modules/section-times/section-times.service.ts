import { Injectable, NotFoundException } from '@nestjs/common';

import { SectionTime } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectionTimesService {
  constructor(private readonly prisma: PrismaService) {}

  async getSectionTimes(): Promise<SectionTime[]> {
    return this.prisma.sectionTime.findMany();
  }

  async getSectionTime(sectionTimeId: string): Promise<SectionTime> {
    const sectionTime = await this.prisma.sectionTime.findUnique({
      where: {
        id: sectionTimeId,
      },
    });

    if (!sectionTime) {
      throw new NotFoundException('Section time not found');
    }

    return sectionTime;
  }

  async deleteSectionTime(sectionTimeId: string): Promise<SectionTime> {
    await this.getSectionTime(sectionTimeId);

    const deletedSectionTime = await this.prisma.sectionTime.delete({
      where: {
        id: sectionTimeId,
      },
    });

    return deletedSectionTime;
  }
}
