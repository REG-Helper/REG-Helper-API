import { Course } from '@prisma/client';

import { SYLLABUS_DATA } from '../constants';
import { ICalcCourseSyllabus } from '../interfaces';

export function checkRemainCourse(courses: Course[]): ICalcCourseSyllabus {
  const syllabus = structuredClone(SYLLABUS_DATA);

  courses.forEach(course => {
    if (course.group == 'SPEC') {
      processSpecificCourses(course, syllabus);
    } else if (course.group == 'GENED') {
      processGenEdCourses(course, syllabus);
    } else {
      syllabus.freeElective.remainingCredits -= course.credit;
      syllabus.freeElective.courses.electiveCredits -= course.credit;
    }
  });

  for (const category in syllabus) {
    const categoryCredits = syllabus[category].courses.electiveCredits;

    if (categoryCredits < 0) {
      if (category.includes('genEd') && syllabus.gendEdElective.courses.electiveCredits > 0) {
        syllabus.gendEdElective.courses.electiveCredits += categoryCredits;
        syllabus.gendEdElective.remainingCredits += categoryCredits;
      } else {
        syllabus.freeElective.remainingCredits += categoryCredits;
        syllabus.freeElective.courses.electiveCredits += categoryCredits;
      }

      syllabus[category].course.electiveCredits = 0;
    }
  }

  return syllabus;
}

function processSpecificCourses(course: Course, syllabus: ICalcCourseSyllabus): void {
  if (
    course.subGroup == 'CORE' &&
    syllabus.specificCore.courses.fixedCourses instanceof Set &&
    syllabus.specificCore.courses.fixedCourses.has(course.id)
  ) {
    syllabus.specificCore.courses.fixedCourses.delete(course.id);
    syllabus.specificCore.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'REQUIRED' &&
    syllabus.specificReq.courses.fixedCourses instanceof Set &&
    syllabus.specificReq.courses.fixedCourses.has(course.id)
  ) {
    syllabus.specificReq.courses.fixedCourses.delete(course.id);
    syllabus.specificReq.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'ELEC_REQ' &&
    syllabus.specificElectiveReq.courses.electiveCredits > 0
  ) {
    syllabus.specificElectiveReq.courses.electiveCredits -= course.credit;
    syllabus.specificElectiveReq.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'ALT_STUDY' &&
    syllabus.specificAltStudy.courses.electiveCredits > 0
  ) {
    syllabus.specificAltStudy.courses.electiveCredits -= course.credit;
    syllabus.specificAltStudy.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'MAJOR_ELEC' &&
    syllabus.specificMajorElective.courses.electiveCredits > 0
  ) {
    syllabus.specificMajorElective.courses.electiveCredits -= course.credit;
    syllabus.specificMajorElective.remainingCredits -= course.credit;
  } else {
    syllabus.freeElective.remainingCredits -= course.credit;
    syllabus.freeElective.courses.electiveCredits -= course.credit;
  }
}

function processGenEdCourses(course: Course, syllabus: ICalcCourseSyllabus): void {
  if (
    course.subGroup == 'FUND' &&
    syllabus.gedEdFundamental.courses.fixedCourses instanceof Set &&
    syllabus.gedEdFundamental.courses.fixedCourses.has(course.id)
  ) {
    syllabus.gedEdFundamental.courses.fixedCourses.delete(course.id);
    syllabus.gedEdFundamental.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'LANG' &&
    syllabus.genEdLanguageCommunication.courses.fixedCourses instanceof Set &&
    syllabus.genEdLanguageCommunication.courses.fixedCourses.has(course.id)
  ) {
    syllabus.genEdLanguageCommunication.courses.fixedCourses.delete(course.id);
    syllabus.genEdLanguageCommunication.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'FAC_SPEC' &&
    syllabus.genEdFacultySpecific.courses.fixedCourses instanceof Set &&
    syllabus.genEdFacultySpecific.courses.fixedCourses.has(course.id)
  ) {
    syllabus.genEdFacultySpecific.courses.fixedCourses.delete(course.id);
    syllabus.genEdFacultySpecific.remainingCredits -= course.credit;
  } else if (
    course.subGroup == 'LANG' &&
    syllabus.genEdLanguageCommunication.courses.electiveCredits > 0
  ) {
    syllabus.genEdLanguageCommunication.courses.electiveCredits -= course.credit;
    syllabus.genEdLanguageCommunication.remainingCredits -= course.credit;
  } else if (syllabus.gendEdElective.courses.electiveCredits > 0) {
    syllabus.gendEdElective.courses.electiveCredits -= course.credit;
    syllabus.gendEdElective.remainingCredits -= course.credit;
  } else {
    syllabus.freeElective.remainingCredits -= course.credit;
    syllabus.freeElective.courses.electiveCredits -= course.credit;
  }
}
