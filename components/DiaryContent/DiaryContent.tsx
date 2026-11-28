import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchDiaryNotes } from '@/lib/api/clientApi';
import DiaryContentClient from './DiaryContent.client';

export default async function DiaryContent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diaryEntries'],
    queryFn: () => fetchDiaryNotes(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryContentClient />
    </HydrationBoundary>
  );
}
