import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class GetCourseDetailQuery {
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
