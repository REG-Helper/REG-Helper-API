import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateJobDto, JobResponseDto, UpdateJobDto } from './dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
@ApiTags('jobs')
// @UseGuards(AccessTokenGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

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
    type: [JobResponseDto],
  })
  async getJobs(): Promise<JobResponseDto[]> {
    const jobs = await this.jobsService.getJobs();

    return JobResponseDto.formatJobsResponse(jobs);
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
