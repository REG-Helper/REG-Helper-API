import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateTeacherDto, TeacherResponseDto, UpdateTeacherDto } from './dto';
import { TeachersService } from './teachers.service';

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
  async getTeacher(@Param('id') teacherId: string): Promise<TeacherResponseDto> {
    return this.teachersService.getTeacher(teacherId);
  }

  @Post()
  @ApiCreatedResponse({
    type: TeacherResponseDto,
  })
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherResponseDto> {
    return this.teachersService.createTeacher(createTeacherDto);
  }

  @Put(':id')
  @ApiOkResponse({
    type: TeacherResponseDto,
  })
  async updateTeacher(
    @Param('id') teacherId: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherResponseDto> {
    return this.teachersService.updateTeacher(teacherId, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: TeacherResponseDto,
  })
  async deleteTeacher(@Param('id') teacherId: string): Promise<TeacherResponseDto> {
    return this.teachersService.deleteTeacher(teacherId);
  }
}
