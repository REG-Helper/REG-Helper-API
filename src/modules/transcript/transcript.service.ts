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

    const [userData, , couresData] = transcript.split('CREDITGRADE');
    // eslint-disable-next-line sonarjs/slow-regex
    const userName: string = userData.match(/Name\s+(.+)\n/)?.[1] ?? '';
    // eslint-disable-next-line sonarjs/slow-regex
    const dateOfBirth: string = userData.match(/Date of Birth\s+(.+)Student/)?.[1] ?? '';
    const studentId: string = userData.match(/Student ID\s+(\d+)/)?.[1] ?? '';
    // eslint-disable-next-line sonarjs/slow-regex
    const degree: string = userData.match(/Degree\s+(.+)\n/)?.[1] ?? '';
    // eslint-disable-next-line sonarjs/slow-regex
    const major: string = userData.match(/Major\s+(.+)\n/)?.[1] ?? '';
    const courseRegex = /(\d{8})(.*?\d?)(\d)([ABCDEFWS]+?)?/g;
    const user = {
      name: userName,
      dateOfBirth,
      studentId: parseInt(studentId),
      degree,
      major,
    };

    const matches = couresData.matchAll(courseRegex);
    const courses: Array<{ id: number; name: string; credit: number; grade: string }> = [];

    for (const match of matches) {
      courses.push({
        id: parseInt(match[1]),
        name: match[2],
        credit: parseInt(match[3]),
        grade: match[4],
      });
    }

    return { user, courses };
  }
}
