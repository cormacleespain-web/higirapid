import type { MetadataRoute } from "next";

const DEFAULT_BASE_URL = "https://higirapid.es";

function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim() || DEFAULT_BASE_URL;
  return configured.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
