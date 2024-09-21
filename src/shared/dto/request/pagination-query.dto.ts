import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsPositive()
  @IsInt()
  @IsOptional()
  perPage: number = 10;
}
