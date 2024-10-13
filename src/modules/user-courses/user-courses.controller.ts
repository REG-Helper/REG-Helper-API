import { Controller, Post, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';

import { UserCoursesService } from './user-courses.service';

import { CurrentUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common/guards';

@Controller('user-courses')
@UseGuards(AccessTokenGuard)
export class UserCoursesController {
  constructor(private readonly userCoursesService: UserCoursesService) {}

  @Post('getRemainCourse')
  async getRemainCourse(@CurrentUser() user: User) {
    return this.userCoursesService.getRemainCourse(user);
  }
}
