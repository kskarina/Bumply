'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import { useAuthStore } from '@/lib/store/authStore';
import css from './FeelingCheckCard.module.css';

export default function FeelingCheckCard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <section className={css.feelingCheckCard}>
      <div className={css.text}>
        <h2 className={css.title}>Як ви себе почуваєте?</h2>
        <div>
          <p className={css.label}>Рекомендація на сьогодні:</p>
          <p className={css.recommendation}>
            Занотуйте незвичні відчуття у тілі.
          </p>
        </div>
      </div>

      <button type="button" className={css.button} onClick={handleClick}>
        Зробити запис у щоденник
      </button>

      {/* TODO: передати onClose, коли AddDiaryEntryModal буде готова */}
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
