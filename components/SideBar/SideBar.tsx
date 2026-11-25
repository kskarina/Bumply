'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuthStore } from '@/lib/store/authStore';
import UserBar from '@/components/UserBar/UserBar';
import AuthBar from '@/components/AuthBar/AuthBar';
import Logo from '@/components/Logo/Logo';
import Icon, { type IconName } from '@/components/Icon/Icon';
import css from './SideBar.module.css';

const navItems: { href: string; label: string; icon: IconName }[] = [
  { href: '/', label: 'Мій день', icon: 'today' },
  { href: '/journey', label: 'Подорож', icon: 'conversion-path' },
  { href: '/diary', label: 'Щоденник', icon: 'book-2' },
  { href: '/profile', label: 'Профіль', icon: 'account-circle' },
];

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

// На десктопі — бічна панель зліва, на мобілці/планшеті — бургер-меню
export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthChecked = useAuthStore((s) => s.isAuthChecked);
  // поки перевірка сесії не завершилась, не показуємо гостьовий стан
  const isGuest = isAuthChecked && !isAuthenticated;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {isOpen && <div className={css.overlay} onClick={onClose} />}
      <aside className={clsx(css.sidebar, isOpen && css.open)}>
        <div className={css.top}>
          <Logo onClick={onClose} size="lg" />
          <button type="button" className={css.closeBtn} onClick={onClose} aria-label="Закрити меню">
            <Icon name="close" size={32} />
          </button>
        </div>

        <nav className={css.nav}>
          <ul>
            {navItems.map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={isGuest ? '/auth/login' : href}
                  className={clsx(css.navLink, isActive(href) && css.active)}
                  onClick={onClose}
                >
                  <Icon name={icon} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={css.bottom}>
          {isAuthenticated && <UserBar />}
          {isGuest && <AuthBar />}
        </div>
      </aside>
    </>
  );
}
