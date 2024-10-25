import { CourseGroup, CourseSubGroup } from '@prisma/client';

export const groupWithSubgroup: Map<CourseGroup, CourseSubGroup[]> = new Map([
  [CourseGroup.FREE_ELEC, [CourseSubGroup.FREE_ELEC]],
  [
    CourseGroup.GENED,
    [CourseSubGroup.FUND, CourseSubGroup.LANG, CourseSubGroup.FAC_SPEC, CourseSubGroup.GENED_ELEC],
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

const REQUIRED_CATEGOTIES_DATA = {
  specificCoursesCore: new Set([
    '01076140',
    '01076141',
    '01076032',
    '01076253',
    '01076101',
    '01076103',
    '01076104',
    '01076107',
    '01076108',
    '01076011',
    '01076012',
    '01006004',
    '01076016',
  ]),
  specificCoursesRequired: new Set([
    '01076263',
    '01076105',
    '01076106',
    '01076109',
    '01076110',
    '01076034',
    '01076119',
    '01076120',
    '01076121',
    '01076116',
    '01076117',
    '01076040',
    '01076041',
    '01076118',
    '01076112',
    '01076113',
    '01076114',
    '01076115',
    '01076050',
    '01076051',
  ]),
  genEdFundamentals: new Set(['90641001', '90641002', '90641003']),
  genEdLanguageCommunication: new Set(['90644007', '90644008']),
  genEdFacultySpecific: new Set(['90642118', '90642036']),
};

export const SYLLABUS_DATA = {
  gedEdFundamental: {
    remainingCredits: 6,
    requiredCredits: 6,
    courses: {
      fixedCourses: REQUIRED_CATEGOTIES_DATA.genEdFundamentals,
      electiveCredits: 0,
    },
  },
  genEdLanguageCommunication: {
    remainingCredits: 9,
    requiredCredits: 9,
    courses: {
      fixedCourses: REQUIRED_CATEGOTIES_DATA.genEdLanguageCommunication,
      electiveCredits: 3,
    },
  },
  genEdFacultySpecific: {
    remainingCredits: 3,
    requiredCredits: 3,
    courses: {
      fixedCourses: REQUIRED_CATEGOTIES_DATA.genEdFacultySpecific,
      electiveCredits: 0,
    },
  },
  gendEdElective: {
    remainingCredits: 12,
    requiredCredits: 12,
    courses: {
      fixedCourses: new Set<string>(),
      electiveCredits: 12,
    },
  },
  specificCore: {
    remainingCredits: 30,
    requiredCredits: 30,
    courses: {
      fixedCourses: REQUIRED_CATEGOTIES_DATA.specificCoursesCore,
      electiveCredits: 0,
    },
  },
  specificReq: {
    remainingCredits: 43,
    requiredCredits: 43,
    courses: {
      fixedCourses: REQUIRED_CATEGOTIES_DATA.specificCoursesRequired,
      electiveCredits: 0,
    },
  },
  specificElectiveReq: {
    remainingCredits: 9,
    requiredCredits: 9,
    courses: {
      fixedCourses: new Set<string>(),
      electiveCredits: 9,
    },
  },
  specificAltStudy: {
    remainingCredits: 6,
    requiredCredits: 6,
    courses: {
      fixedCourses: new Set<string>(),
      electiveCredits: 6,
    },
  },
  specificMajorElective: {
    remainingCredits: 12,
    requiredCredits: 12,
    courses: {
      fixedCourses: new Set<string>(),
      electiveCredits: 12,
    },
  },
  freeElective: {
    remainingCredits: 6,
    requiredCredits: 6,
    courses: {
      fixedCourses: new Set<string>(),
      electiveCredits: 6,
    },
  },
};
