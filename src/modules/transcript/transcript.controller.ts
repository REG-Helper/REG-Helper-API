import { Controller, Post } from '@nestjs/common';

import { TranscriptService } from './transcript.service';

@Controller('transcript')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}
  @Post('upload')
  async uploadTranscript(file: Express.Multer.File) {
    if (!file) {
      return { success: false, message: 'Invalid file' };
    }

    const res = await this.transcriptService.uploadTranscript(file);

    return { success: true, data: res };
  }
}
