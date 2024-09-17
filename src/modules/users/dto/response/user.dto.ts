import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

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
    example: 'https://example.com/profile.jpg',
  })
  profileImage: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  static formatUserResponse(user: User): UserResponseDto {
    return new UserResponseDto({
      studentId: user.studentId,
      email: user.email,
      firstname: user?.firstname ?? '',
      lastname: user?.lastname ?? '',
      profileImage: user.profileImage,
    });
  }
}
