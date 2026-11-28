import { DiaryNote } from '@/types/diary';
import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale/uk';
import clsx from 'clsx';
import css from './DiaryEntryCard.module.css';
import Link from 'next/link';

interface DiaryEntryCardProps {
  entry: DiaryNote;
  isActive: boolean;
}

export default function DiaryEntryCard({
  entry,
  isActive,
}: DiaryEntryCardProps) {
  return (
    <Link
      href={`/diary/${entry._id}`}
      className={clsx(css.link, isActive && css.active)}
    >
      <li className={css.diaryEntryCard}>
        <div className={css.header}>
          <h3 className={css.title}>{entry.title}</h3>
          <time className={css.date} dateTime={entry.date}>
            {format(parseISO(entry.date), 'd MMMM yyyy', { locale: uk })}
          </time>
        </div>

        {entry.emotions.length > 0 && (
          <ul className={css.emotions} aria-label="Емоції">
            {entry.emotions.map(emotion => (
              <li key={emotion._id} className={css.emotion}>
                {emotion.title}
              </li>
            ))}
          </ul>
        )}
      </li>
    </Link>
  );
}
