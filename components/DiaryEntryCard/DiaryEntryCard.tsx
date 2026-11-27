import { DiaryNote } from '@/types/diary';
import css from './DiaryEntryCard.module.css';

interface DiaryEntryCardProps {
  entry: DiaryNote;
}

export default function DiaryEntryCard({ entry }: DiaryEntryCardProps) {
  return (
    <section className={css.diaryEntryCard}>
      <p>{entry.title}</p>
      <p>{entry.description}</p>
    </section>
  );
}
