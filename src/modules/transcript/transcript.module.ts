import { Module } from '@nestjs/common';

import { MinioClientModule } from '../minio-client/minio-client.module';

import { TranscriptController } from './transcript.controller';
import { TranscriptService } from './transcript.service';

@Module({
  imports: [MinioClientModule],
  controllers: [TranscriptController],
  providers: [TranscriptService],
})
export class TranscriptModule {}
