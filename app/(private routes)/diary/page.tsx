import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

import css from './DiaryPage.module.css';

const DiaryPage = () => {
  return (
    <div className={css.diary}>
      <GreetingBlock />
      <div className={css.diaryBlocks}>
        <div className={css.diaryList}>
          <DiaryList />
        </div>
        <div className={css.diaryDetails}>
          <DiaryEntryDetails />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
