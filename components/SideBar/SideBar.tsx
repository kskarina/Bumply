'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuthStore } from '@/lib/store/authStore';
import UserBar from '@/components/UserBar/UserBar';
import AuthBar from '@/components/AuthBar/AuthBar';
import css from './SideBar.module.css';

const navItems = [
  { href: '/', label: 'Мій день' },
  { href: '/journey', label: 'Подорож' },
  { href: '/diary', label: 'Щоденник' },
  { href: '/profile', label: 'Профіль' },
];

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

// На десктопі — бічна панель зліва, на мобілці/планшеті — бургер-меню
export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {isOpen && <div className={css.overlay} onClick={onClose} />}
      <aside className={clsx(css.sidebar, isOpen && css.open)}>
        <div className={css.top}>
          <Link href="/" className={css.logo} onClick={onClose}>
            Лелека
          </Link>
          <button type="button" className={css.closeBtn} onClick={onClose} aria-label="Закрити меню">
            ✕
          </button>
        </div>

        <nav>
          <ul className={css.navList}>
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={isAuthenticated ? href : '/auth/login'}
                  className={clsx(css.navLink, isActive(href) && css.active)}
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={css.bottom}>{isAuthenticated ? <UserBar /> : <AuthBar />}</div>
      </aside>
    </>
  );
}
