import { KMITL_EMAIL_REGEX } from '../constants';

export const extractStudentIdFromEmail = (email: string): string | undefined => {
  const match = RegExp(KMITL_EMAIL_REGEX).exec(email);

  return match?.[0];
};
