import { BadRequestException, Injectable } from '@nestjs/common';

import { Prisma, Transcript, User } from '@prisma/client';
import * as pdfParse from 'pdf-parse';

import { MinioClientService } from '../minio-client/minio-client.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

import { UploadTranscriptResponseDto } from './dto';

import { MINIO_FOLDER } from '@/shared/constants';
import { parseDataFromTranscript } from '@/shared/utils';

@Injectable()
export class TranscriptService {
  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async uploadTranscript(
    user: User,
    file: Express.Multer.File,
  ): Promise<UploadTranscriptResponseDto> {
    const parsedTranscript = await pdfParse(file.buffer);
    const transcriptText = parsedTranscript.text;

    if (!transcriptText) {
      throw new BadRequestException(`Can't parse transcript file`);
    }

    const { user: extractUser } = parseDataFromTranscript(transcriptText);
    // Check courses is exist in database
    const updatedUser = await this.usersService.updateUser({
      where: { studentId: user.studentId },
      data: {
        firstname: extractUser.firstname,
        lastname: extractUser.lastname,
      },
    });

    const transcriptExists = await this.findTranscript({ userId: user.studentId });

    if (transcriptExists) {
      await this.minioClientService.deleteFile(transcriptExists.url);
    }

    const uploadedTranscript = await this.minioClientService.upload(file, MINIO_FOLDER.transcript);
    const transcript = await this.upsertTranscript({
      where: {
        userId: user.studentId,
      },
      data: {
        url: uploadedTranscript,
        user: {
          connect: {
            studentId: user.studentId,
          },
        },
      },
    });

    return UploadTranscriptResponseDto.formatUploadTranscriptReponse(transcript, updatedUser);
  }

  async findTranscript(where: Prisma.TranscriptWhereUniqueInput): Promise<Transcript | null> {
    return this.prisma.transcript.findUnique({ where });
  }

  async upsertTranscript(params: {
    where: Prisma.TranscriptWhereUniqueInput;
    data: Prisma.TranscriptCreateInput;
  }): Promise<Transcript> {
    const { where, data } = params;

    return this.prisma.transcript.upsert({
      where,
      update: data,
      create: data,
    });
  }
}
