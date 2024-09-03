import { z } from 'zod';

import { Environment } from '@/shared/enums';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  NODE_ENV: z.nativeEnum(Environment).default(Environment.DEVELOPMENT),
  ACCESS_SECRET: z.string(),
  ACCESS_EXPIRES_IN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
