import { Module } from '@nestjs/common';

import { TranscriptController } from './transcript.controller';
import { TranscriptService } from './transcript.service';

@Module({
  controllers: [TranscriptController],
  providers: [TranscriptService],
})
export class TranscriptModule {}
