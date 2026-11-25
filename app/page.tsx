import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';

import css from './DashboardPage.module.css';

// "Мій день" — головний екран (дашборд), доступний і без авторизації
const DashboardPage = () => {
  return (
    <div className={css.dashboard}>
      <GreetingBlock />
      <StatusBlock />
      <BabyTodayCard />
      <MomTipCard />
      <TasksReminderCard />
      <FeelingCheckCard />
    </div>
  );
};

export default DashboardPage;
