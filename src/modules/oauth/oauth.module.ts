import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { EnvModule } from '../env/env.module';
import { UsersModule } from '../users/users.module';

import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [
    EnvModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}
