import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  // у хедері (мобілка/планшет) логотип менший, ніж у сайдбарі
  size?: 'sm' | 'lg';
}

const sizes = {
  sm: { width: 84, height: 36 },
  lg: { width: 105, height: 45 },
};

export default function Logo({ onClick, className, size = 'sm' }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <Link href="/" onClick={onClick} className={className} aria-label="Лелека — на головну">
      <Image
        src="/logo.svg"
        alt="Лелека"
        width={width}
        height={height}
        priority
        style={{ width, height: 'auto' }}
      />
    </Link>
  );
}
