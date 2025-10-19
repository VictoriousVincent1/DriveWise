import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  eslint: {
    // Avoid failing the build on ESLint config/environment issues
    ignoreDuringBuilds: true,
  },
  // Help Next resolve traced files correctly in a multi-lockfile workspace
  outputFileTracingRoot: path.join(__dirname, '..'),
};

export default nextConfig;
