import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { SectionsModule } from '../sections/sections.module';

import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [PrismaModule, SectionsModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
