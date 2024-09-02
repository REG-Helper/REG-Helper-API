import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env';
import { EnvService } from './env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: config => envSchema.parse(config),
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
