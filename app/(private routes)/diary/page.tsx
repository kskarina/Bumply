import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

import css from './DiaryPage.module.css';

// На десктопі — список і деталі поруч, на мобілці/планшеті тут тільки список
const DiaryPage = () => {
  return (
    <div className={css.diary}>
      <GreetingBlock />
      <DiaryList />
      <DiaryEntryDetails />
    </div>
  );
};

export default DiaryPage;
