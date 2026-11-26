'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { useAuthStore } from '@/lib/store/authStore';
import type { BabyGender } from '@/types/user';

type Theme = 'pink' | 'blue' | 'light';

interface ThemeProviderProps {
  children: ReactNode;
}

function getThemeByGender(gender: BabyGender | null): Theme {
  switch (gender) {
    case 'girl':
      return 'pink';

    case 'boy':
      return 'blue';

    default:
      return 'light';
  }
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const babyGender = useAuthStore(state => state.user?.babyGender ?? null);

  useEffect(() => {
    const theme = isAuthenticated ? getThemeByGender(babyGender) : 'pink';

    document.documentElement.dataset.theme = theme;
  }, [babyGender, isAuthenticated]);

  return children;
}
