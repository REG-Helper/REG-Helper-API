import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@prisma/client';

import { CreateTeacherDto, TeacherResponseDto, UpdateTeacherDto } from './dto';
import { TeachersService } from './teachers.service';

import { Roles } from '@/common/decorators';
import { AccessTokenGuard, RolesGuard } from '@/common/guards';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @ApiOkResponse({
    type: [TeacherResponseDto],
  })
  async getTeachers(): Promise<TeacherResponseDto[]> {
    return this.teachersService.getTeachers();
  }

  @Get(':id')
  @ApiOkResponse({
    type: TeacherResponseDto,
  })
  async getTeacher(
    @Param('id', new ParseUUIDPipe()) teacherId: string,
  ): Promise<TeacherResponseDto> {
    return this.teachersService.getTeacherByIdOrThrow(teacherId);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiCreatedResponse({
    type: TeacherResponseDto,
  })
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherResponseDto> {
    return this.teachersService.createTeacher(createTeacherDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: TeacherResponseDto,
  })
  async updateTeacher(
    @Param('id', new ParseUUIDPipe()) teacherId: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherResponseDto> {
    return this.teachersService.updateTeacher(teacherId, updateTeacherDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiOkResponse({
    type: TeacherResponseDto,
  })
  async deleteTeacher(
    @Param('id', new ParseUUIDPipe()) teacherId: string,
  ): Promise<TeacherResponseDto> {
    return this.teachersService.deleteTeacher(teacherId);
  }
}
