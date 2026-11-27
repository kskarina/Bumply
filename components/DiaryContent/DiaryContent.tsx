import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchDiaryNotes } from '@/lib/api/clientApi';
import DiaryContentClient from './DiaryContent.client';

interface DiaryContentProps {
  entryId?: string;
}

export default async function DiaryContent({ entryId }: DiaryContentProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['diary'],
    queryFn: () => fetchDiaryNotes(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryContentClient />
    </HydrationBoundary>
  );
}
