'use client';

import Loading from '@/app/loading';
import { fetchWeekBaby, fetchWeekMom } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import BabyDetails from '../BabyDetails/BabyDetails';
import MomDetails from '../MomDetails/MomDetails';
import css from './JourneyDetails.module.css';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/lib/api/getErrorMessage';

interface JourneyDetailsProps {
  weekNumber: number;
}

type Person = 'baby' | 'mom';

// TODO: Таби "Розвиток малюка" / "Тіло мами". Деталі — у ТЗ та макеті
export default function JourneyDetails({ weekNumber }: JourneyDetailsProps) {
  const [person, setPerson] = useState<Person>('baby');
  const isBaby = person === 'baby';
  const isMom = person === 'mom';

  const {
    data: baby,
    isError: babyIsError,
    isLoading: babyLoading,
    error: babyError,
  } = useQuery({
    queryKey: ['journey', 'baby', weekNumber],
    queryFn: () => fetchWeekBaby(weekNumber),
    enabled: isBaby,
  });

  const {
    data: mom,
    isError: momIsError,
    isLoading: momLoading,
    error: momError,
  } = useQuery({
    queryKey: ['journey', 'mom', weekNumber],
    queryFn: () => fetchWeekMom(weekNumber),
    enabled: isMom,
  });

  useEffect(() => {
    if (babyIsError) toast.error(getErrorMessage(babyError));
  }, [babyIsError, babyError]);

  useEffect(() => {
    if (momIsError) toast.error(getErrorMessage(momError));
  }, [momIsError, momError]);

  return (
    <>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <button
            className={`${css.navBtn} ${isBaby ? css.active : ''}`}
            onClick={() => setPerson('baby')}
          >
            Розвиток малюка
          </button>
        </li>
        <li className={css.navItem}>
          <button
            className={`${css.navBtn} ${isMom ? css.active : ''}`}
            onClick={() => setPerson('mom')}
          >
            Тіло мами
          </button>
        </li>
      </ul>

      {(babyLoading || momLoading) && <Loading />}
      {isBaby && baby && <BabyDetails baby={baby} />}
      {isMom && mom && <MomDetails mom={mom} />}
    </>
  );
}
