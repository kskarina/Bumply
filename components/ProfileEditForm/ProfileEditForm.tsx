'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import clsx from 'clsx';

import { updateMe } from '@/lib/api/clientApi';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '@/components/Loader/Loader';

import css from './ProfileEditForm.module.css';

interface ProfileFormValues {
  name: string;
  email: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Ім’я має містити щонайменше 2 символи')
    .max(32, 'Ім’я має містити не більше 32 символів')
    .required('Введіть ім’я'),
});

export default function ProfileEditForm() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  if (!user) {
    return null;
  }

  const initialValues: ProfileFormValues = {
    name: user.name ?? '',
    email: user.email ?? '',
  };

  return (
    <Formik<ProfileFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          const updatedUser = await updateMe({
            name: values.name.trim(),
          });

          const currentUser = useAuthStore.getState().user;

          if (!currentUser || currentUser._id !== user._id) {
            return;
          }

          setUser({
            ...currentUser,
            ...updatedUser,
          });

          actions.resetForm({
            values: {
              name: updatedUser.name,
              email: currentUser.email,
            },
          });

          toast.success('Зміни успішно збережено');
        } catch (error) {
          toast.error(getErrorMessage(error));
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, resetForm, isSubmitting, dirty }) => (
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
              className={css.input}
            />
          </div>

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
