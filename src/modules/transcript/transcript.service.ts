import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaClient, Transcript, User } from '@prisma/client';
import * as pdfParse from 'pdf-parse';

import { CoursesService } from '../courses/courses.service';
import { MinioClientService } from '../minio-client/minio-client.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

import { UploadTranscriptResponseDto } from './dto';

import { MINIO_FOLDER } from '@/shared/constants';
import { IUserCourseData } from '@/shared/interfaces';
import { parseDataFromTranscript } from '@/shared/utils';

@Injectable()
export class TranscriptService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly coursesService: CoursesService,
  ) {}

  async upload(user: User, file: Express.Multer.File): Promise<UploadTranscriptResponseDto> {
    const parsedTranscript = await pdfParse(file.buffer);
    const transcriptText = parsedTranscript.text;

    if (!transcriptText) {
      throw new BadRequestException(`Can't parse transcript file`);
    }

    const { user: extractUser, courses } = parseDataFromTranscript(transcriptText);
    const userCourses = courses.map(course => ({ courseId: course.id, userId: user.studentId }));
    const missingCourses = await this.coursesService.findMissingCourseIds(
      courses.map(course => course.id),
    );

    const result = await this.prisma.$transaction(
      async prisma => {
        const transcript = await this.uploadTranscript(prisma as PrismaClient, user, file);
        const updatedUser = await prisma.user.update({
          where: { studentId: user.studentId },
          data: {
            firstname: extractUser.firstname,
            lastname: extractUser.lastname,
            department: extractUser.major,
            faculty: extractUser.degree,
          },
        });

        await this.updateUserCourse(prisma as PrismaClient, user, userCourses);

        return { updatedUser, transcript };
      },
      {
        maxWait: 2000,
        timeout: 10000,
      },
    );

    const url = await this.minioClientService.getFileUrl(result.transcript.url);

    result.transcript.url = url;

    return UploadTranscriptResponseDto.formatUploadTranscriptReponse(
      result.transcript,
      result.updatedUser,
      missingCourses,
    );
  }

  private async uploadTranscript(
    prisma: PrismaClient,
    user: User,
    transcriptFile: Express.Multer.File,
  ): Promise<Transcript> {
    const transcriptExists = await prisma.transcript.findUnique({
      where: { userId: user.studentId },
    });

    if (transcriptExists) {
      await this.minioClientService.deleteFile(transcriptExists.url);
    }

    const uploadedTranscript = await this.minioClientService.upload(
      transcriptFile,
      MINIO_FOLDER.transcript,
    );

    const upsertTranscirptData = {
      url: uploadedTranscript,
      user: {
        connect: {
          studentId: user.studentId,
        },
      },
    };

    const transcript = await prisma.transcript.upsert({
      where: {
        userId: user.studentId,
      },
      update: upsertTranscirptData,
      create: upsertTranscirptData,
    });

    return transcript;
  }

  private async updateUserCourse(
    prisma: PrismaClient,
    user: User,
    userCourses: IUserCourseData[],
  ): Promise<void> {
    await prisma.userCourses.deleteMany({ where: { userId: user.studentId } });
    await prisma.userCourses.createMany({ data: userCourses });
  }
}
