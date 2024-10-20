import { ApiProperty } from '@nestjs/swagger';

// Define an interface for the entity
interface SkillCourseMappingEntity {
  id: string;
  from: string;
  fromTh: string;
  fromType: string;
  to: string;
  toTh: string;
  toType: string;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export class SkillCourseMappingResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  from: string;

  @ApiProperty()
  fromTh: string;

  @ApiProperty()
  fromType: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  toTh: string;

  @ApiProperty()
  toType: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromEntity(entity: SkillCourseMappingEntity): SkillCourseMappingResponseDto {
    const dto = new SkillCourseMappingResponseDto();

    Object.assign(dto, entity);

    return dto;
  }
}
