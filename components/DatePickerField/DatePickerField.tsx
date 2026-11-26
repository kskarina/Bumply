'use client';

import { forwardRef, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import clsx from 'clsx';

import Icon from '@/components/Icon/Icon';

import 'react-datepicker/dist/react-datepicker.css';
import css from './DatePickerField.module.css';

registerLocale('uk', uk);

interface DatePickerFieldProps {
  id: string;
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  // select — як у профілі (48px зі стрілкою), text-input — як Text input з UI Kit (онбординг)
  variant?: 'select' | 'text-input';
}

interface DateInputProps extends ComponentPropsWithoutRef<'button'> {
  placeholder?: string;
  isOpen: boolean;
  showArrow: boolean;
}

const DateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  function DateInput(
    {
      value,
      placeholder,
      isOpen,
      showArrow,
      className,
      id,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      disabled,
      tabIndex,
      'aria-describedby': ariaDescribedBy,
      'aria-label': ariaLabel,
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        id={id}
        type="button"
        className={className}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        tabIndex={tabIndex}
        aria-expanded={isOpen}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
      >
        <span className={clsx(!value && css.placeholder)}>
          {value || placeholder}
        </span>

        {showArrow && (
          <Icon
            name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={20}
            className={css.arrowIcon}
          />
        )}
      </button>
    );
  }
);

export default function DatePickerField({
  id,
  label,
  value,
  onChange,
  onBlur,
  minDate,
  maxDate,
  placeholder = 'Оберіть дату',
  error,
  disabled = false,
  variant = 'select',
}: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isTextInput = variant === 'text-input';

  return (
    <div className={css.field}>
      {label && (
        <label htmlFor={id} className={css.label}>
          {label}
        </label>
      )}

      <DatePicker
        id={id}
        selected={value}
        onChange={onChange}
        onBlur={onBlur}
        onCalendarOpen={() => setIsOpen(true)}
        onCalendarClose={() => setIsOpen(false)}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        locale="uk"
        calendarStartDay={1}
        dateFormat="dd.MM.yyyy"
        placeholderText={placeholder}
        previousMonthAriaLabel="Попередній місяць"
        nextMonthAriaLabel="Наступний місяць"
        previousMonthButtonLabel="Попередній місяць"
        nextMonthButtonLabel="Наступний місяць"
        ariaDescribedBy={error ? `${id}-error` : undefined}
        ariaLabel={label ? undefined : placeholder}
        className={clsx(
          css.input,
          isTextInput && css.textInput,
          isOpen && css.inputOpen,
          error && css.inputError
        )}
        wrapperClassName={css.wrapper}
        calendarClassName={css.calendar}
        popperClassName={css.popper}
        popperPlacement="bottom-start"
        showPopperArrow={false}
        customInput={<DateInput isOpen={isOpen} showArrow={!isTextInput} />}
      />

      {error && (
        <p id={`${id}-error`} className={css.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
