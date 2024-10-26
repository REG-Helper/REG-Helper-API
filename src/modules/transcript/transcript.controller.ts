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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { UploadTranscriptDto, UploadTranscriptResponseDto } from './dto';
import { TranscriptService } from './transcript.service';

import { CurrentUser } from '@/common/decorators';
import { AccessTokenGuard } from '@/common/guards';
import { ITranscriptUser, IUserCourseData } from '@/shared/interfaces';

@Controller('transcript')
@ApiTags('transcript')
@ApiBearerAuth()
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadTranscriptDto,
  })
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
  ): Promise<UploadTranscriptResponseDto> {
    return this.transcriptService.upload(user, file);
  }

  @Post('verify')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadTranscriptDto,
  })
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    type: [UploadTranscriptResponseDto],
  })
  async verifyTranscriptData(
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
  ): Promise<{
    extractUser: ITranscriptUser;
    userCourses: IUserCourseData[];
    missingCourses: string[];
  }> {
    return this.transcriptService.verifyTranscriptData(user, file);
  }
}
