import { Module } from '@nestjs/common';

import { SectionTimesController } from './section-times.controller';
import { SectionTimesService } from './section-times.service';

@Module({
  controllers: [SectionTimesController],
  providers: [SectionTimesService],
})
export class SectionTimesModule {}
