import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 'Database Management' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameEn: string;

  @ApiProperty({ example: 'การจัดการฐานข้อมูล' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nameTh: string;
}
