import { z } from 'zod';

import { Environment } from '@/shared/enums';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  ACCESS_SECRET: z.string().min(1),
  ACCESS_EXPIRES_IN: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  MINIO_PORT: z.coerce.number(),
  MINIO_ENDPOINT: z.string().min(1),
  MINIO_BUCKET: z.string().min(1),
  MINIO_ACCESS_KEY: z.string().min(1),
  MINIO_SECRET_KEY: z.string().min(1),
  MINIO_USE_SSL: z.coerce.boolean(),
});

export type Env = z.infer<typeof envSchema>;
