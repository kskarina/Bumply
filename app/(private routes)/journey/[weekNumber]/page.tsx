import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';

import css from './JourneyPage.module.css';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

const JourneyPage = async ({ params }: Props) => {
  const { weekNumber } = await params;

  return (
    <div className={css.journey}>
      <GreetingBlock />
      <WeekSelector />
      {/* weekNumber передати в WeekSelector і JourneyDetails, коли вони будуть готові */}
      <p className="visually-hidden">Тиждень {weekNumber}</p>
      <JourneyDetails />
    </div>
  );
};

export default JourneyPage;
