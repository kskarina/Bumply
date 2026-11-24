import css from './layout.module.css';

// Сторінки входу, реєстрації та онбордингу — без сайдбару і хлібних крихт
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className={css.authMain}>{children}</main>;
}
