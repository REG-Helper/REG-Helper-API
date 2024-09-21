import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDataDto {
  @ApiProperty({
    example: 10,
    type: Number,
  })
  perPage: number;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  prevPage: number | null;

  @ApiProperty({
    example: 2,
    type: Number,
  })
  currentPage: number;

  @ApiProperty({
    example: 3,
    type: Number,
  })
  nextPage: number | null;

  @ApiProperty({
    example: 5,
    type: Number,
  })
  lastPage: number;
}
