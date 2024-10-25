import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { SkillJobMappingResponseDto } from '../skill-job-mapping/dto';
import { SkillJobMappingService } from '../skill-job-mapping/skill-job-mapping.service';

import { CreateJobDto, JobResponseDto, UpdateJobDto } from './dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
@ApiTags('jobs')
// @UseGuards(AccessTokenGuard)
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly skillJobMappingService: SkillJobMappingService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: JobResponseDto,
  })
  async createJob(@Body() createJobDto: CreateJobDto): Promise<JobResponseDto> {
    const createdJob = await this.jobsService.createJob(createJobDto);

    return JobResponseDto.formatJobResponse(createdJob);
  }

  @Get()
  @ApiOkResponse({
    type: [SkillJobMappingResponseDto],
  })
  async getJobs(): Promise<SkillJobMappingResponseDto[]> {
    const mappings = await this.skillJobMappingService.getJobs();

    return mappings.map(SkillJobMappingResponseDto.fromEntity);
  }

  @Get(':id')
  @ApiOkResponse({
    type: JobResponseDto,
  })
  async getJob(@Param('id') jobId: string): Promise<JobResponseDto> {
    const job = await this.jobsService.getJobByIdOrThrow(jobId);

    return JobResponseDto.formatJobResponse(job);
  }

  @Put(':id')
  @ApiOkResponse({
    type: JobResponseDto,
  })
  async updateJob(
    @Param('id') jobId: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<JobResponseDto> {
    const updatedJob = await this.jobsService.updateJob(jobId, updateJobDto);

    return JobResponseDto.formatJobResponse(updatedJob);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: JobResponseDto,
  })
  async deleteJob(@Param('id') jobId: string): Promise<JobResponseDto> {
    const deletedJob = await this.jobsService.deleteJob(jobId);

    return JobResponseDto.formatJobResponse(deletedJob);
  }
}
