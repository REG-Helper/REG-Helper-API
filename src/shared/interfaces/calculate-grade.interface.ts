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

export interface IRequiedCategories {
  specificCoursesCore: Set<string>;
  specificCoursesRequired: Set<string>;
  genEdFundamentals: Set<string>;
  genEdLanguageCommunication: Set<string>;
  genEdFacultySpecific: Set<string>;
}

export interface IElectiveCounts {
  electiveRequiredCount: number;
  altStudyCount: number;
  majorElectiveCount: number;
  languageCommunicationElectiveCount: number;
  genEdElective: number;
  freeElective: number;
}
