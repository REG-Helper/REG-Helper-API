import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDataDto } from './pagination-metadata.dto';

type PaginationResponseParams<T> = {
  data: T[];
  perPage: number;
  page: number;
  total: number;
};

export class PaginateResponseDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty({
    type: PaginationMetaDataDto,
  })
  metaData: PaginationMetaDataDto;

  constructor(partial: Partial<PaginateResponseDto<T>>) {
    Object.assign(this, partial);
  }

  static formatPaginationResponse<T>({
    data,
    perPage,
    page,
    total,
  }: PaginationResponseParams<T>): PaginateResponseDto<T> {
    const lastPage = Math.ceil(total / perPage);

    return new PaginateResponseDto<T>({
      data,
      metaData: {
        perPage,
        currentPage: page,
        lastPage,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < lastPage ? page + 1 : null,
      },
    });
  }
}
