'use client';

import Image from 'next/image';

import { useAuthStore } from '@/lib/store/authStore';
import Loader from '@/components/Loader/Loader';

import css from './ProfileAvatar.module.css';

export default function ProfileAvatar() {
  const user = useAuthStore(state => state.user);
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);

  if (!isAuthChecked) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <section className={css.profileAvatar}>
      <Image
        src={user.avatarUrl || '/images/avatar-placeholder.webp'}
        alt={user.name || 'Аватар користувача'}
        width={132}
        height={132}
        className={css.avatar}
      />

      <div className={css.info}>
        <div className={css.userText}>
          <h1 className={css.name}>{user.name}</h1>
          <p className={css.email}>{user.email}</p>
        </div>
      </div>
    </section>
  );
}
