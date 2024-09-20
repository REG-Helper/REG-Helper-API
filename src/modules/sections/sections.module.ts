import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  imports: [PrismaModule],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule {}
