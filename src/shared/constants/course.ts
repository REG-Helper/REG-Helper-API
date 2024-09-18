import { CourseGroup, CourseSubGroup } from '@prisma/client';

export const groupWithSubgroup: Map<CourseGroup, CourseSubGroup[]> = new Map([
  [CourseGroup.FREE_ELEC, [CourseSubGroup.FREE_ELEC]],
  [
    CourseGroup.GENED,
    [
      CourseSubGroup.FUND,
      CourseSubGroup.LANG,
      CourseSubGroup.MAJOR_ELEC,
      CourseSubGroup.GENED_ELEC,
    ],
  ],
  [
    CourseGroup.SPEC,
    [
      CourseSubGroup.CORE,
      CourseSubGroup.REQUIRED,
      CourseSubGroup.ALT_STUDY,
      CourseSubGroup.MAJOR_ELEC,
      CourseSubGroup.ELEC_REQ,
    ],
  ],
]);
