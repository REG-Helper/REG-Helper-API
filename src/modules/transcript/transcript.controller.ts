import { Controller ,Post, UploadedFile ,UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TranscriptService } from './transcript.service';

@Controller('transcript')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file) {
    if (!file) {
      return { success: false, message: 'No file provided' };
    }

    const result = await this.transcriptService.uploadTranscript(file);

    return { success: true, result };
  }
}