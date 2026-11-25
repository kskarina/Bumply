'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { logout } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearIsAuthenticated = useAuthStore(s => s.clearIsAuthenticated);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearIsAuthenticated();
      queryClient.clear();
      router.push('/');
    },
    onError: error => toast.error(getErrorMessage(error)),
  });
};
