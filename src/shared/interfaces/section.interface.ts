import { Prisma } from '@prisma/client';

export type SectionWithTeachers = Prisma.SectionGetPayload<{
  include: {
    sectionTeachers: {
      include: {
        teacher: true;
      };
    };
  };
}>;
