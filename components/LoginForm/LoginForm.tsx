'use client';
import css from './LoginForm.module.css';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { useId, useState } from 'react';
import { login, LoginRequest } from '@/lib/api/clientApi';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export type ApiError = AxiosError<{ error: string }>;

const RegistrationFormSchema = Yup.object().shape({
  email: Yup.string()
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
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: LoginRequest,
    actions: FormikHelpers<LoginRequest>
  ) => {
    try {
      const user = await login(values);
      if (user) {
        setUser(user);
        router.push('/journey');
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
    <section className={css.loginForm}>
      <h2>Вхід</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegistrationFormSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              className={css.field}
              placeholder="Пошта"
            />
            <div className={css.error}>
              <ErrorMessage name="email" component="span" />
            </div>
          </label>
          <label className={css.label}>
            <Field
              type="password"
              name="password"
              id={`${fieldId}-password`}
              className={css.field}
              placeholder="Пароль"
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
            Увійти
          </button>
          {error && <p>{error}</p>}
        </Form>
      </Formik>
    </section>
  );
}
