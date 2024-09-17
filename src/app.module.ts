import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  CoursesModule,
  EnvModule,
  MinioClientModule,
  OAuthModule,
  SectionTimesModule,
  SectionsModule,
  TeachersModule,
  TranscriptModule,
  UserCoursesModule,
  UsersModule,
} from './modules';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
    MinioClientModule,
    UsersModule,
    TranscriptModule,
    OAuthModule,
    CoursesModule,
    SectionTimesModule,
    SectionsModule,
    TeachersModule,
    UserCoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
