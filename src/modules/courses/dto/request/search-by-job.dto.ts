import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';


export class JobSearchRequestDto {
  @ApiProperty({ description: 'Job title to search for' })
  @IsString()
  job: string;

  @ApiProperty({ required: false, description: 'Academic year' })
  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(2100)
  @Type(() => Number)
  year?: number;

  @ApiProperty({ required: false, description: 'Semester' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  @Type(() => Number)
  semester?: number;

  // Add these if they're not already present
  @ApiProperty({ required: false, description: 'Page number' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiProperty({ required: false, description: 'Items per page' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  perPage?: number;
}