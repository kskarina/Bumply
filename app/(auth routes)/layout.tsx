'use client';

import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';

import css from './AuthLayout.module.css';

type Props = {
  children: React.ReactNode;
};

// Сторінки входу і реєстрації — без меню і хлібних крихт
export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();

    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  return (
    <main className={css.authMain}>{loading ? <Loader /> : children}</main>
  );
}
