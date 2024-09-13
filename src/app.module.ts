import { CacheModule } from '@nestjs/cache-manager';
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
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
    MinioClientModule,
    UsersModule,
    TranscriptModule,
    OAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
