import { ApiProperty } from '@nestjs/swagger';

export class JobScoreDto {
  @ApiProperty({
    example: 'Software Engineer',
    description: 'Job title in English',
  })
  nameEn: string;

  @ApiProperty({
    example: 'นักพัฒนาซอฟต์แวร์',
    description: 'Job title in Thai',
  })
  nameTh: string;

  @ApiProperty({
    example: 85,
    description: 'Relevancy score for this job based on user skills',
  })
  relevancyScore: number;

  constructor(partial: Partial<JobScoreDto>) {
    Object.assign(this, partial);
  }
}

export class TopJobsResponseDto {
  @ApiProperty({
    type: [JobScoreDto],
    description: 'Top 3 most relevant jobs based on user skills',
  })
  topJobs: JobScoreDto[];

  constructor(partial: Partial<TopJobsResponseDto>) {
    Object.assign(this, partial);
  }
}
