'use client';

import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import { useWeekGreeting } from '@/hooks/useWeekGreeting';
import css from './BabyTodayCard.module.css';

export default function BabyTodayCard() {
  const { data, isPending } = useWeekGreeting();
  const baby = data?.babyToday;

  return (
    <section className={css.babyTodayCard}>
      <h2 className={css.title}>Малюк сьогодні</h2>

      {isPending && <Loader />}

      {baby && (
        <>
          <div className={css.content}>
            <Image
              src={baby.image}
              alt="Малюк цього тижня"
              width={257}
              height={194}
              priority
              className={css.image}
            />
            <div className={css.info}>
              <p>
                <span className={css.label}>Розмір:</span> Приблизно{' '}
                {baby.babySize} см
              </p>
              <p>
                <span className={css.label}>Вага:</span> Близько{' '}
                {baby.babyWeight} грамів.
              </p>
              <p>
                <span className={css.label}>Активність:</span>{' '}
                {baby.babyActivity}
              </p>
            </div>
          </div>
          <p className={css.description}>{baby.babyDevelopment}</p>
        </>
      )}
    </section>
  );
}
