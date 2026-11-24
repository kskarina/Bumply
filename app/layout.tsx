import type { Metadata } from 'next';
import { Comfortaa, Lato } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import 'modern-normalize';
import './globals.css';

// шрифти з макету
// у Google Fonts Lato має тільки 400 і 700 (без 500/600) і не має кирилиці
const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const comfortaa = Comfortaa({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  variable: '--font-comfortaa',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Лелека — щоденний помічник для майбутніх мам',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${lato.variable} ${comfortaa.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
        <Toaster position="top-right" />
        <div id="modal-root" />
      </body>
    </html>
  );
}
