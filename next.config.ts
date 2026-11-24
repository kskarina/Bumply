import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // картинки тижнів і аватари приходять з бекенду (зовнішні посилання)
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
