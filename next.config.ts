import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Use this project as root so Next doesn't infer parent directory (multiple lockfiles)
  outputFileTracingRoot: path.join(process.cwd()),
  turbopack: { root: path.join(process.cwd()) },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
