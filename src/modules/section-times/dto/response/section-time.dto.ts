import { ApiProperty } from '@nestjs/swagger';

import { SectionTime } from '@prisma/client';

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

  constructor(partial: Partial<SectionTimeResponseDto>) {
    Object.assign(this, partial);
  }

  static formatSectionTimeResponse(sectionTime: SectionTime): SectionTimeResponseDto {
    const { startAt, endAt } = sectionTime;

    return new SectionTimeResponseDto({ startAt, endAt });
  }
}
