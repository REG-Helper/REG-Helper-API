export interface ICalcRemainCourse {
  specificCoursesCore: string[];
  specificCoursesRequired: string[];
  genEdFundamentals: string[];
  genEdLanguageCommunication: string[];
  genEdFacultySpecific: string[];
  electiveRequired: number;
  altStudy: number;
  majorElective: number;
  languageCommunicationElective: number;
  genEdElective: number;
  freeElective: number;
}

export interface INewCourse {
  id: string;
  nameEn: string;
  nameTh: string;
  descriptionEn: string;
  descriptionTh: string;
  credit: number;
  creditStr: string;
  group: string;
  subGroup: string;
  sections: NewSection[];
}

interface NewSection {
  name: string;
  day: string | null;
  room: string | null;
  limit: number | null;
  semester: string;
  condition: string;
  type: string;
  year: number;
  count: number;
  midtermExamDate: string | null;
  finalExamDate: string | null;
  startAt: string | null;
  endAt: string | null;
  teachers: NewTeacher[];
}

interface NewTeacher {
  firstnameEn: string | null;
  lastnameEn: string | null;
  firstnameTh: string | null;
  lastnameTh: string | null;
}
