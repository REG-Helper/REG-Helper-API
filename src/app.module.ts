import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, EnvModule } from './modules';

@Module({
  imports: [AuthModule, EnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
