import { COUNTS_DATA, REQIRED_CATEGOTIES_DATA } from '../constants';
import { ICalcRemainCourse } from '../interfaces';

export function checkRemainCourse(
  courseData: {
    id: string;
    group: string;
    subGroup: string;
    credit: number;
  }[],
): ICalcRemainCourse {
  const requiredCategories = structuredClone(REQIRED_CATEGOTIES_DATA);
  const counts = structuredClone(COUNTS_DATA);

  courseData.forEach(courseId => {
    if (courseId.group == 'SPEC') {
      processSpecificCourses(courseId, requiredCategories, counts);
    } else if (courseId.group == 'GENED') {
      processGenEdCourses(courseId, requiredCategories, counts);
    } else {
      counts.freeElective += courseId.credit;
    }
  });

  return calculateRemainingCourses(requiredCategories, counts);
}

function processSpecificCourses(
  courseId: {
    id: string;
    group: string;
    subGroup: string;
    credit: number;
  },
  requiredCategories: {
    specificCoursesCore: Set<string>;
    specificCoursesRequired: Set<string>;
    genEdFundamentals: Set<string>;
    genEdLanguageCommunication: Set<string>;
    genEdFacultySpecific: Set<string>;
  },
  counts: {
    electiveRequiredCount: number;
    altStudyCount: number;
    majorElectiveCount: number;
    languageCommunicationElectiveCount: number;
    genEdElective: number;
    freeElective: number;
  },
) {
  if (courseId.subGroup == 'CORE' && requiredCategories.specificCoursesCore.has(courseId.id)) {
    requiredCategories.specificCoursesCore.delete(courseId.id);
  } else if (
    courseId.subGroup == 'REQUIRED' &&
    requiredCategories.specificCoursesRequired.has(courseId.id)
  ) {
    requiredCategories.specificCoursesRequired.delete(courseId.id);
  } else if (courseId.subGroup == 'ELEC_REQ' && counts.electiveRequiredCount < 9) {
    counts.electiveRequiredCount += courseId.credit;
  } else if (courseId.subGroup == 'ALT_STUDY' && counts.altStudyCount < 6) {
    counts.altStudyCount += courseId.credit;
  } else if (courseId.subGroup == 'MAJOR_ELEC' && counts.majorElectiveCount < 12) {
    counts.majorElectiveCount += courseId.credit;
  } else {
    counts.freeElective += courseId.credit;
  }
}

function processGenEdCourses(
  courseId: {
    id: string;
    group: string;
    subGroup: string;
    credit: number;
  },
  requiredCategories: {
    specificCoursesCore: Set<string>;
    specificCoursesRequired: Set<string>;
    genEdFundamentals: Set<string>;
    genEdLanguageCommunication: Set<string>;
    genEdFacultySpecific: Set<string>;
  },
  counts: {
    electiveRequiredCount: number;
    altStudyCount: number;
    majorElectiveCount: number;
    languageCommunicationElectiveCount: number;
    genEdElective: number;
    freeElective: number;
  },
) {
  if (courseId.subGroup == 'FUND' && requiredCategories.genEdFundamentals.has(courseId.id)) {
    requiredCategories.genEdFundamentals.delete(courseId.id);
  } else if (
    courseId.subGroup == 'LANG' &&
    requiredCategories.genEdLanguageCommunication.has(courseId.id)
  ) {
    requiredCategories.genEdLanguageCommunication.delete(courseId.id);
  } else if (
    courseId.subGroup == 'FAC_SPEC' &&
    requiredCategories.genEdFacultySpecific.has(courseId.id)
  ) {
    requiredCategories.genEdFacultySpecific.delete(courseId.id);
  } else if (courseId.subGroup == 'LANG' && counts.languageCommunicationElectiveCount < 3) {
    counts.languageCommunicationElectiveCount += courseId.credit;
  } else if (counts.genEdElective < 12) {
    counts.genEdElective += courseId.credit;
  } else {
    console.log(courseId.id);
    counts.freeElective += courseId.credit;
  }
}

function calculateRemainingCourses(
  requiredCategories: {
    specificCoursesCore: Set<string>;
    specificCoursesRequired: Set<string>;
    genEdFundamentals: Set<string>;
    genEdLanguageCommunication: Set<string>;
    genEdFacultySpecific: Set<string>;
  },
  counts: {
    electiveRequiredCount: number;
    altStudyCount: number;
    majorElectiveCount: number;
    languageCommunicationElectiveCount: number;
    genEdElective: number;
    freeElective: number;
  },
): ICalcRemainCourse {
  return {
    specificCoursesCore: Array.from(requiredCategories.specificCoursesCore),
    specificCoursesRequired: Array.from(requiredCategories.specificCoursesRequired),
    genEdFundamentals: Array.from(requiredCategories.genEdFundamentals),
    genEdLanguageCommunication: Array.from(requiredCategories.genEdLanguageCommunication),
    genEdFacultySpecific: Array.from(requiredCategories.genEdFacultySpecific),
    electiveRequired: 9 - counts.electiveRequiredCount,
    altStudy: 6 - counts.altStudyCount,
    majorElective: 12 - counts.majorElectiveCount,
    languageCommunicationElective: 3 - counts.languageCommunicationElectiveCount,
    genEdElective: 12 - counts.genEdElective,
    freeElective: 6 - counts.freeElective,
  };
}
