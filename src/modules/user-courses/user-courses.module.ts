import { Module } from '@nestjs/common';

import { CoursesModule } from '../courses/courses.module';
import { PrismaModule } from '../prisma/prisma.module';

import { UserCoursesController } from './user-courses.controller';
import { UserCoursesService } from './user-courses.service';

@Module({
  imports: [PrismaModule, CoursesModule],
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
})
export class UserCoursesModule {}
