import { api } from './api';
import type { ListParams } from '@/types/common';
import type { UpdateUserData, User } from '@/types/user';
import type { Task, TaskData, TasksResponse } from '@/types/task';
import type { EmotionsResponse } from '@/types/emotion';
import type {
  DiaryNote,
  DiaryNoteData,
  DiaryNotesResponse,
} from '@/types/diary';
import type { WeekBaby, WeekGreeting, WeekMom } from '@/types/week';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export type LoginRequest = Omit<RegisterRequest, 'name'>;

interface CheckSessionResponse {
  success: boolean;
}

// ---------- Auth ----------

export async function register(data: RegisterRequest): Promise<boolean> {
  const res = await api.post<{ success: boolean }>('/auth/register', data);
  return res.data.success;
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await api.post<{ user: User }>('/auth/login', data);
  return res.data.user;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const res = await api.get<CheckSessionResponse>('/auth/session');
  return res.data.success;
}

// ---------- Users ----------

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/current');
  return data;
}

export async function updateMe(userData: UpdateUserData): Promise<User> {
  const { data } = await api.patch<User>('/users/current', userData);
  return data;
}

export async function updateAvatar(file: File): Promise<User> {
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await api.patch<User>('/users/current/avatars', formData);
  return data;
}

// ---------- Tasks ----------

export async function fetchTasks(
  params: ListParams = {}
): Promise<TasksResponse> {
  const { data } = await api.get<TasksResponse>('/tasks', { params });
  return data;
}

export async function createTask(taskData: TaskData): Promise<Task> {
  const { data } = await api.post<Task>('/tasks', taskData);
  return data;
}

export async function updateTaskStatus(
  taskId: string,
  isDone: boolean
): Promise<{ isDone: boolean }> {
  const { data } = await api.patch<{ isDone: boolean }>(
    `/tasks/status/${taskId}`,
    { isDone }
  );
  return data;
}

// ---------- Emotions ----------

export async function fetchEmotions(
  params: Omit<ListParams, 'sortOrder'> = {}
): Promise<EmotionsResponse> {
  const { data } = await api.get<EmotionsResponse>('/emotions', { params });
  return data;
}

// ---------- Diary ----------

export async function fetchDiaryNotes(
  params: ListParams = {}
): Promise<DiaryNotesResponse> {
  const { data } = await api.get<DiaryNotesResponse>('/diary', { params });
  return data;
}

export async function createDiaryNote(
  noteData: DiaryNoteData
): Promise<DiaryNote> {
  const { data } = await api.post<DiaryNote>('/diary', noteData);
  return data;
}

export async function updateDiaryNote(
  noteId: string,
  noteData: Partial<DiaryNoteData>
): Promise<DiaryNote> {
  const { data } = await api.patch<DiaryNote>(`/diary/${noteId}`, noteData);
  return data;
}

export async function deleteDiaryNote(
  noteId: string
): Promise<{ _id: string }> {
  const { data } = await api.delete<{ _id: string }>(`/diary/${noteId}`);
  return data;
}

// ---------- Weeks ----------

export async function fetchWeekGreeting(
  isAuthenticated: boolean
): Promise<WeekGreeting> {
  const url = isAuthenticated ? '/weeks/greeting' : '/weeks/greeting/public';
  const { data } = await api.get<WeekGreeting>(url);
  return data;
}

export async function fetchWeekBaby(weekNumber: number): Promise<WeekBaby> {
  const { data } = await api.get<WeekBaby>(`/weeks/${weekNumber}/baby`);
  return data;
}

export async function fetchWeekMom(weekNumber: number): Promise<WeekMom> {
  const { data } = await api.get<WeekMom>(`/weeks/${weekNumber}/mom`);
  return data;
}
