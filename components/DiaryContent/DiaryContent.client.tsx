'use client';

import DiaryEntryDetails from '../DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '../DiaryList/DiaryList';
import GreetingBlock from '../GreetingBlock/GreetingBlock';
import css from './DiaryContent.module.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchDiaryNotes } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import toast from 'react-hot-toast';

export default function DiaryContentClient() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['diary'],
    queryFn: () => fetchDiaryNotes(),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error), { id: 'tasks' });
    }
  }, [isError, error]);

  const entries = data?.tasks ?? [];
  const { entryId } = useParams<{ entryId: string }>;

  const selectedEntry = undefined;
  return (
    <div
      className={`${css.diary} ${selectedEntry ? css.detailsRoute : css.listRoute}`}
    >
      <GreetingBlock />
      <div className={css.diaryWrapper}>
        {isLoading && <Loader fullScreen={true} />}
        <div className={css.diaryList}>
          <DiaryList entries={entries} selectedEntryId={entryId} />
        </div>

        <div className={css.diaryDetails}>
          <DiaryEntryDetails entry={selectedEntry} />
        </div>
      </div>
    </div>
  );
}
