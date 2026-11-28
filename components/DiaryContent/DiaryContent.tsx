import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchDiaryNotes } from '@/lib/api/clientApi';
import DiaryContentClient from './DiaryContent.client';

export const DIARY_NOTES_PER_PAGE = 10;

export default async function DiaryContent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
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
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryContentClient />
    </HydrationBoundary>
  );
}
