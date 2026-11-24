'use client';

import { useEffect } from 'react';
import { getMe, refreshSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

// При першому завантаженні дізнаємося, чи користувач залогінений,
// і кладемо його дані в стор
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const setAuthChecked = useAuthStore((s) => s.setAuthChecked);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setUser(await getMe());
      } catch {
        try {
          await refreshSession();
          setUser(await getMe());
        } catch {
          clearUser();
        }
      } finally {
        setAuthChecked();
      }
    };

    checkAuth();
  }, [setUser, clearUser, setAuthChecked]);

  return children;
}
