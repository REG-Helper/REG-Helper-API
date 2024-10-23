import { Course } from '@prisma/client';

interface ICalcSyallbusCategory {
  remainingCredits: number;
  requiredCredits: number;
  courses: {
    fixedCourses: Set<string> | Course[];
    electiveCredits: number;
  };
}

export interface ICalcCourseSyllabus {
  gedEdFundamental: ICalcSyallbusCategory;
  genEdLanguageCommunication: ICalcSyallbusCategory;
  genEdFacultySpecific: ICalcSyallbusCategory;
  gendEdElective: ICalcSyallbusCategory;
  specificCore: ICalcSyallbusCategory;
  specificReq: ICalcSyallbusCategory;
  specificElectiveReq: ICalcSyallbusCategory;
  specificAltStudy: ICalcSyallbusCategory;
  specificMajorElective: ICalcSyallbusCategory;
  freeElective: ICalcSyallbusCategory;
}
