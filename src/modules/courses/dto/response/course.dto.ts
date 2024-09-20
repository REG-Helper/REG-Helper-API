import { ApiProperty } from '@nestjs/swagger';

import { CourseGroup, CourseSubGroup, CourseType } from '@prisma/client';

import { SectionResponseDto } from '@/modules/sections/dto';
import { CourseWithSections, SectionWithTeachers } from '@/shared/interfaces';

export class CourseResponseDto {
  @ApiProperty({
    example: '01020318',
  })
  id: string;

  @ApiProperty({
    example: 'Introduction to Programming',
  })
  nameEn: string;

  @ApiProperty({
    example: 'การเขียนโปรแกรมเบื้องต้น',
  })
  nameTh: string;

  @ApiProperty({
    example: 'This course introduces the fundamentals of programming.',
  })
  descriptionEn: string;

  @ApiProperty({
    example: 'วิชานี้แนะนำพื้นฐานของการเขียนโปรแกรม',
  })
  descriptionTh: string;

  @ApiProperty({
    example: 3,
  })
  credit: number;
  @ApiProperty({
    example: '3 (3-0-6)',
  })
  creditStr: string;

  @ApiProperty({
    enum: CourseType,
  })
  type: CourseType;

  @ApiProperty({
    enum: CourseGroup,
    example: `${CourseGroup.FREE_ELEC} ex. ${Object.values(CourseGroup).join(', ')}`,
  })
  group: CourseGroup;

  @ApiProperty({
    enum: CourseSubGroup,
    example: `${CourseSubGroup.ALT_STUDY} ex. ${Object.values(CourseSubGroup).join(', ')}`,
  })
  subGroup: CourseSubGroup;

  @ApiProperty({
    type: [SectionResponseDto],
  })
  sections: SectionResponseDto[];

  constructor(partial: Partial<CourseResponseDto>) {
    Object.assign(this, partial);
  }

  static formatCourseResponse(course: CourseWithSections): CourseResponseDto {
    const { sections, ...courseDetail } = course;

    return new CourseResponseDto({
      ...courseDetail,
      sections: sections.map(section =>
        SectionResponseDto.formatSectionResponse(section as SectionWithTeachers),
      ),
    });
  }

  static formatCoursesResponse(courses: CourseWithSections[]): CourseResponseDto[] {
    return courses.map(course => this.formatCourseResponse(course));
  }
}
