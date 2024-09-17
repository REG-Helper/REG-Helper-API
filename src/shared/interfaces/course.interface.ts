import { Prisma } from '@prisma/client';

export type CourseWithSections = Prisma.CourseGetPayload<{
  include: {
    sections: true;
  };
}>;
