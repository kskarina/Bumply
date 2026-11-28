'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import css from './AddDiaryEntryForm.module.css';
import { DiaryNote, DiaryNoteData } from '@/types/diary';
import MultiSelect from '../MultiSelect/MultiSelect';
import {
  createDiaryNote,
  fetchEmotions,
  updateDiaryNote,
} from '@/lib/api/clientApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { getErrorMessage } from '@/lib/api/getErrorMessage';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Emotion } from '@/types/emotion';

interface AddDiaryEntryFormProps {
  onSuccess: () => void;
  editEntry?: DiaryNote;
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

export default function AddDiaryEntryForm({
  onSuccess,
  editEntry,
}: AddDiaryEntryFormProps) {
  const initialValues: DiaryNoteData = {
    title: editEntry?.title ?? '',
    emotions: editEntry?.emotions.map(item => item._id) ?? [],
    description: editEntry?.description ?? '',
  };

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

  const mutationFn = editEntry
    ? (data: DiaryNoteData) => updateDiaryNote(editEntry._id, data)
    : (data: DiaryNoteData) => createDiaryNote(data);

  const { mutate, isPending } = useMutation({
    mutationFn,
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={mutate}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <label>
          Заголовок
          <Field
            name="title"
            className={css.field}
            placeholder="Введіть заголовок запису"
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </label>

        <label>
          Категорії
          <MultiSelect<Emotion>
            name="emotions"
            valueKey="_id"
            labelKey="title"
            options={data?.emotions || []}
            placeholder="Оберіть категорію"
          />
          <ErrorMessage
            name="emotions"
            component="span"
            className={css.error}
          />
        </label>

        <label>
          Запис
          <Field
            as="textarea"
            name="description"
            className={css.field}
            placeholder="Запишіть, як ви себе відчуваєте"
          />
          <ErrorMessage
            name="description"
            component="span"
            className={css.error}
          />
        </label>

        <button
          type="submit"
          className={css.btn}
          disabled={isPending || isPendingEmotion}
        >
          Зберегти
        </button>
        {(isPending || isPendingEmotion) && <Loader fullScreen />}
      </Form>
    </Formik>
  );
}
