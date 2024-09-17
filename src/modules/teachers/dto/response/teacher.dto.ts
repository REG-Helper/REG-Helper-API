import { ApiProperty } from '@nestjs/swagger';

import { Teacher } from '@prisma/client';

export class TeacherResponseDto {
  @ApiProperty({
    example: 'e35521a6-1d55-4dcc-9e97-50faa204dbab',
  })
  id: string;

  @ApiProperty({
    example: 'John',
  })
  firstnameEn?: string | null;

  @ApiProperty({
    example: 'Doe',
  })
  lastnameEn?: string | null;

  @ApiProperty({
    example: 'จอห์น',
  })
  firstnameTh: string;

  @ApiProperty({
    example: 'โด',
  })
  lastnameTh: string;

  constructor(partial: Partial<TeacherResponseDto>) {
    Object.assign(this, partial);
  }

  static formatTeacherResponse(teacher: Teacher): TeacherResponseDto {
    const { firstnameEn, lastnameEn, firstnameTh, lastnameTh } = teacher;

    return new TeacherResponseDto({
      firstnameEn,
      firstnameTh,
      lastnameEn,
      lastnameTh,
    });
  }
}
