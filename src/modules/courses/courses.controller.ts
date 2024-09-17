import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto';
import { CourseResponseDto } from './dto/response/course.dto';

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

  @Get()
  async getCourses(): Promise<CourseResponseDto[]> {
    return this.coursesService.getCourses();
  }

  @Get(':id')
  async getCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    return this.coursesService.getCourse(courseId);
  }
}
