import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
