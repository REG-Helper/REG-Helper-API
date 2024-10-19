import { Injectable } from '@nestjs/common';

import { DeleteApiResponse, UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async upload(
    file: Express.Multer.File,
    directoryName: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    const resourceType = this.getResourceType(file.mimetype);

    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        { folder: directoryName, resource_type: resourceType },
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

  async deleteFileByUrl(url: string): Promise<DeleteApiResponse> {
    const publicId = this.getPulicIdFromUrl(url);

    return this.deleteFile(publicId);
  }

  private async deleteFile(publicId: string): Promise<DeleteApiResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  private getPulicIdFromUrl(url: string): string {
    return url.split('/').slice(-2).join('/').split('.')[0];
  }

  private getResourceType(mimetype: string): 'image' | 'raw' {
    return mimetype.startsWith('image/') ? 'image' : 'raw';
  }
}
