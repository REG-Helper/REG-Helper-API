export interface ITranscriptUser {
  name: string;
  dateOfBirth: string;
  studentId: string;
  degree: string;
  major: string;
}

export interface ITranscriptCourse {
  id: number;
  name?: string;
  credit: number;
  grade: string;
}

export interface ITranscriptData {
  user: ITranscriptUser;
  courses: ITranscriptCourse[];
}
