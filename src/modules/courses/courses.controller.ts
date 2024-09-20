import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSectionDto, SectionResponseDto } from '../sections/dto';

import { CoursesService } from './courses.service';
import { CourseResponseDto, CreateCourseDto, UpdateCourseDto } from './dto';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiCreatedResponse({
    type: CourseResponseDto,
  })
  async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Put(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async updateCourse(
    @Param('id') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }

  @Get()
  @ApiOkResponse({
    type: [CourseResponseDto],
  })
  async getCourses(): Promise<CourseResponseDto[]> {
    return this.coursesService.getCourses();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async getCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    return this.coursesService.getCourseByIdOrThrow(courseId);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async deleteCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    return this.coursesService.deleteCourse(courseId);
  }

  @Post(':id/section')
  @ApiCreatedResponse({
    type: SectionResponseDto,
  })
  async createCourseSection(
    @Param('id') courseId: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<SectionResponseDto> {
    return this.coursesService.createCourseSection(courseId, createSectionDto);
  }
}
