// значення з документації API
export type BabyGender = 'boy' | 'girl' | 'unknown';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  dueDate: string | null;
  babyGender: BabyGender | null;
  theme?: string;
}

export type UpdateUserData = Partial<
  Pick<User, 'name' | 'email' | 'dueDate' | 'babyGender'>
>;
