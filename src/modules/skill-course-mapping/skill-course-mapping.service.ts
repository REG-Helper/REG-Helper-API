import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSkillCourseMappingDto } from './dto';

@Injectable()
export class SkillCourseMappingService {
  constructor(private prisma: PrismaService) {}

  async createMapping(createDto: CreateSkillCourseMappingDto) {
    return this.prisma.skillCourseMapping.create({
      data: createDto,
    });
  }

  async getAllMappings() {
    return this.prisma.skillCourseMapping.findMany();
  }

  async createMany(createDtos: CreateSkillCourseMappingDto[]) {
    return this.prisma.skillCourseMapping.createMany({
      data: createDtos,
      skipDuplicates: true,
    });
  }
}
