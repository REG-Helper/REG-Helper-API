import { BadRequestException, Injectable } from '@nestjs/common';

import * as pdfParse from 'pdf-parse';

import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class TranscriptService {
  constructor(private readonly minioClientService: MinioClientService) {}

  async uploadTranscript(file: Express.Multer.File) {
    const parsedTranscript = await pdfParse(file.buffer);
    const transcript = parsedTranscript.text;

    if (!transcript) {
      throw new BadRequestException(`Can't parse transcript file`);
    }

    const userName: string | null = /Name\s+([^\n]+)/.exec(transcript)?.[1] ?? '';
    const dateOfBirth: string | null =
      /Date of Birth\s+([^\s]+)\s+Student/.exec(transcript)?.[1] ?? '';

    const studentId: string | null = /Student ID\s+(\d+)/.exec(transcript)?.[1] ?? '';
    const degree: string | null = /Degree\s+([^\n]+)/.exec(transcript)?.[1] ?? '';
    const major: string | null = /Major\s+([^\n]+)/.exec(transcript)?.[1] ?? '';
    // eslint-disable-next-line sonarjs/slow-regex
    const regex = /(\d{8})(.*?)(\d)([ABCDEFWS]\+?)/g;
    const user = {
      name: userName,
      dateOfBirth,
      studentId: parseInt(studentId),
      degree,
      major,
    };

    console.log(user);

    const matches = transcript.matchAll(regex);
    const courses: Array<{ id: number; name: string; credit: number; grade: string }> = [];

    for (const match of matches) {
      courses.push({
        id: parseInt(match[1]),
        name: match[2],
        credit: parseInt(match[3]),
        grade: match[4],
      });
    }

    return courses;
  }
}
