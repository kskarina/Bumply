import axios from 'axios';
import type {
  DiaryNote,
  DiaryNotePayload,
  DiaryNotesResponse,
  EmotionsResponse,
  ListParams,
  Task,
  TasksResponse,
  User,
  WeekBaby,
  WeekGreeting,
  WeekMom,
} from '@/types';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// ---------- Auth ----------

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export type LoginData = Omit<RegisterData, 'name'>;

export const register = async (data: RegisterData) => {
  await api.post('/auth/register', data);
};

export const login = async (data: LoginData) => {
  const res = await api.post<{ user: User }>('/auth/login', data);
  return res.data.user;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const refreshSession = async () => {
  await api.get('/auth/session');
};

// ---------- Users ----------

export const getMe = async () => {
  const res = await api.get<User>('/users/current');
  return res.data;
};

export type UpdateUserData = Partial<Pick<User, 'name' | 'email' | 'dueDate' | 'babyGender'>>;

export const updateMe = async (data: UpdateUserData) => {
  const res = await api.patch<User>('/users/current', data);
  return res.data;
};

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const res = await api.patch<User>('/users/current/avatars', formData);
  return res.data;
};

// ---------- Tasks ----------

export const fetchTasks = async (params: ListParams = {}) => {
  const res = await api.get<TasksResponse>('/tasks', { params });
  return res.data;
};

export const createTask = async (data: { name: string; date: string }) => {
  const res = await api.post<Task>('/tasks', data);
  return res.data;
};

export const updateTaskStatus = async (taskId: string, isDone: boolean) => {
  const res = await api.patch<{ isDone: boolean }>(`/tasks/status/${taskId}`, { isDone });
  return res.data;
};

// ---------- Emotions ----------

export const fetchEmotions = async (params: Omit<ListParams, 'sortOrder'> = {}) => {
  const res = await api.get<EmotionsResponse>('/emotions', { params });
  return res.data;
};

// ---------- Diary ----------

export const fetchDiaryNotes = async (params: ListParams = {}) => {
  const res = await api.get<DiaryNotesResponse>('/diary', { params });
  return res.data;
};

export const createDiaryNote = async (data: DiaryNotePayload) => {
  const res = await api.post<DiaryNote>('/diary', data);
  return res.data;
};

export const updateDiaryNote = async (noteId: string, data: Partial<DiaryNotePayload>) => {
  const res = await api.patch<DiaryNote>(`/diary/${noteId}`, data);
  return res.data;
};

export const deleteDiaryNote = async (noteId: string) => {
  const res = await api.delete<{ _id: string }>(`/diary/${noteId}`);
  return res.data;
};

// ---------- Weeks ----------

export const fetchWeekGreeting = async (isAuthenticated: boolean) => {
  const url = isAuthenticated ? '/weeks/greeting' : '/weeks/greeting/public';
  const res = await api.get<WeekGreeting>(url);
  return res.data;
};

export const fetchWeekBaby = async (weekNumber: number) => {
  const res = await api.get<WeekBaby>(`/weeks/${weekNumber}/baby`);
  return res.data;
};

export const fetchWeekMom = async (weekNumber: number) => {
  const res = await api.get<WeekMom>(`/weeks/${weekNumber}/mom`);
  return res.data;
};
