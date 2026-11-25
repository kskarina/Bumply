'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon/Icon';
import css from './Breadcrumbs.module.css';

const labels: Record<string, string> = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
  edit: 'Редагування',
};

const getLabel = (segment: string, prev?: string) => {
  if (labels[segment]) return labels[segment];
  if (prev === 'journey') return `${segment} тиждень`;
  if (prev === 'diary') return 'Запис';
  return segment;
};

// Як у макеті: Лелека › Мій день, Лелека › Щоденник › Запис
// Останній пункт — поточна сторінка (сірий, не посилання)
export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { href: '/', label: 'Лелека' },
    ...(segments.length === 0
      ? [{ href: '/', label: 'Мій день' }]
      : segments.map((segment, i) => ({
          href: '/' + segments.slice(0, i + 1).join('/'),
          label: getLabel(segment, segments[i - 1]),
        }))),
  ];

  return (
    <nav aria-label="Навігація" className={css.breadcrumbs}>
      <ol className={css.list}>
        {crumbs.map(({ href, label }, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={`${href}-${i}`} className={css.item}>
              {isLast ? (
                <span className={css.current} aria-current="page">
                  {label}
                </span>
              ) : (
                <>
                  <Link href={href} className={css.link}>
                    {label}
                  </Link>
                  <Icon name="chevron-right" className={css.separator} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
