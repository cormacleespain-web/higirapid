import { Link } from "@/i18n/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { getSiteOrigin } from "@/lib/seo/site-url";

export type BreadcrumbItem = { label: string; path: string };

type Props = {
  locale: string;
  items: BreadcrumbItem[];
};

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export default function Breadcrumb({ locale, items }: Props) {
  const base = getSiteOrigin();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const path = normalizePath(item.path);
      const absolute =
        path === "/" ? `${base}/${locale}` : `${base}/${locale}${path}`;
      return {
        "@type": "ListItem" as const,
        position: i + 1,
        name: item.label,
        item: absolute,
      };
    }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-content-secondary">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, i) => {
            const path = normalizePath(item.path);
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.path}-${i}`} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden>/</span> : null}
                {isLast ? (
                  <span className="text-content-primary font-medium">{item.label}</span>
                ) : (
                  <Link href={path} className="text-primary hover:underline">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
