import { ApiProperty } from '@nestjs/swagger';

import { IsISO8601, IsNotEmpty } from 'class-validator';

export class CreateSectionTimeDto {
  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: true,
    type: Date,
  })
  @IsISO8601()
  @IsNotEmpty()
  startAt: string;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
    required: true,
    type: Date,
  })
  @IsISO8601()
  @IsNotEmpty()
  endAt: string;
}
