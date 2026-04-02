import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid webpack emitting broken `vendor-chunks/*.js` references on some dev builds (RSC / server paths).
  // Note: do not list `lucide-react` here — Next adds it via optimizePackageImports → transpilePackages and build will error.
  serverExternalPackages: ["drizzle-orm", "@neondatabase/serverless"],
  // Skip ESLint during Vercel build (run `npm run lint` locally)
  eslint: { ignoreDuringBuilds: true },
  // Use this project as root so Next doesn't infer parent directory (multiple lockfiles)
  outputFileTracingRoot: path.join(process.cwd()),
  turbopack: { root: path.join(process.cwd()) },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
