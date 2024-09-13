import { ApiProperty } from '@nestjs/swagger';

import { Transcript, User } from '@prisma/client';

import { TranscriptResponseDto } from './transcript.dto';

import { UserResponseDto } from '@/modules/users/dto';

export class UploadTranscriptResponseDto {
  @ApiProperty()
  transcript: TranscriptResponseDto;

  @ApiProperty()
  user: UserResponseDto;

  static formatUploadTranscriptReponse(
    transcript: Transcript,
    user: User,
  ): UploadTranscriptResponseDto {
    return {
      transcript: TranscriptResponseDto.formatTranscriptResponse(transcript),
      user: UserResponseDto.formatUserResponse(user),
    };
  }
}
