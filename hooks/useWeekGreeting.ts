'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchWeekGreeting } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';

export const useWeekGreeting = () => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const isAuthChecked = useAuthStore(s => s.isAuthChecked);

  const query = useQuery({
    queryKey: ['weekGreeting', isAuthenticated],
    queryFn: () => fetchWeekGreeting(isAuthenticated),
    enabled: isAuthChecked,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(getErrorMessage(query.error), { id: 'week-greeting' });
    }
  }, [query.isError, query.error]);

  return query;
};
