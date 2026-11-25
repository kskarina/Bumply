'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
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
      <div className={css.profile}>
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
      {/* через портал: у мобільному меню сайдбар має transform, і fixed-лоадер інакше закрив би тільки меню */}
      {isPending && createPortal(<Loader fullScreen />, document.body)}
    </div>
  );
}
