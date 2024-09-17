import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstnameEn: string;

  @ApiProperty({
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastnameEn: string;

  @ApiProperty({
    example: 'จอห์น',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstnameTh: string;

  @ApiProperty({
    example: 'โด',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastnameTh: string;
}
