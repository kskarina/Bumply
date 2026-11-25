import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

import css from './DiaryEntryPage.module.css';

type Props = {
  params: Promise<{ entryId: string }>;
};

// Окрема сторінка запису для мобілки/планшета
const DiaryEntryPage = async ({ params }: Props) => {
  const { entryId } = await params;

  return (
    <div className={css.entry} data-entry-id={entryId}>
      <DiaryEntryDetails />
    </div>
  );
};

export default DiaryEntryPage;
