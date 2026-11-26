'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { createTask } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import DatePicker, { toDateString } from '@/components/DatePicker/DatePicker';
import Loader from '@/components/Loader/Loader';
import type { TaskData } from '@/types/task';
import css from './AddTaskForm.module.css';

interface AddTaskFormProps {
  onSuccess: () => void;
}

// обмеження з документації бекенду: назва 1–96 символів, дата не в минулому
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(96, 'Назва має містити не більше 96 символів')
    .required('Введіть назву завдання'),
  date: Yup.string()
    .required('Оберіть дату')
    .test(
      'notPast',
      'Дата не може бути в минулому',
      value => !value || value >= toDateString(new Date())
    ),
});

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const queryClient = useQueryClient();
  const today = toDateString(new Date());

  const { mutate, isPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // оновлюємо список у TasksReminderCard
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess();
    },
    onError: error => toast.error(getErrorMessage(error)),
  });

  const initialValues: TaskData = {
    name: '',
    date: today,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => mutate({ ...values, name: values.name.trim() })}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <Form className={css.form} noValidate>
          <div className={css.field}>
            <label htmlFor="taskName" className={css.label}>
              Назва завдання
            </label>
            <Field
              id="taskName"
              name="name"
              type="text"
              placeholder="Прийняти вітаміни"
              className={clsx(
                css.input,
                touched.name && errors.name && css.inputError
              )}
            />
            <ErrorMessage
              name="name"
              component="p"
              className={css.errorText}
            />
          </div>

          <div className={css.field}>
            <label htmlFor="taskDate" className={css.label}>
              Дата
            </label>
            <DatePicker
              id="taskDate"
              value={values.date}
              minDate={today}
              hasError={Boolean(touched.date && errors.date)}
              onChange={date => {
                setFieldTouched('date', true, false);
                setFieldValue('date', date);
              }}
            />
            <ErrorMessage
              name="date"
              component="p"
              className={css.errorText}
            />
          </div>

          <button type="submit" className={css.submitBtn} disabled={isPending}>
            Зберегти
          </button>

          {isPending && <Loader fullScreen />}
        </Form>
      )}
    </Formik>
  );
}
