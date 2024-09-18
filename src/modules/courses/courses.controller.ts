import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './dto';
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

  @Patch(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async updateCourse(@Param(':id') courseId: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.updateCourse(courseId, updateCourseDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: [CourseResponseDto],
  })
  async getCourses(): Promise<CourseResponseDto[]> {
    return this.coursesService.getCourses();
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: CourseResponseDto,
  })
  async getCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    return this.coursesService.getCourse(courseId);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: CourseResponseDto,
  })
  async deleteCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    return this.coursesService.deleteCourse(courseId);
  }
}
