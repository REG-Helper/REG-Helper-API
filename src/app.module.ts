import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, EnvModule, PrismaModule } from './modules';

@Module({
  imports: [AuthModule, EnvModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
