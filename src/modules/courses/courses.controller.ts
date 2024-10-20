import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateSectionDto, SectionResponseDto } from '../sections/dto';

import { CoursesService } from './courses.service';
import {
  CourseResponseDto,
  CreateCourseDto,
  GetCourseDetailQuery,
  GetCoursesQueryDto,
  JobSearchRequestDto,
  UpdateCourseDto,
} from './dto';

import { ApiPaginatedResponse } from '@/common/decorators';
import { ParseCourseIdPipe } from '@/common/pipes';
import { PaginateResponseDto } from '@/shared/dto';

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
  
  @Get('/search-by-jobs')
  @ApiPaginatedResponse(CourseResponseDto)
  @UsePipes(new ValidationPipe({ transform: true })) // Use a basic ValidationPipe instead
  async searchCoursesByJobs(
    @Query() jobSearchRequestDto: JobSearchRequestDto
  ): Promise<PaginateResponseDto<CourseResponseDto>> {
    console.log('Received job search request:', jobSearchRequestDto); // Add this for debugging

    const courses = await this.coursesService.searchCoursesByJobs(jobSearchRequestDto);

    return courses;
  }

  @Put(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async updateCourse(
    @Param('id', new ParseCourseIdPipe()) courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    const updatedCourse = await this.coursesService.updateCourse(courseId, updateCourseDto);

    return CourseResponseDto.formatCourseResponse(updatedCourse);
  }

  @Get()
  @ApiPaginatedResponse(CourseResponseDto)
  async getCourses(
    @Query() getCoursesQueryDto: GetCoursesQueryDto,
  ): Promise<PaginateResponseDto<CourseResponseDto>> {
    
    const courses = await this.coursesService.getCourses(getCoursesQueryDto);

    return courses;
  }

  @Get(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async getCourse(
    @Param('id', new ParseCourseIdPipe()) courseId: string,
    @Query() getCourseDetailQuery: GetCourseDetailQuery,
  ): Promise<CourseResponseDto> {
    const course = await this.coursesService.getCourseByIdOrThrow(courseId, getCourseDetailQuery);

    return CourseResponseDto.formatCourseResponse(course);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: CourseResponseDto,
  })
  async deleteCourse(
    @Param('id', new ParseCourseIdPipe()) courseId: string,
  ): Promise<CourseResponseDto> {
    const deletedCourse = await this.coursesService.deleteCourse(courseId);

    return CourseResponseDto.formatCourseResponse(deletedCourse);
  }

  @Post(':id/section')
  @ApiCreatedResponse({
    type: SectionResponseDto,
  })
  async createCourseSection(
    @Param('id', new ParseCourseIdPipe()) courseId: string,
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<SectionResponseDto> {
    const createdSection = await this.coursesService.createCourseSection(
      courseId,
      createSectionDto,
    );

    return SectionResponseDto.formatSectionResponse(createdSection);
  }


  


}
