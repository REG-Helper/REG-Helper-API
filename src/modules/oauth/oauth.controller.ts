import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OAuthProvider } from '@prisma/client';

import { OAuthService } from './oauth.service';

@Controller('oauth')
@ApiTags('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get('google')
  async getAuthorizationGoogleUrl(): Promise<string> {
    return this.oauthService.getAuthorizationUrl(OAuthProvider.GOOGLE);
  }
}
