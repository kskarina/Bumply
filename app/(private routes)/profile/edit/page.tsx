import type { Metadata } from 'next';
import Image from 'next/image';
import Logo from '@/components/Logo/Logo';
import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';

import css from './OnboardingPage.module.css';

export const metadata: Metadata = {
  title: 'Знайомство - Лелека',
};

// Онбординг одразу після реєстрації (без меню і хлібних крихт)
const OnboardingPage = () => {
  return (
    <main className={css.page}>
      <div className={css.column}>
        <div className={css.navbar}>
          <Logo size="lg" />
        </div>

        <div className={css.content}>
          <h1 className={css.title}>Давайте познайомимось ближче</h1>
          <OnboardingForm />
        </div>
      </div>

      <div className={css.imageWrapper}>
        <Image
          src="/images/onboarding.webp"
          alt=""
          fill
          sizes="50vw"
          className={css.image}
          priority
        />
      </div>
    </main>
  );
};

export default OnboardingPage;
