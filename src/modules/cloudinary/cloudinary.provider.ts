import { Provider } from '@nestjs/common';

import { ConfigOptions, v2 } from 'cloudinary';

import { EnvService } from '../env/env.service';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: async (envService: EnvService): Promise<ConfigOptions> => {
    return v2.config({
      cloud_name: envService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: envService.get('CLOUDINARY_API_KEY'),
      api_secret: envService.get('CLOUDINARY_API_SECRET'),
    });
  },
  inject: [EnvService],
};
