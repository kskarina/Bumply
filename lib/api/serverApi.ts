import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';
// На сервері відносна адреса /api не працює, тому йдемо напряму на бекенд
import { api } from '@/app/api/api';
import type { User } from '@/types/user';
import type { WeekGreeting } from '@/types/week';

export async function checkSession(): Promise<AxiosResponse> {
  const cookieStore = await cookies();

  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const { data } = await api.get<User>('/users/current', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchWeekGreeting(): Promise<WeekGreeting> {
  const cookieStore = await cookies();

  const { data } = await api.get<WeekGreeting>('/weeks/greeting', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
