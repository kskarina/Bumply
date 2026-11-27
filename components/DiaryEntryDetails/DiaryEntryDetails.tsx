import { DiaryNote } from '@/types/diary';
import css from './DiaryEntryDetails.module.css';
interface DiaryEntryDetailsProps {
  entry?: DiaryNote;
}

export default function DiaryEntryDetails({ entry }: DiaryEntryDetailsProps) {
  if (!entry) {
    return <p>Наразі записи у щоденнику відсутні</p>;
  }
  return (
    <section className={css.diaryEntryDetails}>
      <div className={css.details}>
        <h2>{entry.title}</h2>
        <p>{entry.description}</p>
      </div>
    </section>
  );
}
