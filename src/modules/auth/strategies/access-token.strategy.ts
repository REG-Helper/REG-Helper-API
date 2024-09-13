import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvService } from '@/modules/env/env.service';
import { UsersService } from '@/modules/users/users.service';
import { IJwtPayload } from '@/shared/interfaces';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor(
    private readonly usersService: UsersService,
    private readonly envService: EnvService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('ACCESS_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.usersService.findUser({
      where: {
        studentId: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
