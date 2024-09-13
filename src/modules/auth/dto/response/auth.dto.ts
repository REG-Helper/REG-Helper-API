import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { CredentialsResponseDto } from './credentials.dto';

import { UserResponseDto } from '@/modules/users/dto';

export class AuthResponseDto {
  @ApiProperty()
  credentials: CredentialsResponseDto;

  @ApiProperty()
  user: UserResponseDto;

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }

  static formatAuthResponse(user: User, accessToken: string): AuthResponseDto {
    return new AuthResponseDto({
      user: UserResponseDto.formatUserResponse(user),
      credentials: { accessToken },
    });
  }
}
