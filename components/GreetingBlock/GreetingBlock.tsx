'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './GreetingBlock.module.css';

const getGreeting = (hour: number): string => {
  if (hour >= 6 && hour < 12) return 'Доброго ранку';
  if (hour >= 12 && hour < 18) return 'Доброго дня';
  if (hour >= 18) return 'Доброго вечора';
  return 'Доброї ночі';
};

export default function GreetingBlock() {
  const user = useAuthStore(state => state.user);
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);

  const greeting = getGreeting(new Date().getHours());
  const text = user ? `${greeting}, ${user.name}!` : `${greeting}!`;

  return <h1 className={css.greeting}>{isAuthChecked && text}</h1>;
}
