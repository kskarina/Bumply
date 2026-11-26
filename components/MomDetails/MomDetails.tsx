import { WeekMom } from '@/types/week';
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';
import css from './MomDetails.module.css';

interface MomDetailsProps {
  mom: WeekMom;
}

export default function MomDetails({ mom }: MomDetailsProps) {
  const icons = ['fork-spoon', 'fitness-center', 'chair'];

  return (
    <>
      <div className={css.infoWrapper}>
        <h3 className={css.title}>Як ви можете почуватись</h3>
        <ul className={css.feelList}>
          {mom.feelings.states.map((feel, index) => (
            <li className={css.feelItem} key={index}>
              {feel}
            </li>
          ))}
        </ul>
        <p className={css.text}>{mom.feelings.sensationDescr}</p>
      </div>
      <div className={css.infoWrapper}>
        <h3 className={css.title}>Поради для вашого комфорту</h3>
        <ul className={css.adviceList}>
          {mom.comfortTips.map(({ category, tip }, index) => (
            <li key={index} className={css.adviceItem}>
              <svg width={24} height={24} className={css.icon}>
                <use href={`/sprite.svg#${icons[index]}`} />
              </svg>
              <div>
                <h4 className={css.adviceTitle}>{category}</h4>
                <p className={css.text}>{tip}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TasksReminderCard />
    </>
  );
}
