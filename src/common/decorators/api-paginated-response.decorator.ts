import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginateResponseDto } from '@/shared/dto';

export const ApiPaginatedResponse = <TModel extends Type<unknown>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(PaginateResponseDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginateResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
