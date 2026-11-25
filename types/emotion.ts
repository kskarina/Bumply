import type { Paginated } from './common';

export interface Emotion {
  _id: string;
  title: string;
}

// у документації API поле названо name, але бекенд насправді віддає title
export interface EmotionsResponse extends Paginated {
  emotions: Emotion[];
  limit: number;
}
