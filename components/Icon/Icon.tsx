export type IconName =
  | 'account-circle'
  | 'add-circle'
  | 'book-2'
  | 'chair'
  | 'chevron-right'
  | 'close'
  | 'conversion-path'
  | 'delete-forever'
  | 'edit-square'
  | 'fitness-center'
  | 'fork-spoon'
  | 'google'
  | 'keyboard-arrow-down'
  | 'keyboard-arrow-up'
  | 'logout'
  | 'menu'
  | 'star-shine'
  | 'today';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

// Іконки беруться зі спрайту public/sprite.svg.
// Колір задається через CSS-властивість color (fill = currentColor).
export default function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
