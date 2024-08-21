/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        esmExternals: 'loose', // or 'true' depending on your setup
      },
};

export default nextConfig;
