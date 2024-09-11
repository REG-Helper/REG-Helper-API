import { BadRequestException, Injectable } from '@nestjs/common';

import { Prisma, Transcript, User } from '@prisma/client';
import * as pdfParse from 'pdf-parse';

import { MinioClientService } from '../minio-client/minio-client.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

import { MINIO_FOLDER } from '@/shared/constants';
import { parseDataFromTranscript } from '@/shared/utils';

@Injectable()
export class TranscriptService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async uploadTranscript(user: User, file: Express.Multer.File) {
    const parsedTranscript = await pdfParse(file.buffer);
    const transcriptText = parsedTranscript.text;

    if (!transcriptText) {
      throw new BadRequestException(`Can't parse transcript file`);
    }

    const { user: extractUser, courses } = parseDataFromTranscript(transcriptText);
    // Check courses is exist in database
    const updatedUser = await this.usersService.updateUser({
      where: { studentId: user.studentId },
      data: {
        firstname: extractUser.firstname,
        lastname: extractUser.lastname,
      },
    });

    const uploadedTranscript = await this.minioClientService.upload(file, MINIO_FOLDER.transcript);

    await this.createTranscript({
      url: uploadedTranscript,
      user: {
        connect: {
          studentId: user.studentId,
        },
      },
    });

    return {
      extractUser,
      updatedUser,
      courses,
    };
  }

  async createTranscript(data: Prisma.TranscriptCreateInput): Promise<Transcript> {
    return this.prisma.transcript.create({ data });
  }
}
