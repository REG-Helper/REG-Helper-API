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
    const createdCourse = await this.coursesService.createCourse(createCourseDto);

    return CourseResponseDto.formatCourseResponse(createdCourse);
  }

  @Put(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async updateCourse(
    @Param('id') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    const updatedCourse = await this.coursesService.updateCourse(courseId, updateCourseDto);

    return CourseResponseDto.formatCourseResponse(updatedCourse);
  }

  @Get()
  @ApiOkResponse({
    type: [CourseResponseDto],
  })
  async getCourses(): Promise<CourseResponseDto[]> {
    const courses = await this.coursesService.getCourses();

    return CourseResponseDto.formatCoursesResponse(courses);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async getCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    const course = await this.coursesService.getCourseByIdOrThrow(courseId);

    return CourseResponseDto.formatCourseResponse(course);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async deleteCourse(@Param('id') courseId: string): Promise<CourseResponseDto> {
    const deletedCourse = await this.coursesService.deleteCourse(courseId);

    return CourseResponseDto.formatCourseResponse(deletedCourse);
  }

  @Post(':id/section')
  @ApiCreatedResponse({
    type: SectionResponseDto,
  })
  async createCourseSection(
    @Param('id') courseId: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<SectionResponseDto> {
    const createdSection = await this.coursesService.createCourseSection(
      courseId,
      createSectionDto,
    );

    return SectionResponseDto.formatSectionResponse(createdSection);
  }
}
