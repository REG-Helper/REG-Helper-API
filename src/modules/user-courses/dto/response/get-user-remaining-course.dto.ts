import { ApiProperty } from '@nestjs/swagger';

import { CourseResponseDto } from '@/modules/courses/dto';

class CourseGroup {
  @ApiProperty({
    type: CourseResponseDto,
  })
  fixedCourses: CourseResponseDto[];

  @ApiProperty({
    example: 1,
    type: Number,
  })
  electiveCourses: number;
}

class RemainingCourses {
  @ApiProperty({
    example: 9,
    type: Number,
  })
  remainingCredits: number;

  @ApiProperty({
    example: 12,
    type: Number,
  })
  requiredCredits: number;

  @ApiProperty({
    type: CourseGroup,
  })
  courses: CourseGroup;
}

export class GetUserRemainingCourseResponseDto {
  @ApiProperty({
    type: RemainingCourses,
  })
  gedEdFundamental: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  genEdLanguageCommunication: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  genEdFacultySpecific: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  gendEdElective: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  specificCore: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  specificReq: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  specificElectiveReq: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  specificAltStudy: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  specificMajorElective: RemainingCourses;

  @ApiProperty({
    type: RemainingCourses,
  })
  freeElective: RemainingCourses;
}
