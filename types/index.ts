export type BabyGender = 'boy' | 'girl' | null;

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string | null;
  babyGender: BabyGender | string;
  theme?: string;
}

export interface Paginated {
  totalCount: number;
  totalPages: number;
  page: number;
}

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface TasksResponse extends Paginated {
  tasks: Task[];
}

export interface Emotion {
  _id: string;
  title: string;
}

export interface EmotionsResponse extends Paginated {
  emotions: { _id: string; name: string }[];
  limit: number;
}

export interface DiaryNote {
  _id: string;
  title: string;
  description: string;
  date: string;
  emotions: Emotion[];
}

// бекенд віддає записи щоденника саме в полі "tasks"
export interface DiaryNotesResponse extends Paginated {
  tasks: DiaryNote[];
}

export interface DiaryNotePayload {
  title: string;
  description: string;
  emotions: string[];
}

export interface BabyToday {
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  image: string;
}

export interface WeekGreeting {
  curWeekToPregnant: number;
  daysBeforePregnant: number;
  babyToday: BabyToday;
  momHint: string;
}

export interface WeekBaby {
  analogy: string;
  image: string;
  description: string[];
  interestingFact: string;
}

export interface WeekMom {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: { category: string; tip: string }[];
}

export type SortOrder = 'asc' | 'desc';

export interface ListParams {
  page?: number;
  limit?: number;
  sortOrder?: SortOrder;
}
