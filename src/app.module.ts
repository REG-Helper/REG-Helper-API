import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  EnvModule,
  MinioClientModule,
  OAuthModule,
  TranscriptModule,
  UsersModule,
} from './modules';

@Module({
  imports: [AuthModule, EnvModule, MinioClientModule, UsersModule, TranscriptModule, OAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
