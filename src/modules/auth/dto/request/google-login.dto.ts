import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleLoginDto {
  @ApiProperty({
    required: true,
    example: 'token',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
