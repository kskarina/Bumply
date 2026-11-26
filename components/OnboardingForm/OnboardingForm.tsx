'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { addWeeks, format, parseISO, startOfDay } from 'date-fns';
import { updateAvatar, updateMe } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '@/components/Loader/Loader';
import Icon from '@/components/Icon/Icon';
import DatePickerField from '@/components/DatePickerField/DatePickerField';
import type { BabyGender } from '@/types/user';
import css from './OnboardingForm.module.css';

interface OnboardingValues {
  avatar: File | null;
  babyGender: BabyGender | '';
  dueDate: string;
}

const MAX_AVATAR_SIZE = 1024 * 1024; // 1 МБ — обмеження бекенду

// варіанти зі ТЗ: Хлопчик, Дівчинка, Ще не знаю
const genderOptions: { value: BabyGender; label: string }[] = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'unknown', label: 'Ще не знаю' },
];

// бекенд приймає дату у форматі РРРР-ММ-ДД
const DATE_FORMAT = 'yyyy-MM-dd';

// планова дата — від 1 до 41 тижня від сьогодні
const today = startOfDay(new Date());
const minDate = addWeeks(today, 1);
const maxDate = addWeeks(today, 41);
const minDueDate = format(minDate, DATE_FORMAT);
const maxDueDate = format(maxDate, DATE_FORMAT);

const validationSchema = Yup.object({
  avatar: Yup.mixed<File>()
    .nullable()
    .test('fileType', 'Оберіть зображення', file =>
      file ? file.type.startsWith('image/') : true
    )
    .test('fileSize', 'Розмір фото — не більше 1 МБ', file =>
      file ? file.size <= MAX_AVATAR_SIZE : true
    ),
  babyGender: Yup.string().oneOf(['boy', 'girl', 'unknown', '']),
  dueDate: Yup.string()
    .required('Вкажіть планову дату пологів')
    .test(
      'dueDateRange',
      'Дата має бути в межах від 1 до 41 тижня від сьогодні',
      value => !value || (value >= minDueDate && value <= maxDueDate)
    ),
});

const initialValues: OnboardingValues = {
  avatar: null,
  babyGender: '',
  dueDate: '',
};

export default function OnboardingForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const genderRef = useRef<HTMLDivElement>(null);

  // звільняємо пам'ять від попереднього прев'ю
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // список статі закривається по кліку поза ним і по Escape
  useEffect(() => {
    if (!isGenderOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (!genderRef.current?.contains(e.target as Node)) {
        setIsGenderOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsGenderOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isGenderOpen]);

  const handleSubmit = async (values: OnboardingValues) => {
    try {
      if (values.avatar) {
        await updateAvatar(values.avatar);
      }

      const user = await updateMe({
        dueDate: values.dueDate,
        ...(values.babyGender && { babyGender: values.babyGender }),
      });

      setUser(user);
      router.push('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <Form className={css.form} noValidate>
          <div className={css.upload}>
            <Image
              src={preview ?? '/images/avatar-placeholder.webp'}
              alt="Ваше фото"
              width={164}
              height={164}
              className={css.avatar}
              unoptimized={Boolean(preview)}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="visually-hidden"
              onChange={e => {
                const file = e.target.files?.[0] ?? null;
                setFieldValue('avatar', file);
                setFieldTouched('avatar', true, false);
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
            />
            <button
              type="button"
              className={css.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              Завантажити фото
            </button>
            <ErrorMessage
              name="avatar"
              component="p"
              className={css.errorText}
            />
          </div>

          <div className={css.fields}>
            <div className={css.field}>
              <label htmlFor="babyGender" className={css.label}>
                Стать дитини
              </label>
              <div className={css.select} ref={genderRef}>
                <button
                  id="babyGender"
                  type="button"
                  className={clsx(
                    css.selectTrigger,
                    isGenderOpen && css.selectOpen,
                    touched.babyGender && errors.babyGender && css.selectError
                  )}
                  onClick={() => setIsGenderOpen(prev => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isGenderOpen}
                >
                  <span
                    className={
                      values.babyGender
                        ? css.selectValue
                        : css.selectPlaceholder
                    }
                  >
                    {genderOptions.find(o => o.value === values.babyGender)
                      ?.label ?? 'Оберіть стать'}
                  </span>
                  <Icon
                    name={
                      isGenderOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    className={css.selectArrow}
                  />
                </button>

                {isGenderOpen && (
                  <ul className={css.selectList} role="listbox">
                    {genderOptions.map(option => (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={option.value === values.babyGender}
                        className={clsx(
                          css.selectOption,
                          option.value === values.babyGender &&
                            css.selectOptionActive
                        )}
                        onClick={() => {
                          setFieldValue('babyGender', option.value);
                          setFieldTouched('babyGender', true, false);
                          setIsGenderOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <DatePickerField
              id="dueDate"
              label="Планова дата пологів"
              variant="text-input"
              placeholder="дд.мм.рррр"
              value={values.dueDate ? parseISO(values.dueDate) : null}
              onChange={date => {
                setFieldValue('dueDate', date ? format(date, DATE_FORMAT) : '');
                setFieldTouched('dueDate', true, false);
              }}
              onBlur={() => setFieldTouched('dueDate', true)}
              minDate={minDate}
              maxDate={maxDate}
              error={touched.dueDate ? errors.dueDate : undefined}
            />
          </div>

          <button
            type="submit"
            className={css.submitBtn}
            disabled={isSubmitting}
          >
            Зберегти
          </button>

          {isSubmitting && <Loader fullScreen />}
        </Form>
      )}
    </Formik>
  );
}
