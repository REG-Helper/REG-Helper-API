import { ApiProperty } from '@nestjs/swagger';

export class SectionTimeResponseDto {
  @ApiProperty({
    example: '898dae01-53cc-4a05-8b79-520dce25eeae',
  })
  id: string;

  @ApiProperty({
    example: '1970-01-01T09:00:00.000Z',
  })
  startAt: Date;

  @ApiProperty({
    example: '1970-01-01T12:00:00.000Z',
  })
  endAt: Date;
}
