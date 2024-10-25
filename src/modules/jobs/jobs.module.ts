import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { SkillJobMappingModule } from '../skill-job-mapping/skill-job-mapping.module';

import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [PrismaModule, SkillJobMappingModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
