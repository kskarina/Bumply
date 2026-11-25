import css from './Loader.module.css';

export default function Loader({
  fullScreen = false,
}: {
  fullScreen?: boolean;
}) {
  return (
    <div className={fullScreen ? css.fullScreen : css.wrapper} role="status">
      <span className={css.spinner} />
      <span className="visually-hidden">Завантаження...</span>
    </div>
  );
}
