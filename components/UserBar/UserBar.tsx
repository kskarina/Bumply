'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { useLogout } from '@/hooks/useLogout';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import Loader from '@/components/Loader/Loader';
import Icon from '@/components/Icon/Icon';
import css from './UserBar.module.css';

export default function UserBar() {
  const user = useAuthStore((s) => s.user);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();

  if (!user) return null;

  return (
    <div className={css.userBar}>
      <Image
        src={user.avatarUrl || '/images/avatar-placeholder.webp'}
        alt={user.name}
        width={40}
        height={40}
        className={css.avatar}
      />
      <div className={css.info}>
        <p className={css.name}>{user.name}</p>
        <p className={css.email}>{user.email}</p>
      </div>
      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => setIsConfirmOpen(true)}
        aria-label="Вийти"
      >
        <Icon name="logout" />
      </button>

      {isConfirmOpen && (
        <ConfirmationModal
          title="Ви впевнені, що хочете вийти?"
          confirmButtonText="Так"
          cancelButtonText="Ні"
          onConfirm={() => logout(undefined, { onSettled: () => setIsConfirmOpen(false) })}
          onCancel={() => setIsConfirmOpen(false)}
          isLoading={isPending}
        />
      )}
      {isPending && <Loader fullScreen />}
    </div>
  );
}
