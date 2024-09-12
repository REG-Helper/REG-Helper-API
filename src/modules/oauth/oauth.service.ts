import { Injectable } from '@nestjs/common';

import { OAuthProvider } from '@prisma/client';

import { EnvService } from '../env/env.service';

import { OAuthClass } from './classes';

import { IClient } from '@/shared/interfaces';

@Injectable()
export class OAuthService {
  private readonly [OAuthProvider.GOOGLE]: OAuthClass;

  constructor(private readonly envService: EnvService) {
    const oauthRedirectUrl = this.envService.get('OAUTH_REDIRECT_URL');

    this[OAuthProvider.GOOGLE] = this.setOAuthClass(
      OAuthProvider.GOOGLE,
      envService,
      oauthRedirectUrl,
    );
  }

  async getAuthorizationUrl(provider: OAuthProvider): Promise<string> {
    const [url, state] = this.getOAuth(provider).authorizationUrl;

    console.log(state);

    return url;
  }

  private getOAuth(provider: OAuthProvider): OAuthClass {
    return this[provider];
  }

  private setOAuthClass(
    provider: OAuthProvider,
    envService: EnvService,
    redirectUrl: string,
  ): OAuthClass {
    const client: IClient = {
      id: this.envService.get(`${provider}_CLIENT_ID`),
      secret: this.envService.get(`${provider}_CLIENT_SECRET`),
    };

    return new OAuthClass(provider, client, redirectUrl);
  }
}
