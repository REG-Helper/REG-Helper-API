import { Module } from '@nestjs/common';

import { CoursesModule } from '../courses/courses.module';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

import { TranscriptController } from './transcript.controller';
import { TranscriptService } from './transcript.service';

@Module({
  imports: [MinioClientModule, UsersModule, PrismaModule, CoursesModule],
  controllers: [TranscriptController],
  providers: [TranscriptService],
})
export class TranscriptModule {}
