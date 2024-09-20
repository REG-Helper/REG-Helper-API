import { ApiProperty } from '@nestjs/swagger';

import { DayOfWeek } from '@prisma/client';

import { TeacherResponseDto } from '@/modules/teachers/dto';
import { SectionWithTeachers } from '@/shared/interfaces';

export class SectionResponseDto {
  @ApiProperty({
    example: '02fed77c-1628-4f91-9c6e-9fe1ca9d833e',
  })
  id: string;

  @ApiProperty({
    example: 'Section 1',
  })
  name: string;

  @ApiProperty({
    enum: DayOfWeek,
    example: `${DayOfWeek.FRIDAY} ex. ${Object.values(DayOfWeek).join(', ')}`,
  })
  day: DayOfWeek;

  @ApiProperty({
    example: 'Room 101',
  })
  room: string;

  @ApiProperty({
    example: 2024,
  })
  year: number;

  @ApiProperty({
    example: 1,
  })
  semester: number;

  @ApiProperty({
    example: 30,
  })
  limit: number | null;

  @ApiProperty({
    example: 25,
  })
  count: number;

  @ApiProperty({
    example: '2024-10-15T09:00:00.000Z',
  })
  midtermExamDate: Date | null;

  @ApiProperty({
    example: '2024-12-20T09:00:00.000Z',
  })
  finalExamDate: Date | null;

  @ApiProperty({
    example: 'condition',
  })
  condition: string | null;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
  })
  startAt?: Date | null;

  @ApiProperty({
    example: '2024-10-15T09:00:00Z',
  })
  endAt?: Date | null;

  @ApiProperty({
    type: [TeacherResponseDto],
  })
  teachers: TeacherResponseDto[];

  constructor(partial: Partial<SectionResponseDto>) {
    Object.assign(this, partial);
  }

  static formatSectionResponse(section: SectionWithTeachers): SectionResponseDto {
    const { sectionTeachers, courseId, ...sectionDetail } = section;

    return new SectionResponseDto({
      ...sectionDetail,
      teachers: sectionTeachers.map(sectionTeacher =>
        TeacherResponseDto.formatTeacherResponse(sectionTeacher.teacher),
      ),
    });
  }

  static formatSectionsResponse(sections: SectionWithTeachers[]): SectionResponseDto[] {
    return sections.map(section => this.formatSectionResponse(section));
  }
}
