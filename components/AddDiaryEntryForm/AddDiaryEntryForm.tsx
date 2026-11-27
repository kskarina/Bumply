'use client';

import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import css from './AddDiaryEntryForm.module.css';
import { DiaryNoteData } from '@/types/diary';
import MultiSelect from '../MultiSelect/MultiSelect';

const emotionOptions: SelectOption[] = [
  { value: 'inspiration', label: 'Натхнення' },
  { value: 'gratitude', label: 'Вдячність' },
  { value: 'anxiety', label: 'Тривога' },
  { value: 'baby', label: 'Дані дитини' },
  { value: 'hope', label: 'Надія' },
];

interface AddDiaryEntryFormProps {
  onSuccess: () => void;
}

// обмеження з документації бекенду: назва 1–96 символів, дата не в минулому
const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(1, 'Назва має містити не менше 1 символа')
    .max(64, 'Назва має містити не більше 64 символи')
    .required('Введіть назву запису'),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Оберіть хоча б одну категорію')
    .required(),
});

const initialValues: DiaryNoteData = {
  title: '',
  emotions: [],
  description: '',
};

export default function AddDiaryEntryForm({
  onSuccess,
}: AddDiaryEntryFormProps) {
  const handleSubmit = (
    values: DiaryNoteData,
    actions: FormikHelpers<DiaryNoteData>
  ) => {
    console.log('Diary entry data:', values);
    onSuccess();
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <label>
            <Field name="title" className={css.field} />
          </label>
          <label>
            <MultiSelect
              name="emotions"
              options={emotionOptions}
              placeholder="Оберіть категорію"
            />
          </label>
          <ErrorMessage
            name="emotions"
            component="span"
            className={css.error}
          />
          <label>
            <Field as="textarea" name="description" className={css.field} />
          </label>
          <button type="submit" className={css.btn}>
            Зберегти
          </button>
        </Form>
      </Formik>
    </>
  );
}
