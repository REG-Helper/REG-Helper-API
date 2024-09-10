import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

import { EnvService } from '../env/env.service';
import { UsersService } from '../users/users.service';

import { AuthResponseDto, GoogleLoginDto } from './dto';

import { KMITL_EMAIL_DOMAIN, KMITL_EMAIL_REGEX } from '@/shared/constants';
import { IJwtPayload } from '@/shared/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly googleClient = new OAuth2Client({
    clientId: this.envService.get('GOOGLE_CLIENT_ID'),
    clientSecret: this.envService.get('GOOGLE_CLIENT_SECRET'),
  });

  async googleLogin(googleLoginDto: GoogleLoginDto): Promise<AuthResponseDto> {
    const { token } = googleLoginDto;
    const googleOauthProfile = await this.verifyGoogleOauthToken(token);

    if (!googleOauthProfile) {
      throw new UnauthorizedException();
    }

    if (googleOauthProfile?.hd !== KMITL_EMAIL_DOMAIN) {
      throw new ForbiddenException();
    }

    const user = await this.usersService.findUser({ email: googleOauthProfile.email });

    if (!user) {
      return this.register(googleOauthProfile);
    }

    const updatedUser = await this.usersService.updateUser({
      where: {
        email: user.email,
      },
      data: {
        profileImage: googleOauthProfile.picture,
      },
    });

    const accessToken = this.generateAccessToken(updatedUser.studentId);

    return AuthResponseDto.formatAuthResponse({ user: updatedUser, accessToken });
  }

  async register(payload: TokenPayload): Promise<AuthResponseDto> {
    const match = payload.email?.match(KMITL_EMAIL_REGEX);

    if (!match) {
      throw new BadRequestException();
    }

    const studentId = match[1];
    const createdUser = await this.usersService.createUser({
      email: payload.email,
      studentId,
      googleOauthId: payload.sub,
      profileImage: payload.picture,
    } as User);

    const accessToken = this.generateAccessToken(createdUser.studentId);

    return AuthResponseDto.formatAuthResponse({ user: createdUser, accessToken });
  }

  private async verifyGoogleOauthToken(idToken: string): Promise<TokenPayload | undefined> {
    const payload = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.envService.get('GOOGLE_CLIENT_ID'),
    });

    return payload.getPayload();
  }

  private generateAccessToken(studentId: string): string {
    const payload: IJwtPayload = {
      sub: studentId,
    };

    return this.jwtService.sign(payload, {
      secret: this.envService.get('ACCESS_SECRET'),
      expiresIn: this.envService.get('ACCESS_EXPIRES_IN'),
    });
  }
}
