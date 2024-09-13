import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { UploadTranscriptResponseDto } from './dto';
import { TranscriptService } from './transcript.service';

import { CurrentUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common/guards';

@Controller('transcript')
@ApiTags('transcript')
@ApiBearerAuth()
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post('upload')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    type: [UploadTranscriptResponseDto],
  })
  async uploadTranscript(
    @CurrentUser() user: User,
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
    return this.transcriptService.uploadTranscript(user, file);
  }
}
