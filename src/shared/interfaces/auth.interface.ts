import { User } from '@prisma/client';

export interface IFormatAuthResponseParams {
  user: User;
  accessToken: string;
}
