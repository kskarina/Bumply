'use client';

import { DiaryNote } from '@/types/diary';
import Icon from '../Icon/Icon';
import css from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';
import Loader from '../Loader/Loader';

interface DiaryListProps {
  entries: DiaryNote[];
  selectedEntryId?: string;
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
}

export default function DiaryList({
  entries,
  selectedEntryId,
  isLoading = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
}: DiaryListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      {hasNextPage && (
        <div ref={loadMoreRef} className={css.loadMore}>
          {isFetchingNextPage && <Loader />}
        </div>
      )}
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
