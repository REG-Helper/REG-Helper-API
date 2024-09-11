export interface ITranscriptUser {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  studentId: string;
  degree: string;
  major: string;
}

export interface ITranscriptCourse {
  id: string;
  credit: number;
  grade: string;
}

export interface ITranscriptData {
  user: ITranscriptUser;
  courses: ITranscriptCourse[];
}
