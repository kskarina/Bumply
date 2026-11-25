import Link from 'next/link';
import css from './AuthBar.module.css';

// Як у макеті: спершу основна кнопка "Зареєструватися", під нею — "Увійти"
export default function AuthBar() {
  return (
    <ul className={css.authBar}>
      <li>
        <Link href="/auth/register" className={css.primary}>
          Зареєструватися
        </Link>
      </li>
      <li>
        <Link href="/auth/login" className={css.secondary}>
          Увійти
        </Link>
      </li>
    </ul>
  );
}
