import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateSkillJobMappingDto {
  @ApiProperty()
  @IsString()
  from: string;

  @ApiProperty()
  @IsString()
  fromTh: string;

  @ApiProperty()
  @IsString()
  fromType: string;

  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  toTh: string;

  @ApiProperty()
  @IsString()
  toType: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  weight: number;
}


