'use client';

import { fetchWeekBaby, fetchWeekMom } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BabyDetails from '../BabyDetails/BabyDetails';
import css from './JourneyDetails.module.css';
import MomDetails from '../MomDetails/MomDetails';

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
    isError: babyError,
    isLoading: babyLoading,
  } = useQuery({
    queryKey: ['journey', 'baby', weekNumber],
    queryFn: () => fetchWeekBaby(weekNumber),
    enabled: isBaby,
  });

  const {
    data: mom,
    isError: momError,
    isLoading: momLoading,
  } = useQuery({
    queryKey: ['journey', 'mom', weekNumber],
    queryFn: () => fetchWeekMom(weekNumber),
    enabled: isMom,
  });

  console.log(mom);

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

      {isBaby && baby && <BabyDetails baby={baby} />}
      {isMom && mom && <MomDetails mom={mom} />}
    </>
  );
}
