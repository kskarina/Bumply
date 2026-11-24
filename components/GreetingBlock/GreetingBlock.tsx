import css from './GreetingBlock.module.css';

// TODO: Привітання користувача (ім'я з бекенду). Деталі — у ТЗ та макеті
export default function GreetingBlock() {
  return (
    <section className={css.greetingBlock}>
      <h2>GreetingBlock</h2>
    </section>
  );
}
