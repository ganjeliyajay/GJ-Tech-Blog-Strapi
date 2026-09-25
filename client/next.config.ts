import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gj-tech-blog-strapi.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts")

export default withNextIntl(nextConfig)
