import { ApiProperty } from '@nestjs/swagger';

export class GenerateLinkDto {
  @ApiProperty({
    example: 'url',
  })
  url: string;
}
