import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSkillJobMappingDto } from './dto';

@Injectable()
export class SkillJobMappingService {
  constructor(private prisma: PrismaService) {}

  async createMapping(createDto: CreateSkillJobMappingDto) {
    return this.prisma.skillJobMapping.create({
      data: createDto,
    });
  }

  async getJobs() {
    const allJobs = await this.prisma.skillJobMapping.findMany({
      where: {
        fromType: 'job',
      },
      distinct: ['from'],
      select: {
        from: true,
        fromTh: true,
      },
    });

    return allJobs;
  }

  async createMany(createDtos: CreateSkillJobMappingDto[]) {
    return this.prisma.skillJobMapping.createMany({
      data: createDtos,
      skipDuplicates: true,
    });
  }
}
