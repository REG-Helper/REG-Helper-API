import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Env } from './env';

@Injectable()
export class EnvService {
  constructor(private configervice: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T): Env[T] {
    return this.configervice.get(key, { infer: true });
  }
}
