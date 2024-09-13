import { Module } from '@nestjs/common';

import { EnvModule } from '../env/env.module';

import { MinioClientService } from './minio-client.service';

@Module({
  imports: [EnvModule],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
