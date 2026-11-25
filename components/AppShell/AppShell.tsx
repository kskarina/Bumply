'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import SideBar from '@/components/SideBar/SideBar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import css from './AppShell.module.css';

// сторінки без меню і хлібних крихт: вхід, реєстрація, онбординг
const pagesWithoutLayout = ['/auth', '/profile/edit'];

// Загальний макет сторінок: Header (телефон), SideBar, Breadcrumbs і контент
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pagesWithoutLayout.some(page => pathname.startsWith(page))) {
    return children;
  }

  return (
    <div className={css.shell}>
      <SideBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className={css.content}>
        <Header onOpenMenu={() => setIsMenuOpen(true)} />
        <Breadcrumbs />
        <main className={css.main}>{children}</main>
      </div>
    </div>
  );
}
