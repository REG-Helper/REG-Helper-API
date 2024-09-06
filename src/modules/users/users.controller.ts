import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { UserResponseDto } from './dto';
import { UsersService } from './users.service';

import { CurrentUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common/guards';

@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  getMe(@CurrentUser() user: User): UserResponseDto {
    return UserResponseDto.formatUserResponse(user);
  }
}
