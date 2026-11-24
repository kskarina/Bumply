import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import 'modern-normalize';
import './globals.css';

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Лелека — щоденний помічник для майбутніх мам',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
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
