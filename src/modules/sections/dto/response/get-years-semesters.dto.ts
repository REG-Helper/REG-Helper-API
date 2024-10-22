import { ApiProperty } from '@nestjs/swagger';

export class GetYearsAndSemestersResponseDto {
  @ApiProperty({
    example: 2024,
  })
  year: number;

  @ApiProperty({
    example: 1,
  })
  semester: number;
}
