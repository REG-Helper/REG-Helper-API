import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SkillCourseMappingController } from './skill-course-mapping.controller';
import { SkillCourseMappingService } from './skill-course-mapping.service';

@Module({
  imports: [PrismaModule],
  controllers: [SkillCourseMappingController],
  providers: [SkillCourseMappingService],
  exports: [SkillCourseMappingService],
})
export class SkillCourseMappingModule {}