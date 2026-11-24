import Link from 'next/link';
import css from './Header.module.css';

// Показується тільки на мобілці та планшеті, на десктопі хедера немає
export default function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        Лелека
      </Link>
      <button type="button" className={css.burger} onClick={onOpenMenu} aria-label="Відкрити меню">
        ☰
      </button>
    </header>
  );
}
