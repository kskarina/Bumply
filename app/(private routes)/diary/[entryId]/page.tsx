import css from './DiaryEntryPage.module.css';
import DiaryContent from '@/components/DiaryContent/DiaryContent';

interface DiaryEntryPageProps {
  params: Promise<{ entryId: string }>;
}

// Окрема сторінка запису для мобілки/планшета
const DiaryEntryPage = async ({ params }: DiaryEntryPageProps) => {
  const { entryId } = await params;

  return (
    <div className={css.entry} data-entry-id={entryId}>
      <DiaryContent />
    </div>
  );
};

export default DiaryEntryPage;
