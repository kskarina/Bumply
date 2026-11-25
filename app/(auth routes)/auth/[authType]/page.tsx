import { notFound } from 'next/navigation';
import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

import css from './AuthPage.module.css';

type Props = {
  params: Promise<{ authType: string }>;
};

const AuthPage = async ({ params }: Props) => {
  const { authType } = await params;

  if (authType !== 'login' && authType !== 'register') {
    notFound();
  }

  return (
    <div className={css.authPage}>
      {authType === 'login' ? <LoginForm /> : <RegistrationForm />}
    </div>
  );
};

export default AuthPage;
