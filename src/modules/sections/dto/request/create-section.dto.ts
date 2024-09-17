import { ApiProperty } from '@nestjs/swagger';

import { DayOfWeek } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { CreateSectionTimeDto } from '@/modules/section-times/dto';
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
  @IsNotEmpty()
  day: DayOfWeek;

  @ApiProperty({
    required: true,
    example: 'Room 101',
  })
  @IsString()
  @IsNotEmpty()
  room: string;

  @ApiProperty({
    example: 30,
    required: true,
  })
  @IsPositive()
  @IsNotEmpty()
  limit: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsPositive()
  @IsNotEmpty()
  count: number;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsPositive()
  @IsNotEmpty()
  queueLeft: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @Max(3)
  @Min(1)
  @IsPositive()
  semester: number;

  @ApiProperty({
    example: 2023,
    required: true,
  })
  @Max(new Date().getFullYear())
  @Min(new Date().getFullYear() - 5)
  @IsPositive()
  year: number;

  @ApiProperty({
    example: 5,
    required: true,
  })
  @IsPositive()
  @IsNotEmpty()
  preCount: number;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: true,
    type: Date,
  })
  @IsISO8601()
  @IsNotEmpty()
  midtermExamDate: string;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: true,
    type: Date,
  })
  @IsISO8601()
  @IsNotEmpty()
  finalExamDate: string;

  @ApiProperty({
    example: 'Condition',
    required: false,
  })
  @IsString()
  @IsOptional()
  condition?: string;

  @ApiProperty({
    type: [CreateSectionTimeDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSectionTimeDto)
  sectionTimes: CreateSectionTimeDto[];

  @ApiProperty({
    type: [CreateTeacherDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTeacherDto)
  teachers: CreateTeacherDto[];
}
