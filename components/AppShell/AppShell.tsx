'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import SideBar from '@/components/SideBar/SideBar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import css from './AppShell.module.css';

// Загальний макет сторінок: Header (мобілка/планшет), SideBar, Breadcrumbs і контент
export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
