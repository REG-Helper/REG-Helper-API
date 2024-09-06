import { ApiProperty } from '@nestjs/swagger';

export class CredentialsResponseDto {
  @ApiProperty({
    example: 'accessToken',
  })
  accessToken: string;
}
