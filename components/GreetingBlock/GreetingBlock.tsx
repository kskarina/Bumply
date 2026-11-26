'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './GreetingBlock.module.css';

// TODO: Привітання користувача (ім'я з бекенду). Деталі — у ТЗ та макеті
export default function GreetingBlock() {
  const user = useAuthStore(s => s.user);
  return <h2 className={css.greeting}>Доброго ранку, {user?.name}!</h2>;
}
