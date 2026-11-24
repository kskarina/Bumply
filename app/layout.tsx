import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import 'modern-normalize';
import './globals.css';

// Lato 2.0 підключений локально: у Google Fonts немає кирилиці і жирностей 500/600
const lato = localFont({
  src: [
    { path: './fonts/Lato-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Lato-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Lato-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Lato-Bold.woff2', weight: '700', style: 'normal' },
  ],
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
