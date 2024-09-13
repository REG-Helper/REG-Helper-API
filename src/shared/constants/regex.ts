/* eslint-disable sonarjs/slow-regex */
export const KMITL_EMAIL_REGEX = /^(\d{8})@kmitl\.ac\.th$/;

export const KMITL_STUDENT_ID_REGEX = /^\d{8}$/;

export const USER_INFO_REGEX = {
  name: /Name\s+(.+)\n/,
  dateOfBirth: /Date of Birth\s+(.+)Student/,
  studentId: /Student ID\s+(\d+)/,
  degree: /Degree\s+(.+)\n/,
  major: /Major\s+(.+)\n/,
};

export const COURSE_REGEX = /(\d{8})(.*?\d?)(\d)([ABCDEFWS][+]?)?/g;
