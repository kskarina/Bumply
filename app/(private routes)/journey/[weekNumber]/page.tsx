import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import WeekSelector from '@/components/WeekSelector/WeekSelector';

import css from './JourneyPage.module.css';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

const JourneyPage = async ({ params }: Props) => {
  const { weekNumber } = await params;

  return (
    <div className={css.journey}>
      <GreetingBlock />
      <WeekSelector weekNumber={Number(weekNumber)} />
      {/* weekNumber передати в WeekSelector і JourneyDetails, коли вони будуть готові */}
      <p className="visually-hidden">Тиждень {weekNumber}</p>
      <JourneyDetails weekNumber={Number(weekNumber)} />
    </div>
  );
};

export default JourneyPage;
