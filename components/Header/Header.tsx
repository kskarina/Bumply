import Logo from '@/components/Logo/Logo';
import Icon from '@/components/Icon/Icon';
import css from './Header.module.css';

// Показується тільки на мобілці та планшеті, на десктопі хедера немає
export default function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className={css.header}>
      <Logo />
      <button
        type="button"
        className={css.burger}
        onClick={onOpenMenu}
        aria-label="Відкрити меню"
      >
        <Icon name="menu" size={32} />
      </button>
    </header>
  );
}
