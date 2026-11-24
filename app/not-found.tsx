import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: 32, textAlign: 'center' }}>
      <h1>Сторінку не знайдено</h1>
      <p style={{ marginTop: 16 }}>
        <Link href="/">Повернутися на головну</Link>
      </p>
    </main>
  );
}
