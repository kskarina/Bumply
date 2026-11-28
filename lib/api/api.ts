import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Запити з браузера йдуть на наші route handlers (app/api),
// а ті вже звертаються до бекенду. Так cookie з токенами живуть на нашому домені.
const baseURL = (process.env.NEXT_PUBLIC_API_URL ?? '') + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

type RetryRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// Одне оновлення сесії на всі запити, що впали одночасно
let refreshPromise: Promise<boolean> | null = null;

const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = api
      .get<{ success: boolean }>('/auth/session')
      .then(res => res.data.success)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Якщо access-токен закінчився, поки сторінка відкрита,
// оновлюємо сесію через refresh-токен і повторюємо запит один раз
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const config = error.config as RetryRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retry ||
      config.url?.startsWith('/auth/')
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    const isRefreshed = await refreshSession();
    if (!isRefreshed) {
      return Promise.reject(error);
    }

    return api(config);
  }
);
