import { Injectable, NotFoundException } from '@nestjs/common';

import { Skill } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSkillDto, UpdateSkillDto } from './dto';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.prisma.skill.create({
      data: createSkillDto,
    });
  }

  async getSkills(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  async getSkillByIdOrThrow(skillId: string): Promise<Skill> {
    const skill = await this.prisma.skill.findUnique({
      where: {
        id: skillId,
      },
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return skill;
  }

  async updateSkill(skillId: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    await this.getSkillByIdOrThrow(skillId);

    return this.prisma.skill.update({
      where: {
        id: skillId,
      },
      data: updateSkillDto,
    });
  }

  async deleteSkill(skillId: string): Promise<Skill> {
    await this.getSkillByIdOrThrow(skillId);

    return this.prisma.skill.delete({
      where: {
        id: skillId,
      },
    });
  }

  async createMany(createSkillDtos: CreateSkillDto[]): Promise<number> {
    const result = await this.prisma.skill.createMany({
      data: createSkillDtos,
      skipDuplicates: true,
    });

    return result.count;
  }
}