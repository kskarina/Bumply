import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

// Окрема сторінка запису для мобілки/планшета
export default async function DiaryEntryPage({
  params,
}: {
  params: Promise<{ entryId: string }>;
}) {
  const { entryId } = await params;

  return (
    <div data-entry-id={entryId}>
      <DiaryEntryDetails />
    </div>
  );
}
