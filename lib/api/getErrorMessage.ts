import { isAxiosError } from 'axios';

export const getErrorMessage = (error: unknown, fallback = 'Щось пішло не так') => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};
