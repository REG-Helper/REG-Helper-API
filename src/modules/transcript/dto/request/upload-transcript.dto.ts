import { ApiProperty } from '@nestjs/swagger';

export class UploadTranscriptDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
