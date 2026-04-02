"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { ServiceCardDTO } from "@/lib/site-data";
import { ServiceIconGlyph } from "@/components/ui/ServiceIconGlyph";
import { Link } from "@/i18n/navigation";
import { getContactHref } from "@/lib/whatsapp";
import ServiceBookingOverlay from "@/components/services/ServiceBookingOverlay";
import { ServicePriceInline } from "@/components/services/ServicePriceDisplay";

const serviceColors = ["primary", "accent", "secondary"] as const;

function resolveIconKey(raw: string): string {
  return raw?.trim() || "upholstery";
}

function chipClasses(colorName: (typeof serviceColors)[number]) {
  const bgClass =
    colorName === "primary"
      ? "bg-primary/10"
      : colorName === "accent"
        ? "bg-accent/10"
        : "bg-secondary/10";
  const fillClass =
    colorName === "primary"
      ? "text-primary"
      : colorName === "accent"
        ? "text-accent"
        : "text-secondary";
  return { bgClass, fillClass };
}

export default function ServicesPageContent({
  items,
  whatsappE164,
}: {
  items: ServiceCardDTO[];
  whatsappE164: string;
}) {
  const locale = useLocale();
  const t = useTranslations("servicesPage");
  const [booking, setBooking] = useState<{ slug: string; title: string } | null>(null);

  const contactHref = getContactHref(locale, whatsappE164);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <header className="max-w-2xl">
          <h1
            className="text-3xl font-bold font-heading text-content-primary md:text-4xl"
          >
            {t("title")}
          </h1>
          <p className="mt-3 text-content-secondary">{t("subtitle")}</p>
        </header>

        <div className="mt-14 flex flex-col gap-16 md:gap-20">
          {items.map((item, i) => {
            const colorName = serviceColors[i % serviceColors.length];
            const { bgClass, fillClass } = chipClasses(colorName);
            const iconType = resolveIconKey(item.iconKey);
            const img = item.imageUrl?.trim();
            const alt = item.imageAlt?.trim() || item.title;
            const objPos = item.imageObjectPosition === "bottom" ? "object-bottom" : "object-center";

            return (
              <section key={item.id} id={item.slug} className="scroll-mt-24">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-surface-subtle shadow-sm lg:max-w-xl">
                    {img ? (
                      <Image
                        src={img}
                        alt={alt}
                        fill
                        className={`object-cover ${objPos}`}
                        sizes="(max-width: 1024px) 100vw, 480px"
                        priority={i === 0}
                        unoptimized={img.startsWith("http")}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/25"
                        aria-hidden
                      />
                    )}
                    <div
                      className={`absolute bottom-4 left-4 z-10 flex h-14 w-14 items-center justify-center rounded-xl shadow-md ${bgClass}`}
                      aria-hidden
                    >
                      <ServiceIconGlyph iconKey={iconType} className={`h-7 w-7 ${fillClass}`} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-content-primary md:text-3xl">{item.title}</h2>
                    <ServicePriceInline priceFrom={item.priceFrom} priceWas={item.priceWas} />
                    <p className="mt-4 whitespace-pre-wrap text-content-secondary leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setBooking({ slug: item.slug, title: item.title })}
                        className="focus-ring inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-content-inverse hover:opacity-90"
                      >
                        {t("bookNow")}
                      </button>
                      <a
                        href={contactHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center justify-center rounded-md border border-border bg-surface-primary px-5 py-2.5 text-sm font-medium text-content-primary hover:bg-surface-subtle"
                      >
                        {t("contact")}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-16 text-center text-sm text-content-secondary">
          <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
            {t("backHome")}
          </Link>
        </p>
      </div>

      {booking ? (
        <ServiceBookingOverlay
          open
          onClose={() => setBooking(null)}
          serviceSlug={booking.slug}
          serviceTitle={booking.title}
        />
      ) : null}
    </>
  );
}
