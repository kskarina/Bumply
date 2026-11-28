'use client';

import { DiaryNote } from '@/types/diary';
import Icon from '../Icon/Icon';
import css from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { useState } from 'react';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';
import Loader from '../Loader/Loader';

interface DiaryListProps {
  entries: DiaryNote[];
  selectedEntryId?: string;
  isLoading?: boolean;
}

export default function DiaryList({
  entries,
  selectedEntryId,
  isLoading = false,
}: DiaryListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={css.diaryList}>
      <div className={css.header}>
        <h2 className={css.headerTitle}>Ваші записи</h2>{' '}
        <button className={css.btn} onClick={() => setIsModalOpen(true)}>
          Новий запис <Icon name="add-circle" />
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className={css.list}>
          {entries.map(entry => (
            <DiaryEntryCard
              key={entry._id}
              entry={entry}
              isActive={selectedEntryId === entry._id}
            />
          ))}
        </ul>
      )}
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
