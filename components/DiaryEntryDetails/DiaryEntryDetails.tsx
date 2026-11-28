'use client';

import { DiaryNote } from '@/types/diary';
import css from './DiaryEntryDetails.module.css';
import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDiaryNote } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/api/getErrorMessage';

interface DiaryEntryDetailsProps {
  entry?: DiaryNote;
  isLoading?: boolean;
}

export default function DiaryEntryDetails({
  entry,
  isLoading = false,
}: DiaryEntryDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteDiaryNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
      setIsConfirmOpen(false);
    },
    onError: error => toast.error(getErrorMessage(error)),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!entry) {
    return <p>Наразі записи у щоденнику відсутні</p>;
  }
  return (
    <section className={css.details}>
      <div className={css.header}>
        <div className={css.titleGroup}>
          <h2 className={css.title}>{entry.title}</h2>

          <button
            type="button"
            className={css.iconButton}
            aria-label="Редагувати запис"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon name="edit-square" />
          </button>
        </div>

        <div className={css.actions}>
          <time className={css.date}>{entry.date}</time>

          <button
            type="button"
            className={css.iconButton}
            aria-label="Видалити запис"
            onClick={() => setIsConfirmOpen(true)}
          >
            <Icon name="delete-forever" />
          </button>
        </div>
      </div>

      <div className={css.content}>
        {entry.description.split(/\n+/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <ul className={css.emotions}>
        {entry.emotions.map(emotion => (
          <li key={emotion._id} className={css.emotion}>
            {emotion.title}
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <AddDiaryEntryModal
          editEntry={entry}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          title="Ви впевнені, що хочете видалити цей запис?"
          confirmButtonText="Так"
          cancelButtonText="Ні"
          onConfirm={() => mutate(entry?._id)}
          onCancel={() => setIsConfirmOpen(false)}
        />
      )}
    </section>
  );
}
