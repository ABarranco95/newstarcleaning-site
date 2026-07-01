import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/cleaning-services-sanger",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-selma",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-kingsburg",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-reedley",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-visalia",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-tulare",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-hanford",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/cleaning-services-lemoore",
        destination: "/service-areas",
        permanent: true,
      },
      {
        source: "/blog/move-out-cleaning-checklist-get-your-deposit-back",
        destination: "/blog/move-out-cleaning-checklist-before-inspection",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
