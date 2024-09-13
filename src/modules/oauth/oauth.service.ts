import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { OAuthProvider, User } from '@prisma/client';
import { AxiosError } from 'axios';
import { Cache } from 'cache-manager';
import { catchError, lastValueFrom } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { AuthResponseDto } from '../auth/dto';
import { EnvService } from '../env/env.service';
import { UsersService } from '../users/users.service';

import { OAuthClass } from './classes';
import { LoginDto } from './dto';

import { IClient } from '@/shared/interfaces';
import { extractStudentIdFromEmail, getCacheKey } from '@/shared/utils';

@Injectable()
export class OAuthService {
  private readonly [OAuthProvider.GOOGLE]: OAuthClass;

  constructor(
    private readonly envService: EnvService,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    const oauthRedirectUrl = this.envService.get('OAUTH_REDIRECT_URL');

    this[OAuthProvider.GOOGLE] = this.setOAuthClass(
      OAuthProvider.GOOGLE,
      envService,
      oauthRedirectUrl,
    );
  }

  async getAuthorizationUrl(provider: OAuthProvider): Promise<string> {
    const [url, state] = this.getOAuth(provider).authorizationUrl;

    await this.cacheManager.set(getCacheKey('OAUTH_STATE', state), provider, 5 * 60 * 1000);

    return url;
  }

  async oauthLogin(provider: OAuthProvider, loginDto: LoginDto): Promise<AuthResponseDto> {
    const userInfo = await this.getUserInfo(provider, loginDto);
    const studentId = extractStudentIdFromEmail(userInfo.email);

    if (!studentId) {
      throw new UnauthorizedException();
    }

    const userExists = await this.usersService.findUser({
      where: {
        email: userInfo.email,
      },
      include: {
        oauthProvider: {
          where: {
            provider,
          },
        },
      },
    });

    const user = !userExists
      ? await this.createNewUser('GOOGLE', userInfo, studentId)
      : await this.updateExistUser('GOOGLE', userInfo, studentId);

    const accessToken = this.authService.generateAccessToken(user.studentId);

    return AuthResponseDto.formatAuthResponse(user, accessToken);
  }

  private async createNewUser(
    provider: OAuthProvider,
    userInfo: Record<string, never>,
    studentId: string,
  ): Promise<User> {
    return this.usersService.createUser({
      email: userInfo.email,
      profileImage: userInfo.picture,
      studentId,
      oauthProvider: {
        create: {
          provider,
        },
      },
    });
  }

  private async updateExistUser(
    provider: OAuthProvider,
    userInfo: Record<string, never>,
    studentId: string,
  ): Promise<User> {
    return this.usersService.updateUser({
      where: {
        email: userInfo.email,
      },
      data: {
        profileImage: userInfo.picture,
        oauthProvider: {
          upsert: {
            where: {
              userId_provider: {
                userId: studentId,
                provider,
              },
            },
            update: {},
            create: { provider },
          },
        },
      },
    });
  }

  private async getUserInfo<T extends Record<string, never>>(
    provider: OAuthProvider,
    loginDto: LoginDto,
  ): Promise<T> {
    const { state, code } = loginDto;
    const accessToken = await this.getAccessToken(provider, code, state);
    const response = await lastValueFrom(
      this.httpService
        .get<T>(this.getOAuth(provider).infoUrl, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new UnauthorizedException(error.response?.data);
          }),
        ),
    );

    return response.data;
  }

  private async getAccessToken(
    provider: OAuthProvider,
    code: string,
    state: string,
  ): Promise<string> {
    const oauth = this.getOAuth(provider);
    const stateProvider = await this.cacheManager.get(getCacheKey('OAUTH_STATE', state));

    if (!stateProvider || provider !== stateProvider) {
      throw new UnauthorizedException();
    }

    return oauth.getToken(code);
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
