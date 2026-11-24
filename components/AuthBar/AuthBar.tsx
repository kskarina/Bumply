import Link from 'next/link';
import css from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <ul className={css.authBar}>
      <li>
        <Link href="/auth/login" className={css.link}>
          Увійти
        </Link>
      </li>
      <li>
        <Link href="/auth/register" className={css.linkAccent}>
          Зареєструватися
        </Link>
      </li>
    </ul>
  );
}
