import { BadRequestException, Injectable } from '@nestjs/common';

import * as pdfParse from 'pdf-parse';

import { MinioClientService } from '../minio-client/minio-client.service';

import { parseDataFromTranscript } from '@/shared/utils';

@Injectable()
export class TranscriptService {
  constructor(private readonly minioClientService: MinioClientService) {}

  async uploadTranscript(file: Express.Multer.File) {
    const parsedTranscript = await pdfParse(file.buffer);
    const transcript = parsedTranscript.text;

    if (!transcript) {
      throw new BadRequestException(`Can't parse transcript file`);
    }

    const { user, courses } = parseDataFromTranscript(transcript);

    return {
      user,
      courses,
    };
  }
}
