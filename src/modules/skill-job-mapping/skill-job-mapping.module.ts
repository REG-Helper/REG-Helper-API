import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SkillJobMappingController } from './skill-job-mapping.controller';
import { SkillJobMappingService } from './skill-job-mapping.service';

@Module({
  imports: [PrismaModule],
  controllers: [SkillJobMappingController],
  providers: [SkillJobMappingService],
  exports: [SkillJobMappingService],
})
export class SkillJobMappingModule {}