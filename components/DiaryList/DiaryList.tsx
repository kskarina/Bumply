'use client';

import { DiaryNote } from '@/types/diary';
import Icon from '../Icon/Icon';
import css from './DiaryList.module.css';
import Link from 'next/link';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';

interface DiaryListProps {
  entries: DiaryNote[];
  selectedEntryId?: string;
}

export default function DiaryList({
  entries,
  selectedEntryId,
}: DiaryListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={css.diaryList}>
      <h2>Ваші записи</h2>{' '}
      <button className={css.btn} onClick={() => setIsModalOpen(true)}>
        Новий запис <Icon name="add-circle" />
      </button>
      <ul className={css.list}>
        {entries.map(entry => (
          <Link
            key={entry._id}
            href={`/diary/${entry._id}`}
            className={selectedEntryId === entry._id ? css.active : ''}
          >
            <DiaryEntryCard entry={entry} />
          </Link>
        ))}
      </ul>
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
