import type { Paginated } from './common';

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface TasksResponse extends Paginated {
  tasks: Task[];
}

export interface TaskData {
  name: string;
  date: string;
}
