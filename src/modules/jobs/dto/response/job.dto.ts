import { ApiProperty } from '@nestjs/swagger';

import { Job } from '@prisma/client';

export class JobResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Database Management' })
  nameEn: string;

  @ApiProperty({ example: 'การจัดการฐานข้อมูล' })
  nameTh: string;

  @ApiProperty({ example: '2023-04-01T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-04-01T12:00:00Z' })
  updatedAt: Date;

  constructor(partial: Partial<JobResponseDto>) {
    Object.assign(this, partial);
  }

  static formatJobResponse(job: Job): JobResponseDto {
    return new JobResponseDto(job);
  }

  static formatJobsResponse(jobs: Job[]): JobResponseDto[] {
    return jobs.map(job => this.formatJobResponse(job));
  }
}
