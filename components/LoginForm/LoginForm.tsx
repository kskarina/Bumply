'use client';

import { useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import css from './LoginForm.module.css';

const validationSchema = Yup.object({
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

const initialValues: LoginRequest = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);

  const handleSubmit = async (values: LoginRequest) => {
    try {
      const user = await login({ ...values, email: values.email.trim() });
      setUser(user);
      router.push('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className={css.loginForm}>
      <h1 className={css.title}>Вхід</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form} noValidate>
            <div className={css.field}>
              <Field
                id={`${fieldId}-email`}
                name="email"
                type="email"
                placeholder="Пошта"
                aria-label="Пошта"
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
              <Field
                id={`${fieldId}-password`}
                name="password"
                type="password"
                placeholder="Пароль"
                aria-label="Пароль"
                autoComplete="current-password"
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
              Увійти
            </button>

            <p className={css.switch}>
              Немає аккаунту?{' '}
              <Link href="/auth/register" className={css.link}>
                Зареєструватися
              </Link>
            </p>

            {isSubmitting && <Loader fullScreen />}
          </Form>
        )}
      </Formik>
    </section>
  );
}
