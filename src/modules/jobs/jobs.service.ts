import { Injectable, NotFoundException } from '@nestjs/common';

import { Job } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateJobDto, UpdateJobDto } from './dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    return this.prisma.job.create({
      data: createJobDto,
    });
  }

  async getJobs(): Promise<Job[]> {
    return this.prisma.job.findMany();
  }

  async getJobByIdOrThrow(jobId: string): Promise<Job> {
    const job = await this.prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async updateJob(jobId: string, updatejobDto: UpdateJobDto): Promise<Job> {
    await this.getJobByIdOrThrow(jobId);

    return this.prisma.job.update({
      where: {
        id: jobId,
      },
      data: updatejobDto,
    });
  }

  async deleteJob(jobId: string): Promise<Job> {
    await this.getJobByIdOrThrow(jobId);

    return this.prisma.job.delete({
      where: {
        id: jobId,
      },
    });
  }

  async createMany(createJobDtos: CreateJobDto[]): Promise<number> {
    const result = await this.prisma.job.createMany({
      data: createJobDtos,
      skipDuplicates: true,
    });

    return result.count;
  }
}
