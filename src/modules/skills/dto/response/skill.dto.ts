import { ApiProperty } from '@nestjs/swagger';

import { Skill } from '@prisma/client';

export class SkillResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Database Management' })
  nameEn: string;

  @ApiProperty({ example: 'การจัดการฐานข้อมูล' })
  nameTh: string;

  @ApiProperty({ example: '2023-04-01T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-04-01T12:00:00Z' })
  updatedAt: Date;

  constructor(partial: Partial<SkillResponseDto>) {
    Object.assign(this, partial);
  }

  static formatSkillResponse(skill: Skill): SkillResponseDto {
    return new SkillResponseDto(skill);
  }

  static formatSkillsResponse(skills: Skill[]): SkillResponseDto[] {
    return skills.map(skill => this.formatSkillResponse(skill));
  }
}