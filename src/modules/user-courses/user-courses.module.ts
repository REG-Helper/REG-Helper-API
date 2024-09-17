import { Module } from '@nestjs/common';

import { UserCoursesController } from './user-courses.controller';
import { UserCoursesService } from './user-courses.service';

@Module({
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
})
export class UserCoursesModule {}
