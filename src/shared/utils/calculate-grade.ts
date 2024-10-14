import { Course } from '@prisma/client';

import { ELECTIVE_COURSE_COUNT, REQUIRED_CATEGOTIES_DATA } from '../constants';
import { ICalcRemainCourse, IElectiveCounts, IRequiedCategories } from '../interfaces';

export function checkRemainCourse(courses: Course[]): ICalcRemainCourse {
  const requiredCategories = structuredClone(REQUIRED_CATEGOTIES_DATA);
  const counts = structuredClone(ELECTIVE_COURSE_COUNT);

  console.log(courses);

  courses.forEach(course => {
    if (course.group == 'SPEC') {
      processSpecificCourses(course, requiredCategories, counts);
    } else if (course.group == 'GENED') {
      processGenEdCourses(course, requiredCategories, counts);
    } else {
      counts.freeElective += course.credit;
    }
  });

  console.log(requiredCategories);

  return calculateRemainingCourses(requiredCategories, counts);
}

function processSpecificCourses(
  course: Course,
  requiredCategories: IRequiedCategories,
  counts: IElectiveCounts,
): void {
  if (course.subGroup == 'CORE' && requiredCategories.specificCoursesCore.has(course.id)) {
    requiredCategories.specificCoursesCore.delete(course.id);
  } else if (
    course.subGroup == 'REQUIRED' &&
    requiredCategories.specificCoursesRequired.has(course.id)
  ) {
    requiredCategories.specificCoursesRequired.delete(course.id);
  } else if (course.subGroup == 'ELEC_REQ' && counts.electiveRequiredCount < 9) {
    counts.electiveRequiredCount += course.credit;
  } else if (course.subGroup == 'ALT_STUDY' && counts.altStudyCount < 6) {
    counts.altStudyCount += course.credit;
  } else if (course.subGroup == 'MAJOR_ELEC' && counts.majorElectiveCount < 12) {
    counts.majorElectiveCount += course.credit;
  } else {
    counts.freeElective += course.credit;
  }
}

function processGenEdCourses(
  course: Course,
  requiredCategories: IRequiedCategories,
  counts: IElectiveCounts,
): void {
  if (course.subGroup == 'FUND' && requiredCategories.genEdFundamentals.has(course.id)) {
    requiredCategories.genEdFundamentals.delete(course.id);
  } else if (
    course.subGroup == 'LANG' &&
    requiredCategories.genEdLanguageCommunication.has(course.id)
  ) {
    requiredCategories.genEdLanguageCommunication.delete(course.id);
  } else if (
    course.subGroup == 'FAC_SPEC' &&
    requiredCategories.genEdFacultySpecific.has(course.id)
  ) {
    requiredCategories.genEdFacultySpecific.delete(course.id);
  } else if (course.subGroup == 'LANG' && counts.languageCommunicationElectiveCount < 3) {
    counts.languageCommunicationElectiveCount += course.credit;
  } else if (counts.genEdElective < 12) {
    counts.genEdElective += course.credit;
  } else {
    counts.freeElective += course.credit;
  }
}

function calculateRemainingCourses(
  requiredCategories: IRequiedCategories,
  counts: IElectiveCounts,
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
