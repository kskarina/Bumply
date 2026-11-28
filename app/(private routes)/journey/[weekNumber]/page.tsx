import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import WeekSelector from '@/components/WeekSelector/WeekSelector';

import { Metadata } from 'next';
import css from './JourneyPage.module.css';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { weekNumber } = await params;
  return {
    title: `Подорож - ${weekNumber} тиждень - Лелека`,
    description: `Як розвивається малюк на ${weekNumber} тижні вагітності, які відчуття та зміни очікувати у тілі мами, а також поради для вашого комфорту.`,
    openGraph: {
      title: `Подорож - ${weekNumber} тиждень - Лелека`,
      description: `Як розвивається малюк на ${weekNumber} тижні вагітності, які відчуття та зміни очікувати у тілі мами, а також поради для вашого комфорту.`,
      url: `/journey/${weekNumber}`,
      siteName: 'Лелека',
      locale: 'uk_UA',
      type: 'website',
      images: [
        {
          url: '/images/openGraph.jpeg',
          width: 1424,
          height: 752,
          alt: 'Лелека: подорож вагітністю',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Подорож - ${weekNumber} тиждень - Лелека`,
      description: `Як розвивається малюк на ${weekNumber} тижні вагітності, які відчуття та зміни очікувати у тілі мами, а також поради для вашого комфорту.`,
      images: ['/images/openGraph.jpeg'],
    },
  };
}

const JourneyPage = async ({ params }: Props) => {
  const { weekNumber } = await params;

  return (
    <div className={css.journey}>
      <GreetingBlock />
      <WeekSelector weekNumber={Number(weekNumber)} />
      <JourneyDetails weekNumber={Number(weekNumber)} />
    </div>
  );
};

export default JourneyPage;
