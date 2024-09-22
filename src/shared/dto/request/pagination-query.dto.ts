import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    required: false,
    example: 1,
  })
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    required: false,
    example: 10,
  })
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  @IsOptional()
  perPage: number = 10;
}
