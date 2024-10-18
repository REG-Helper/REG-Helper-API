import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { TranscriptResponseDto } from '@/modules/transcript/dto';
import { IUserWithTranscript } from '@/shared/interfaces';

export class UserResponseDto {
  @ApiProperty({
    example: '65010077',
  })
  studentId: string;

  @ApiProperty({
    example: '65010077@kmitl.ac.th',
  })
  email: string;

  @ApiProperty({
    example: 'John',
  })
  firstname: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastname: string;

  @ApiProperty({
    example: 'Engineering',
  })
  faculty: string;

  @ApiProperty({
    example: 'Computer Engineering',
  })
  department: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
  })
  profileImage: string;

  @ApiProperty()
  transcript: TranscriptResponseDto;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  static formatUserResponse(user: IUserWithTranscript | User): UserResponseDto {
    const transcript = (user as IUserWithTranscript)?.transcript;

    return new UserResponseDto({
      studentId: user.studentId,
      email: user.email,
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      profileImage: user.profileImage,
      faculty: user?.faculty ?? '',
      department: user?.department ?? '',
      transcript: transcript ? { url: transcript.url } : undefined,
    });
  }
}
