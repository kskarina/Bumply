'use client';

import DiaryEntryDetails from '../DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '../DiaryList/DiaryList';
import GreetingBlock from '../GreetingBlock/GreetingBlock';
import css from './DiaryContent.module.css';
import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchDiaryNotes } from '@/lib/api/clientApi';
import { useEffect } from 'react';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import toast from 'react-hot-toast';
import { DIARY_NOTES_PER_PAGE } from './DiaryContent';

export default function DiaryContentClient() {
  const { entryId } = useParams<{ entryId: string }>();

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['diaryEntries'],
    queryFn: ({ pageParam }) =>
      fetchDiaryNotes({
        page: pageParam,
        limit: DIARY_NOTES_PER_PAGE,
        sortOrder: 'desc',
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error), { id: 'tasks' });
    }
  }, [isError, error]);

  const entries = (data?.pages.flatMap(page => page.diaryNotes) ?? []).filter(
    (entry, index, allEntries) =>
      allEntries.findIndex(item => item._id === entry._id) === index
  );

  const selectedEntry =
    entries.find(entry => entry._id === entryId) ?? entries[0];

  return (
    <div
      className={`${css.diary} ${entryId ? css.detailsRoute : css.listRoute}`}
    >
      <GreetingBlock />
      <div className={css.diaryWrapper}>
        <div className={css.diaryList}>
          <DiaryList
            entries={entries}
            selectedEntryId={selectedEntry?._id}
            isLoading={isLoading}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </div>

        <div className={css.diaryDetails}>
          <DiaryEntryDetails entry={selectedEntry} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
