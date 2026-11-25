'use client';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import css from './RegistrationForm.module.css';
import { useId, useState } from 'react';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Ім’я має містити щонайменше 2 символи.')
    .max(32, 'Ім’я має містити не більше 32 символів.')
    .required('Ім’я обов’язкове.'),
  email: Yup.string()
    .email('Неправильний формат електронної пошти.')
    .max(64, 'Пошта має містити не більше 64 символів.')
    .required('Пошта обов’язкова.'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів.')
    .max(64, 'Пароль має містити не більше 64 символів.')
    .required('Пароль обов’язковий.'),
});

const initialValues: RegisterRequest = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationForm() {
  const fieldId = useId();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterRequest,
    actions: FormikHelpers<RegisterRequest>
  ) => {
    try {
      const res = await register(values);
      if (res) {
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
      actions.resetForm();
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <section className={css.registrationForm}>
      <h2>Реєстрація</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegistrationFormSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>
              Ім’я<sup>*</sup>
            </span>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              className={css.field}
            />
            <div className={css.error}>
              <ErrorMessage name="name" component="span" />
            </div>
          </label>
          <label className={css.label}>
            <span>
              Пошта<sup>*</sup>
            </span>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.field}
            />
            <div className={css.error}>
              <ErrorMessage name="email" component="span" />
            </div>
          </label>
          <label className={css.label}>
            <span>
              Пароль<sup>*</sup>
            </span>
            <Field
              type="password"
              name="password"
              id={`${fieldId}-password`}
              className={css.field}
            />
            <div className={css.error}>
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </div>
          </label>
          <button type="submit" className={css.button}>
            Зареєструватись
          </button>
          {error && <p>{error}</p>}
        </Form>
      </Formik>
    </section>
  );
}
