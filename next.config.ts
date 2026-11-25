import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // корінь проєкту — ця папка (щоб Next.js не підхоплював чужі package-lock.json вище по дереву)
  outputFileTracingRoot: process.cwd(),
  images: {
    // картинки тижнів і аватари приходять з бекенду (зовнішні посилання)
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
