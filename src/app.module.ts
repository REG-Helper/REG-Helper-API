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
  SectionsModule,
  SkillCourseMappingModule,
  SkillJobMappingModule,
  SkillsModule,
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
    SectionsModule,
    TeachersModule,
    UserCoursesModule,
    SkillsModule,
    SkillJobMappingModule,
    SkillCourseMappingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
