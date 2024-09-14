import { ApiProperty } from '@nestjs/swagger';

export class TranscriptResponseDto {
  @ApiProperty({
    example: 'https://example.com/image.png',
  })
  url: string;
}
