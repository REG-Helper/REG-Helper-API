import { randomBytes } from 'crypto';

import { OAuthProvider } from '@prisma/client';
import { AuthorizationCode } from 'simple-oauth2';

import {
  GOOGLE_OAUTH_ENDPOINTS,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_OAUTH_USER_INFO_URL,
} from '@/shared/config';
import { IAuthParams, IClient, IProvider } from '@/shared/interfaces';

export class OAuthClass {
  private readonly OAuthProviderMap: Map<OAuthProvider, IProvider> = new Map([
    [OAuthProvider.GOOGLE, GOOGLE_OAUTH_ENDPOINTS],
  ]);

  private readonly userInfoUrls: Map<OAuthProvider, string> = new Map([
    [OAuthProvider.GOOGLE, GOOGLE_OAUTH_USER_INFO_URL],
  ]);

  private readonly code: AuthorizationCode;
  private readonly authorization: IAuthParams;
  private readonly userInfoUrl: string;

  constructor(
    private readonly provider: OAuthProvider,
    private readonly client: IClient,
    private readonly redirectUrl: string,
  ) {
    this.code = new AuthorizationCode({
      client,
      auth: this.OAuthProviderMap.get('GOOGLE') as IProvider,
    });
    this.authorization = this.generateAuthorization(provider, redirectUrl) as IAuthParams;
    this.userInfoUrl = this.userInfoUrls.get(provider) as string;
  }

  public get infoUrl(): string {
    return this.userInfoUrl;
  }

  public get authorizationUrl(): [string, string] {
    const state = randomBytes(16).toString('hex');

    return [this.code.authorizeURL({ ...this.authorization, state }), state];
  }

  public async getToken(code: string): Promise<string> {
    const result = await this.code.getToken({
      code,
      redirect_uri: this.authorization.redirect_uri,
      scope: this.authorization.scope,
    });

    return result.token.access_token as string;
  }

  private generateAuthorization(
    provider: OAuthProvider,
    redirectUrl: string,
  ): IAuthParams | undefined {
    const redirect_uri = `${redirectUrl}/auth/${provider.toLowerCase()}/callback`;

    if (OAuthProvider.GOOGLE) {
      return {
        redirect_uri,
        scope: GOOGLE_OAUTH_SCOPE,
      };
    }
  }
}
