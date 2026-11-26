import { WeekBaby } from '@/types/week';
import Image from 'next/image';
import css from './BabyDetails.module.css';
import Icon from '../Icon/Icon';

interface BabyDetailsProps {
  baby: WeekBaby;
}

export default function BabyDetails({ baby }: BabyDetailsProps) {
  return (
    <div className={css.infoWrapper}>
      <Image
        src={baby.image}
        width={287}
        height={379}
        alt={baby.analogy}
        className={css.babyImg}
        priority
      />

      <p className={css.babyTitle}>{baby.analogy}</p>

      {baby.description.map((descr, index) => (
        <p key={index} className={css.babyDescription}>
          {descr}
        </p>
      ))}

      <div className={css.babyFact}>
        <p className={css.babyFactTitle}>
          <Icon name="star-shine" />
          Цікавий факт тижня
        </p>
        <p className={css.babyFactDescr}>{baby.interestingFact}</p>
      </div>
    </div>
  );
}
