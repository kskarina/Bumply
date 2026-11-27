import type { Paginated } from './common';
import type { Emotion } from './emotion';

export interface DiaryNote {
  _id: string;
  title: string;
  description: string;
  date: string;
  emotions: Emotion[];
}

// бекенд віддає записи щоденника саме в полі "tasks"
export interface DiaryNotesResponse extends Paginated {
  diaryNotes: DiaryNote[];
}

export interface DiaryNoteData {
  title: string;
  description: string;
  emotions: string[];
}
