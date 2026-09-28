import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts")

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "gj-tech-blog-strapi.onrender.com",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
}

export default withNextIntl(nextConfig)