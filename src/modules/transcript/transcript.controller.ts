import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TranscriptService } from './transcript.service';

@Controller('transcript')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTranscript(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.transcriptService.uploadTranscript(file);
  }
}
