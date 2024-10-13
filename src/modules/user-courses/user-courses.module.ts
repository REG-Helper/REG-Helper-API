import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { UserCoursesController } from './user-courses.controller';
import { UserCoursesService } from './user-courses.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserCoursesController],
  providers: [UserCoursesService],
})
export class UserCoursesModule {}
