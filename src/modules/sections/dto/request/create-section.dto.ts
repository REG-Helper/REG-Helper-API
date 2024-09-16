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
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(DayOfWeek)
  @IsNotEmpty()
  day: DayOfWeek;

  @IsString()
  @IsNotEmpty()
  room: string;

  @IsPositive()
  @IsNotEmpty()
  limit: number;

  @IsPositive()
  @IsNotEmpty()
  count: number;

  @IsPositive()
  @IsNotEmpty()
  queueLeft: number;

  @Max(3)
  @Min(1)
  @IsPositive()
  semester: number;

  @Max(new Date().getFullYear())
  @Min(new Date().getFullYear() - 5)
  @IsPositive()
  year: number;

  @IsPositive()
  @IsNotEmpty()
  preCount: number;

  @IsISO8601()
  @IsNotEmpty()
  midtermExamDate: string;

  @IsISO8601()
  @IsNotEmpty()
  finalExamDate: string;

  @IsString()
  @IsOptional()
  condition?: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSectionTimeDto)
  sectionTimes: CreateSectionTimeDto[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateTeacherDto)
  teachers: CreateTeacherDto[];
}
