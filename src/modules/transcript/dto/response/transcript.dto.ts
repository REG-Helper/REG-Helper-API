import { ApiProperty } from '@nestjs/swagger';

import { Transcript } from '@prisma/client';

export class TranscriptResponseDto {
  @ApiProperty({
    example: 'https://example.com/image.png',
  })
  url: string;

  static formatTranscriptResponse(transcript: Transcript): TranscriptResponseDto {
    return {
      url: transcript.url,
    };
  }
}
