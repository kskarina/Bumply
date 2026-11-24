import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

// На десктопі — список і деталі поруч, на мобілці/планшеті тут тільки список
export default function DiaryPage() {
  return (
    <div>
      <GreetingBlock />
      <DiaryList />
      <DiaryEntryDetails />
    </div>
  );
}
