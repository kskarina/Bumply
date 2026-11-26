'use client';

import { useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';
import { getMe, register, RegisterRequest } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import css from './RegistrationForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Ім’я має містити щонайменше 2 символи.')
    .max(32, 'Ім’я має містити не більше 32 символів.')
    .required('Ім’я обов’язкове.'),
  email: Yup.string()
    .trim()
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
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  const handleSubmit = async (values: RegisterRequest) => {
    try {
      await register({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
      });
      const user = await getMe();
      setUser(user);
      router.push('/profile/edit');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className={css.registrationForm}>
      <h1 className={css.title}>Реєстрація</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form} noValidate>
            <div className={css.field}>
              <label htmlFor={`${fieldId}-name`} className={css.label}>
                Ім’я*
              </label>
              <Field
                id={`${fieldId}-name`}
                name="name"
                type="text"
                placeholder="Ваше ім’я"
                autoComplete="name"
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
              <label htmlFor={`${fieldId}-email`} className={css.label}>
                Пошта*
              </label>
              <Field
                id={`${fieldId}-email`}
                name="email"
                type="email"
                placeholder="hello@leleka.com"
                autoComplete="email"
                className={clsx(
                  css.input,
                  touched.email && errors.email && css.inputError
                )}
              />
              <ErrorMessage
                name="email"
                component="p"
                className={css.errorText}
              />
            </div>

            <div className={css.field}>
              <label htmlFor={`${fieldId}-password`} className={css.label}>
                Пароль*
              </label>
              <Field
                id={`${fieldId}-password`}
                name="password"
                type="password"
                placeholder="********"
                autoComplete="new-password"
                className={clsx(
                  css.input,
                  touched.password && errors.password && css.inputError
                )}
              />
              <ErrorMessage
                name="password"
                component="p"
                className={css.errorText}
              />
            </div>

            <button
              type="submit"
              className={css.button}
              disabled={isSubmitting}
            >
              Зареєструватись
            </button>

            <p className={css.switch}>
              Вже маєте аккаунт?{' '}
              <Link href="/auth/login" className={css.link}>
                Увійти
              </Link>
            </p>

            {isSubmitting && <Loader fullScreen />}
          </Form>
        )}
      </Formik>
    </section>
  );
}
