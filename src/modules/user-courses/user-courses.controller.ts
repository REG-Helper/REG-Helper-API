import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { UserCoursesService } from './user-courses.service';

import { CurrentUser } from '@/common/decorators';
import { AccessTokenGuard, TranscriptGuard } from '@/common/guards';

@Controller('user-courses')
@ApiBearerAuth()
@ApiTags('user-courses')
@UseGuards(AccessTokenGuard, TranscriptGuard)
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @Get('remaining')
  async getRemainCourse(@CurrentUser() user: User) {
    return this.userCoursesService.getRemainingCourse(user);
  }
}
