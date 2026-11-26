'use client';

import Loader from '@/components/Loader/Loader';
import { useWeekGreeting } from '@/hooks/useWeekGreeting';
import css from './MomTipCard.module.css';

export default function MomTipCard() {
  const { data, isPending } = useWeekGreeting();

  return (
    <section className={css.momTipCard}>
      <h2 className={css.title}>Порада для мами</h2>
      {isPending && <Loader />}
      {data && <p className={css.text}>{data.momHint}</p>}
    </section>
  );
}
