'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import toast from 'react-hot-toast';

import { useAuthStore } from '@/lib/store/authStore';
import { updateAvatar } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import Loader from '@/components/Loader/Loader';

import css from './ProfileAvatar.module.css';

const MAX_FILE_SIZE = 1024 * 1024;

export default function ProfileAvatar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const isAuthChecked = useAuthStore(state => state.isAuthChecked);

  const [isUploading, setIsUploading] = useState(false);

  function handleUploadClick() {
    inputRef.current?.click();
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];

    event.currentTarget.value = '';

    if (!file || !user || isUploading) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Оберіть файл зображення.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Розмір зображення не повинен перевищувати 1 МБ.');
      return;
    }

    try {
      setIsUploading(true);

      const updatedUser = await updateAvatar(file);
      const currentUser = useAuthStore.getState().user;

      if (currentUser && currentUser._id === user._id) {
        setUser({
          ...currentUser,
          avatarUrl: updatedUser.avatarUrl,
        });

        toast.success('Фото успішно оновлено');
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  }

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

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <button
          type="button"
          className={css.uploadButton}
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading ? 'Завантаження...' : 'Завантажити нове фото'}
        </button>
      </div>
    </section>
  );
}
