'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchWeekGreeting } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';

// /journey без номера тижня — перекидаємо на поточний тиждень користувача
export default function JourneyRedirectPage() {
  const router = useRouter();
  const { data, isError } = useQuery({
    queryKey: ['weekGreeting', true],
    queryFn: () => fetchWeekGreeting(true),
  });

  useEffect(() => {
    if (data) router.replace(`/journey/${data.curWeekToPregnant}`);
    if (isError) router.replace('/journey/1');
  }, [data, isError, router]);

  return <Loader />;
}
