'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import css from './WeekSelector.module.css';
import { useAuthStore } from '@/lib/store/authStore';

interface WeekSelectorProps {
  weekNumber: number;
}

export default function WeekSelector({ weekNumber }: WeekSelectorProps) {
  const items = [];
  const user = useAuthStore(s => s.user);
  const currentWeek = user?.curWeekNumber ?? 0;

  for (let i = 1; i <= 42; i += 1) {
    const isCurrentWeek = i === currentWeek;
    const isActive = i === weekNumber;
    const isDisabled = i > currentWeek;

    let linkClass = css.weekLink;
    if (isCurrentWeek) {
      linkClass = `${css.weekLink} ${css.current}`;
    } else if (isActive) {
      linkClass = `${css.weekLink} ${css.active}`;
    }

    items.push(
      <SwiperSlide key={i} className={`${css.slide} ${css.weekItem}`}>
        <Link
          href={`/journey/${i}`}
          className={linkClass}
          aria-disabled={isDisabled}
        >
          <span className={css.counter}>{i}</span> Тиждень
        </Link>
      </SwiperSlide>
    );
  }
  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={16}
      initialSlide={weekNumber - 1}
      className={css.weekList}
      centeredSlides={true}
      slideToClickedSlide={true}
      centeredSlidesBounds={true}
    >
      {items}
    </Swiper>
  );
}
