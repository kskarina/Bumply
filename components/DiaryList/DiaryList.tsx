import Icon from '../Icon/Icon';
import css from './DiaryList.module.css';

// TODO: Список записів щоденника. Деталі — у ТЗ та макеті
export default function DiaryList() {
  return (
    <section className={css.diaryList}>
      <h2>Ваші записи</h2>{' '}
      <button className={css.btn}>
        Новий запис <Icon name="add-circle" />
      </button>
    </section>
  );
}
