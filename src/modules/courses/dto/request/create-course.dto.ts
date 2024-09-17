import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    required: true,
    example: '01020318',
  })
  @IsString()
  @Length(8, 8)
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    required: true,
    example: 'Introduction to Programming',
  })
  @IsString()
  @IsNotEmpty()
  nameEn: string;

  @ApiProperty({
    required: true,
    example: 'การเขียนโปรแกรมเบื้องต้น',
  })
  @IsString()
  @IsNotEmpty()
  nameTh: string;

  @ApiProperty({
    required: true,
    example: 'This course introduces the fundamentals of programming.',
  })
  @IsString()
  @IsNotEmpty()
  descriptionEn: string;

  @ApiProperty({
    required: true,
    example: 'วิชานี้แนะนำพื้นฐานของการเขียนโปรแกรม',
  })
  @IsString()
  @IsNotEmpty()
  descriptionTh: string;

  @ApiProperty({
    required: true,
    example: 3,
  })
  @IsPositive()
  @IsNotEmpty()
  credit: number;

  @ApiProperty({
    required: true,
    example: '3 (3-0-6)',
  })
  @IsString()
  @IsNotEmpty()
  creditStr: string;

  @ApiProperty({
    enum: CourseType,
    example: `${CourseType.LECTURE} ex. ${Object.values(CourseType).join(', ')}`,
    required: true,
  })
  @IsEnum(CourseType)
  @IsNotEmpty()
  type: CourseType;

  @ApiProperty({
    enum: CourseGroup,
    example: `${CourseGroup.FREE_ELEC} ex. ${Object.values(CourseGroup).join(', ')}`,
    required: true,
  })
  @IsEnum(CourseGroup)
  @IsNotEmpty()
  group: CourseGroup;

  @ApiProperty({
    enum: CourseSubGroup,
    example: `${CourseSubGroup.FREE_ELEC} ex. ${Object.values(CourseSubGroup).join(', ')}`,
    required: true,
  })
  @IsEnum(CourseSubGroup)
  @IsNotEmpty()
  subGroup: CourseSubGroup;

  @ApiProperty({
    type: [CreateSectionDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];
}
