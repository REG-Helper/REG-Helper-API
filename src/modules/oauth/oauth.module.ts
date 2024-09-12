import { Module } from '@nestjs/common';

import { EnvModule } from '../env/env.module';

import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';

@Module({
  imports: [EnvModule],
  controllers: [OAuthController],
  providers: [OAuthService],
})
export class OAuthModule {}
