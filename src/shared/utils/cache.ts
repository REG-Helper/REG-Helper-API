import { CACHE_KEY } from '../constants';

export const getCacheKey = (key: keyof typeof CACHE_KEY, value: string): string => {
  return `${CACHE_KEY[key]}:${value}`;
};
