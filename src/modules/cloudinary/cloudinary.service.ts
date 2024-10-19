import { Injectable } from '@nestjs/common';

import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadPdf(
    file: Express.Multer.File,
    directoryName: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        { folder: directoryName, resource_type: 'raw', format: 'pdf' },
        (error, result) => {
          if (error || !result) {
            return reject(error ?? new Error('Upload failed'));
          }

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deletePdfFileByUrl(url: string): Promise<DeleteApiResponse> {
    const publicId = this.getPublicIdFromUrl(url);

    return this.deleteFile(publicId);
  }

  private async deleteFile(publicId: string): Promise<DeleteApiResponse> {
    try {
      const result = await v2.api.delete_resources([publicId], {
        type: 'upload',
        resource_type: 'raw',
      });

      return result;
    } catch (err) {
      throw new Error('Failed to delete pdf file', err);
    }
  }

  private getPublicIdFromUrl(url: string): string {
    return url.split('/').slice(-2).join('/');
  }
}
