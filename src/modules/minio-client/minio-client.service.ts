import * as path from 'path';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

import * as Minio from 'minio';

import { EnvService } from '../env/env.service';

@Injectable()
export class MinioClientService {
  private readonly minioClient: Minio.Client;

  constructor(private readonly envService: EnvService) {
    this.minioClient = new Minio.Client({
      endPoint: this.envService.get('MINIO_ENDPOINT'),
      port: this.envService.get('MINIO_PORT'),
      useSSL: this.envService.get('MINIO_USE_SSL'),
      accessKey: this.envService.get('MINIO_ACCESS_KEY'),
      secretKey: this.envService.get('MINIO_SECRET_KEY'),
    });
  }

  private readonly bucketName = this.envService.get('MINIO_BUCKET');

  async upload(file: Express.Multer.File, directoryName?: string): Promise<string> {
    if (!file?.buffer || !file.originalname) {
      throw new BadRequestException();
    }

    const generatedFilename = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    const filename = directoryName
      ? `${directoryName}/${generatedFilename}${extension}`
      : `${generatedFilename}${extension}`;

    try {
      await this.minioClient.putObject(this.bucketName, filename, file.buffer, file.size);

      return filename;
    } catch (error) {
      console.error(error);

      throw new ServiceUnavailableException('Failed to upload file');
    }
  }

  async getFileUrl(filename: string): Promise<string> {
    const fileUrl = await this.minioClient.presignedUrl('GET', this.bucketName, filename);

    if (!fileUrl) {
      throw new NotFoundException('File not found');
    }

    return fileUrl;
  }

  async deleteFile(filename: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucketName, filename);
    } catch (error) {
      console.error(error);

      throw new ServiceUnavailableException('Failed to delete file');
    }
  }
}
