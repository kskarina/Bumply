import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';

import css from './OnboardingPage.module.css';

// Онбординг одразу після реєстрації (без меню і хлібних крихт)
const OnboardingPage = () => {
  return (
    <main className={css.onboarding}>
      <OnboardingForm />
    </main>
  );
};

export default OnboardingPage;
