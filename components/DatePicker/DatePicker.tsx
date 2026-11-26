'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Icon from '@/components/Icon/Icon';
import css from './DatePicker.module.css';

interface DatePickerProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  hasError?: boolean;
}

const MONTHS = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

// дата у форматі РРРР-ММ-ДД за місцевим часом
// (toISOString рахує в UTC і після опівночі може віддати вчорашній день)
export const toDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// РРРР-ММ-ДД -> ДД.ММ.РРРР, як у макеті
const formatDate = (value: string) => value.split('-').reverse().join('.');

// перше число місяця, який показуємо при відкритті
const getMonthStart = (value: string) => {
  if (!value) {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }
  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1, 1);
};

export default function DatePicker({
  id,
  value,
  onChange,
  minDate,
  hasError = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => getMonthStart(value));
  const pickerRef = useRef<HTMLDivElement>(null);

  // календар закривається по кліку поза ним
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = toDateString(new Date());

  // тиждень починається з понеділка, а getDay() рахує з неділі
  const emptyCells = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // у попередній місяць не пускаємо, якщо всі його дні вже недоступні
  const isPrevDisabled = Boolean(
    minDate && toDateString(new Date(year, month, 0)) < minDate
  );

  const handleToggle = () => {
    if (!isOpen) setViewDate(getMonthStart(value));
    setIsOpen(prev => !prev);
  };

  const handleSelect = (date: string) => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className={css.datePicker} ref={pickerRef}>
      <button
        id={id}
        type="button"
        className={clsx(
          css.trigger,
          isOpen && css.triggerOpen,
          hasError && css.triggerError
        )}
        onClick={handleToggle}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {value ? (
          formatDate(value)
        ) : (
          <span className={css.placeholder}>Оберіть дату</span>
        )}
      </button>

      {isOpen && (
        <div className={css.calendar}>
          <div className={css.header}>
            <button
              type="button"
              className={css.navBtn}
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              disabled={isPrevDisabled}
              aria-label="Попередній місяць"
            >
              <Icon name="chevron-right" size={20} className={css.prevIcon} />
            </button>
            <p className={css.monthTitle}>
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              className={css.navBtn}
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              aria-label="Наступний місяць"
            >
              <Icon name="chevron-right" size={20} />
            </button>
          </div>

          <ul className={css.weekDays}>
            {WEEK_DAYS.map(day => (
              <li key={day}>{day}</li>
            ))}
          </ul>

          <ul className={css.days}>
            {Array.from({ length: emptyCells }, (_, i) => (
              <li key={`empty-${i}`} />
            ))}
            {days.map(day => {
              const date = toDateString(new Date(year, month, day));
              const isDisabled = Boolean(minDate && date < minDate);

              return (
                <li key={date}>
                  <button
                    type="button"
                    className={clsx(
                      css.day,
                      date === today && css.today,
                      date === value && css.selected
                    )}
                    onClick={() => handleSelect(date)}
                    disabled={isDisabled}
                    aria-pressed={date === value}
                  >
                    {day}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
