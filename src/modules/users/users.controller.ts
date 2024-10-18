import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { MinioClientService } from '../minio-client/minio-client.service';

import { UserResponseDto } from './dto';
import { UsersService } from './users.service';

import { CurrentUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common/guards';
import { IUserWithTranscript } from '@/shared/interfaces';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly minioClientService: MinioClientService,
  ) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  async getMe(@CurrentUser() user: IUserWithTranscript): Promise<UserResponseDto> {
    if (user?.transcript?.url) {
      const transcriptUrl = await this.minioClientService.getFileUrl(user.transcript.url);

      user.transcript.url = transcriptUrl;
    }

    return UserResponseDto.formatUserResponse(user);
  }
}
