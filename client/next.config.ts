import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts")

const nextConfig = {
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
        hostname: "gj-tech-blog-strapi-db.onrender.com",
        pathname: "/uploads/**",
      },
    ],

    // Only for local development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
}

export default withNextIntl(nextConfig)
