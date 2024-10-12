import { COURSE_REGEX, USER_INFO_REGEX } from '../constants';
import { ITranscriptData, ITranscriptUser } from '../interfaces';

export const parseDataFromTranscript = (transcriptText: string): ITranscriptData => {
  const [userSection, , courseSection] = transcriptText.split('CREDITGRADE');

  if (!userSection || !courseSection) {
    throw new Error('Invalid transcript format');
  }

  const name = extractUserInfo(userSection, USER_INFO_REGEX.name).split(' ');
  const dateOfBirth = extractUserInfo(userSection, USER_INFO_REGEX.dateOfBirth);
  const user: ITranscriptUser = {
    firstname: name[1],
    lastname: name[3],
    dateOfBirth: new Date(dateOfBirth),
    studentId: extractUserInfo(userSection, USER_INFO_REGEX.studentId),
    degree: extractUserInfo(userSection, USER_INFO_REGEX.degree),
    major: extractUserInfo(userSection, USER_INFO_REGEX.major),
  };

  const courseMatches = courseSection.matchAll(COURSE_REGEX);
  const courses = Array.from(courseMatches).map(match => {
    const [, id, , creditStr, grade = ''] = match;

    return {
      id: id.trim(),
      credit: parseInt(creditStr, 10),
      grade: grade.trim(),
    };
  });

  return { user, courses };
};

const extractUserInfo = (text: string, regex: RegExp): string => {
  const match = regex.exec(text);

  return match ? match[1].trim() : '';
};
