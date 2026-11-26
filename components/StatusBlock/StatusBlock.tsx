'use client';

import Loader from '@/components/Loader/Loader';
import { useWeekGreeting } from '@/hooks/useWeekGreeting';
import css from './StatusBlock.module.css';

export default function StatusBlock() {
  const { data, isPending } = useWeekGreeting();

  if (isPending) {
    return (
      <section className={css.statusBlock}>
        <Loader />
      </section>
    );
  }

  return (
    <section className={css.statusBlock}>
      <div className={css.card}>
        <p className={css.label}>Тиждень</p>
        <p className={css.value}>{data?.curWeekToPregnant}</p>
      </div>
      <div className={css.card}>
        <p className={css.label}>Днів до зустрічі</p>
        <p className={css.value}>~{data?.daysBeforePregnant}</p>
      </div>
    </section>
  );
}
