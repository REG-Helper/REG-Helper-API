import { Prisma } from '@prisma/client';

export type SectionWithTeachersAndTimes = Prisma.SectionGetPayload<{
  include: {
    sectionTeachers: {
      include: {
        teacher: true;
      };
    };
    sectionTimes: true;
  };
}>;
