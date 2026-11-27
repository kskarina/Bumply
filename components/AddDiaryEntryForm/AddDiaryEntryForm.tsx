'use client';

import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import css from './AddDiaryEntryForm.module.css';
import { DiaryNoteData } from '@/types/diary';
import MultiSelect from '../MultiSelect/MultiSelect';
import { createDiaryNote, fetchEmotions } from '@/lib/api/clientApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Emotion } from '@/types/emotion';

interface AddDiaryEntryFormProps {
  onSuccess: () => void;
}

// обмеження з документації бекенду: назва 1–96 символів, дата не в минулому
const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(64, 'Назва має містити не більше 64 символи')
    .required('Введіть назву запису'),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Оберіть хоча б одну категорію')
    .required('Виберть категорію'),
  description: Yup.string()
    .trim()
    .max(1000, 'Опис має містити не більше 1000 символів')
    .required('Введіть опис запису'),
});

const initialValues: DiaryNoteData = {
  title: '',
  emotions: [],
  description: '',
};

export default function AddDiaryEntryForm({
  onSuccess,
}: AddDiaryEntryFormProps) {
  const queryClient = useQueryClient();

  const {
    data,
    isError,
    isPending: isPendingEmotion,
    error,
  } = useQuery({
    queryKey: ['emotions'],
    queryFn: () => fetchEmotions({ limit: 10 }),
    staleTime: 1000 * 60 * 60,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: DiaryNoteData) => createDiaryNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaryEntries'] });
      onSuccess();
    },
    onError: error => toast.error(getErrorMessage(error)),
  });

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error), { id: 'tasks' });
    }
  }, [isError, error]);

  // const handleSubmit = (
  //   values: DiaryNoteData,
  //   actions: FormikHelpers<DiaryNoteData>
  // ) => {
  //   onSuccess();
  //   actions.resetForm();
  // };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={mutate}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <label>
            Заголовок
            <Field name="title" className={css.field} />
          </label>
          <ErrorMessage name="title" component="span" className={css.error} />
          <label>
            Категорії
            <MultiSelect<Emotion>
              name="emotions"
              valueKey="_id"
              labelKey="title"
              options={data?.emotions || []}
              placeholder="Оберіть категорію"
            />
          </label>
          <ErrorMessage
            name="emotions"
            component="span"
            className={css.error}
          />
          <label>
            Запис
            <Field as="textarea" name="description" className={css.field} />
          </label>
          <ErrorMessage
            name="description"
            component="span"
            className={css.error}
          />
          <button type="submit" className={css.btn}>
            Зберегти
          </button>
          {(isPending || isPendingEmotion) && <Loader fullScreen />}
        </Form>
      </Formik>
    </>
  );
}
