import { ApiProperty } from '@nestjs/swagger';

import { DayOfWeek, SectionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { IsDateAfter } from '@/common/decorators';
import { CreateTeacherDto } from '@/modules/teachers/dto';

export class CreateSectionDto {
  @ApiProperty({
    example: 'Section 101',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: DayOfWeek,
    example: `${DayOfWeek.FRIDAY} ex. ${Object.values(DayOfWeek).join(', ')}`,
    required: true,
  })
  @IsEnum(DayOfWeek)
  @IsOptional()
  day?: DayOfWeek;

  @ApiProperty({
    required: true,
    example: 'Room 101',
  })
  @IsString()
  @IsOptional()
  room?: string;

  @ApiProperty({
    example: 30,
    required: true,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @IsOptional()
  limit?: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  count: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @Max(3)
  @Min(1)
  @IsPositive()
  semester: number;

  @ApiProperty({
    enum: SectionType,
    example: `${SectionType.LECTURE} ex. ${Object.values(SectionType).join(', ')}`,
    required: true,
  })
  @IsEnum(SectionType)
  @IsNotEmpty()
  type: SectionType;

  @ApiProperty({
    example: 2023,
    required: true,
  })
  @Max(new Date().getFullYear())
  @Min(new Date().getFullYear() - 20)
  @IsPositive()
  @IsInt()
  year: number;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: true,
    type: Date,
  })
  @IsISO8601()
  @IsNotEmpty()
  @IsOptional()
  midtermExamDate?: string;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: true,
    type: Date,
  })
  @IsISO8601()
  @IsNotEmpty()
  @IsOptional()
  finalExamDate?: string;

  @ApiProperty({
    example: 'Condition',
    required: false,
  })
  @IsString()
  @IsOptional()
  condition?: string;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: false,
    type: Date,
  })
  @IsISO8601()
  @IsOptional()
  startAt?: string;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: false,
    type: Date,
  })
  @IsDateAfter()
  @IsISO8601()
  @IsOptional()
  endAt?: string;

  @ApiProperty({
    type: [CreateTeacherDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => CreateTeacherDto)
  teachers: CreateTeacherDto[];
}
