import { ApiProperty } from '@nestjs/swagger';

import { CredentialsResponseDto } from './credentials.dto';

import { UserResponseDto } from '@/modules/users/dto';
import { IFormatAuthResponseParams } from '@/shared/interfaces';

export class AuthResponseDto {
  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  credentials: CredentialsResponseDto;

  @ApiProperty()
  user: UserResponseDto;

  static formatAuthResponse({ user, accessToken }: IFormatAuthResponseParams): AuthResponseDto {
    return new AuthResponseDto({
      user: UserResponseDto.formatUserResponse(user),
      credentials: { accessToken },
    });
  }
}
