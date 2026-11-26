'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select, { components, type DropdownIndicatorProps } from 'react-select';
import { addWeeks, format, isValid, parseISO, startOfDay } from 'date-fns';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import clsx from 'clsx';

import { updateMe } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import type { BabyGender, User } from '@/types/user';

import Loader from '@/components/Loader/Loader';
import Icon from '@/components/Icon/Icon';
import DatePickerField from '@/components/DatePickerField/DatePickerField';

import css from './ProfileEditForm.module.css';

interface GenderOption {
  value: BabyGender;
  label: string;
}

interface ProfileFormValues {
  name: string;
  email: string;
  babyGender: BabyGender | '';
  dueDate: string;
}

const genderOptions: GenderOption[] = [
  { value: 'girl', label: 'Дівчинка' },
  { value: 'boy', label: 'Хлопчик' },
  { value: 'unknown', label: 'Ще не знаю' },
];

function parseDueDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const date = parseISO(value);

  if (!isValid(date) || format(date, 'yyyy-MM-dd') !== value) {
    return null;
  }

  return date;
}

function getFormValues(user: User): ProfileFormValues {
  return {
    name: user.name ?? '',
    email: user.email ?? '',
    babyGender: user.babyGender ?? '',
    dueDate: user.dueDate?.slice(0, 10) ?? '',
  };
}

function SelectDropdownIndicator(
  props: DropdownIndicatorProps<GenderOption, false>
) {
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name={
          props.selectProps.menuIsOpen
            ? 'keyboard-arrow-up'
            : 'keyboard-arrow-down'
        }
        size={20}
        className={css.arrowIcon}
      />
    </components.DropdownIndicator>
  );
}

export default function ProfileEditForm() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  if (!user) {
    return null;
  }

  const initialValues = getFormValues(user);

  const today = startOfDay(new Date());
  const minDate = addWeeks(today, 1);
  const maxDate = addWeeks(today, 41);

  const minDateValue = format(minDate, 'yyyy-MM-dd');
  const maxDateValue = format(maxDate, 'yyyy-MM-dd');

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, 'Ім’я має містити щонайменше 2 символи')
      .max(32, 'Ім’я має містити не більше 32 символів')
      .required('Введіть ім’я'),

    babyGender: Yup.string()
      .oneOf(['girl', 'boy', 'unknown'], 'Оберіть стать дитини')
      .required('Оберіть стать дитини'),

    dueDate: Yup.string()
      .required('Оберіть планову дату пологів')
      .test(
        'valid-date',
        'Некоректна дата',
        value => !value || parseDueDate(value) !== null
      )
      .test(
        'date-range',
        'Дата має бути в межах від 1 до 41 тижня від сьогодні',
        value =>
          !value ||
          value === initialValues.dueDate ||
          (value >= minDateValue && value <= maxDateValue)
      ),
  });

  return (
    <Formik<ProfileFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        if (!values.babyGender) {
          actions.setFieldError('babyGender', 'Оберіть стать дитини');
          actions.setSubmitting(false);
          return;
        }

        if (!values.dueDate) {
          actions.setFieldError('dueDate', 'Оберіть планову дату пологів');
          actions.setSubmitting(false);
          return;
        }

        try {
          const updatedUser = await updateMe({
            name: values.name.trim(),
            babyGender: values.babyGender,
            ...(values.dueDate !== initialValues.dueDate && {
              dueDate: values.dueDate,
            }),
          });

          const currentUser = useAuthStore.getState().user;

          if (!currentUser || currentUser._id !== user._id) {
            return;
          }

          const savedUser = {
            ...currentUser,
            ...updatedUser,
          };

          setUser(savedUser);

          actions.resetForm({
            values: getFormValues(savedUser),
          });

          toast.success('Зміни успішно збережено');
        } catch (error) {
          toast.error(getErrorMessage(error));
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        resetForm,
        isSubmitting,
        dirty,
      }) => (
        <Form className={css.form} noValidate>
          <div className={css.fieldGroup}>
            <label htmlFor="name" className={css.label}>
              Ім’я
            </label>

            <Field
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              disabled={isSubmitting}
              aria-invalid={Boolean(touched.name && errors.name)}
              className={clsx(
                css.input,
                touched.name && errors.name && css.inputError
              )}
            />

            <ErrorMessage name="name" component="p" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="email" className={css.label}>
              Пошта
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              readOnly
              aria-readonly="true"
              className={clsx(css.input, css.readonlyInput)}
            />
          </div>

          <div className={css.fieldGroup}>
            <label htmlFor="babyGender" className={css.label}>
              Стать дитини
            </label>

            <Select<GenderOption, false>
              instanceId="profile-gender"
              inputId="babyGender"
              name="babyGender"
              options={genderOptions}
              value={
                genderOptions.find(
                  option => option.value === values.babyGender
                ) ?? null
              }
              onChange={option => {
                setFieldValue('babyGender', option?.value ?? '');
              }}
              onBlur={() => {
                setFieldTouched('babyGender', true);
              }}
              placeholder="Оберіть стать"
              isSearchable={false}
              isDisabled={isSubmitting}
              aria-invalid={Boolean(touched.babyGender && errors.babyGender)}
              unstyled
              className={clsx(
                css.select,
                touched.babyGender && errors.babyGender && css.selectError
              )}
              classNamePrefix="profileSelect"
              components={{
                DropdownIndicator: SelectDropdownIndicator,
                IndicatorSeparator: null,
              }}
            />

            <ErrorMessage
              name="babyGender"
              component="p"
              className={css.error}
            />
          </div>

          <DatePickerField
            id="dueDate"
            label="Планова дата пологів"
            value={parseDueDate(values.dueDate)}
            onChange={date => {
              setFieldValue('dueDate', date ? format(date, 'yyyy-MM-dd') : '');

              setFieldTouched('dueDate', true, false);
            }}
            onBlur={() => {
              setFieldTouched('dueDate', true);
            }}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="Оберіть дату"
            error={touched.dueDate ? errors.dueDate : undefined}
            disabled={isSubmitting}
          />

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => resetForm()}
              disabled={!dirty || isSubmitting}
            >
              Відмінити зміни
            </button>

            <button
              type="submit"
              className={css.saveButton}
              disabled={!dirty || isSubmitting}
            >
              {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
            </button>
          </div>

          {isSubmitting && <Loader fullScreen />}
        </Form>
      )}
    </Formik>
  );
}
