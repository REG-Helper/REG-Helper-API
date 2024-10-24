import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { GetUserRemainingCourseResponseDto } from './dto';
import { UserSkillResponseDto } from './dto/response/get-user-skills.dto';
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
  @ApiOkResponse({
    type: GetUserRemainingCourseResponseDto,
  })
  async getRemainCourse(@CurrentUser() user: User) {
    return this.userCoursesService.getRemainingCourse(user);
  }

  @Get('skills')
  @ApiOkResponse({
    type: [UserSkillResponseDto],
    description: 'Get all skills from user\'s courses with their total weights',
  })
  async getUserSkills(@CurrentUser() user: User): Promise<UserSkillResponseDto[]> {
    return this.userCoursesService.getUserSkills(user);
  }
}
