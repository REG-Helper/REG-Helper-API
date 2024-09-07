import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, EnvModule ,TranscriptModule} from './modules';

@Module({
  imports: [AuthModule, EnvModule ,TranscriptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
