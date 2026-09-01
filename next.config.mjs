/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    // Earlier route names, kept working so no existing link breaks.
    return [
      { source: '/directory', destination: '/find-help', permanent: true },
      { source: '/directory/what-to-ask', destination: '/find-help/what-to-ask', permanent: true },
      { source: '/providers', destination: '/for-providers', permanent: true },
    ];
  },
};

export default nextConfig;
