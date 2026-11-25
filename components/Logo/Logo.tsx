import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export default function Logo({ onClick, className }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={className} aria-label="Лелека — на головну">
      <Image
        src="/logo.svg"
        alt="Лелека"
        width={84}
        height={36}
        priority
        style={{ width: 84, height: 'auto' }}
      />
    </Link>
  );
}
