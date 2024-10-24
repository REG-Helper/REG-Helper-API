import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserRole } from '@prisma/client';

import { CreateSectionDto, SectionResponseDto } from '../sections/dto';

import { CoursesService } from './courses.service';
import {
  CourseResponseDto,
  CreateCourseDto,
  GetCourseDetailQuery,
  GetCoursesQueryDto,
  UpdateCourseDto,
} from './dto';

import { ApiPaginatedResponse, Roles } from '@/common/decorators';
import { AccessTokenGuard, RolesGuard } from '@/common/guards';
import { ParseCourseIdPipe } from '@/common/pipes';
import { PaginateResponseDto } from '@/shared/dto';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiCreatedResponse({
    type: CourseResponseDto,
  })
  async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CourseResponseDto> {
    const createdCourse = await this.coursesService.createCourse(createCourseDto);

    return CourseResponseDto.formatCourseResponse(createdCourse);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
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
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
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
  @Roles(UserRole.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
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
