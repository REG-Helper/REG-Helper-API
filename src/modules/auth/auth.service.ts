import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EnvService } from '../env/env.service';
import { UsersService } from '../users/users.service';

import { IJwtPayload } from '@/shared/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(studentId: string): string {
    const payload: IJwtPayload = {
      sub: studentId,
    };

    return this.jwtService.sign(payload, {
      secret: this.envService.get('ACCESS_SECRET'),
      expiresIn: this.envService.get('ACCESS_EXPIRES_IN'),
    });
  }
}
