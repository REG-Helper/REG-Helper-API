import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SectionTimesController } from './section-times.controller';
import { SectionTimesService } from './section-times.service';

@Module({
  imports: [PrismaModule],
  controllers: [SectionTimesController],
  providers: [SectionTimesService],
})
export class SectionTimesModule {}
