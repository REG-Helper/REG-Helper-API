import { ApiProperty } from '@nestjs/swagger';

import { Transcript, User } from '@prisma/client';

import { TranscriptResponseDto } from './transcript.dto';

import { UserResponseDto } from '@/modules/users/dto';

export class UploadTranscriptResponseDto {
  @ApiProperty()
  transcript: TranscriptResponseDto;

  @ApiProperty()
  user: UserResponseDto;

  constructor(partial: Partial<UploadTranscriptResponseDto>) {
    Object.assign(this, partial);
  }

  static formatUploadTranscriptReponse(
    transcript: Transcript,
    user: User,
  ): UploadTranscriptResponseDto {
    return new UploadTranscriptResponseDto({
      transcript,
      user: UserResponseDto.formatUserResponse(user),
    });
  }
}
