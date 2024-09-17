import { CourseGroup, CourseSubGroup, CourseType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { CreateSectionDto } from '@/modules/sections/dto';

export class CreateCourseDto {
  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @IsString()
  @IsNotEmpty()
  nameTh: string;

  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @IsString()
  @IsNotEmpty()
  descriptionTh: string;

  @IsPositive()
  @IsNotEmpty()
  credit: number;

  @IsString()
  @IsNotEmpty()
  creditStr: string;

  @IsEnum(CourseType)
  @IsNotEmpty()
  type: CourseType;

  @IsEnum(CourseGroup)
  @IsNotEmpty()
  group: CourseGroup;

  @IsEnum(CourseSubGroup)
  @IsNotEmpty()
  subGroup: CourseSubGroup;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];
}
