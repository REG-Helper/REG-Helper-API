import { ApiProperty } from '@nestjs/swagger';

import { CourseGroup, CourseSubGroup, DayOfWeek } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

import { IsDateAfter, IsValidSubGroupForGroup } from '@/common/decorators';
import { PaginationQueryDto } from '@/shared/dto';

export class GetCoursesQueryDto extends PaginationQueryDto {
  @ApiProperty({
    example: '01020304',
    required: false,
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'Computer Networks',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    example: `${DayOfWeek.FRIDAY} ex. ${Object.values(DayOfWeek).join(', ')}`,
  })
  @IsEnum(DayOfWeek)
  @IsOptional()
  day?: DayOfWeek;

  @ApiProperty({
    required: false,
    example: `${CourseGroup.FREE_ELEC} ex. ${Object.values(CourseGroup).join(', ')}`,
  })
  @IsEnum(CourseGroup)
  @ValidateIf(item => item.subGroup !== undefined)
  group?: CourseGroup;

  @ApiProperty({
    required: false,
    example: `${CourseSubGroup.ALT_STUDY} ex. ${Object.values(CourseSubGroup).join(', ')}`,
  })
  @ValidateIf(item => item.group !== undefined)
  @IsValidSubGroupForGroup()
  @IsEnum(CourseSubGroup)
  subGroup?: CourseSubGroup;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: false,
    type: Date,
  })
  @ValidateIf(item => item.endAt !== undefined)
  @IsISO8601()
  startAt?: string;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: false,
    type: Date,
  })
  @ValidateIf(item => item.startAt !== undefined)
  @IsDateAfter()
  @IsISO8601()
  endAt?: string;

  @ApiProperty({
    example: '2024',
    required: false,
  })
  @IsOptional()
  @Max(new Date().getFullYear())
  @Min(new Date().getFullYear() - 20)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @ApiProperty({
    example: '1',
    required: false,
  })
  @IsOptional()
  @Min(1)
  @Max(3)
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  semester?: number;
}
