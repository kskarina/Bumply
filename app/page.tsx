import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import BabyTodayCard from '@/components/BabyTodayCard/BabyTodayCard';
import MomTipCard from '@/components/MomTipCard/MomTipCard';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/components/FeelingCheckCard/FeelingCheckCard';

import css from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={css.dashboard}>
      <GreetingBlock />
      <div className={css.content}>
        <div className={css.leftColumn}>
          <StatusBlock />
          <div className={css.babyAndTip}>
            <BabyTodayCard />
            <MomTipCard />
          </div>
        </div>
        <div className={css.rightColumn}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
