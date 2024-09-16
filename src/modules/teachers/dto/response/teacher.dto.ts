import { ApiProperty } from '@nestjs/swagger';

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
}
