import { Prisma } from '@prisma/client';

export type IUserWithTranscript = Prisma.UserGetPayload<{
  include: {
    transcript: true;
  };
}>;
