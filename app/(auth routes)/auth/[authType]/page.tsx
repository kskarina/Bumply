import { notFound } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/components/Logo/Logo';
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

  const isLogin = authType === 'login';

  return (
    <div className={css.authPage}>
      <div className={css.column}>
        <header className={css.header}>
          <Logo size="lg" />
        </header>
        <div className={css.content}>
          {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
      </div>

      <div className={css.imageWrapper}>
        <Image
          src={
            isLogin ? '/images/auth-login.webp' : '/images/auth-register.webp'
          }
          alt=""
          fill
          sizes="50vw"
          className={css.image}
        />
      </div>
    </div>
  );
};

export default AuthPage;
