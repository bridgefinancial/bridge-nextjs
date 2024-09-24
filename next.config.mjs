/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose", // or 'true' depending on your setup
  },
  redirects: async () => {
    return [
      {
        source: "/survey",
        destination: "/valuation-estimate",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
