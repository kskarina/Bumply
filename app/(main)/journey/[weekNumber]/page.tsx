import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ weekNumber: string }>;
}) {
  const { weekNumber } = await params;

  return (
    <div>
      <GreetingBlock />
      <WeekSelector />
      {/* weekNumber передати в WeekSelector і JourneyDetails, коли вони будуть готові */}
      <p className="visually-hidden">Тиждень {weekNumber}</p>
      <JourneyDetails />
    </div>
  );
}
