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

export type UpdateUserData = Partial<
  Pick<User, 'name' | 'email' | 'dueDate' | 'babyGender'>
>;
