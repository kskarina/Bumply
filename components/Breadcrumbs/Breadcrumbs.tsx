'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

// Приклад: Мій день / Щоденник / Запис
export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { href: '/', label: 'Мій день' },
    ...segments.map((segment, i) => ({
      href: '/' + segments.slice(0, i + 1).join('/'),
      label: getLabel(segment, segments[i - 1]),
    })),
  ];

  return (
    <nav aria-label="Навігація" className={css.breadcrumbs}>
      <ol className={css.list}>
        {crumbs.map(({ href, label }, i) => (
          <li key={href} className={css.item}>
            {i < crumbs.length - 1 ? (
              <Link href={href} className={css.link}>
                {label}
              </Link>
            ) : (
              <span aria-current="page">{label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
