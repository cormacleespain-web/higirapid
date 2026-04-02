"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ServiceCardDTO } from "@/lib/site-data";
import { ServiceIconGlyph } from "@/components/ui/ServiceIconGlyph";
import { fadeUpStagger, viewportOnce } from "@/lib/motion";
import ServiceBookingOverlay from "@/components/services/ServiceBookingOverlay";
import { ServicePriceImageBadge } from "@/components/services/ServicePriceDisplay";

const serviceColors = ["primary", "accent", "secondary"] as const;

function resolveIconKey(raw: string): string {
  return raw?.trim() || "upholstery";
}

function colorClasses(colorName: (typeof serviceColors)[number]) {
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

type Props = {
  items: ServiceCardDTO[];
};

/** Small inset from viewport edge; large screens start near the left edge (no alignment to max-w-6xl). */
const carouselTrackGutter = "pl-3 pr-0 sm:pl-4";

/** Wider slides = more cards visible; match “View all” tile. */
const slideCellClass =
  "min-w-0 flex min-h-0 flex-[0_0_74%] pl-2 sm:flex-[0_0_40%] sm:pl-3 lg:flex-[0_0_30%] lg:pl-4 xl:flex-[0_0_26%] xl:pl-4";

function CarouselArrows({
  prevDisabled,
  nextDisabled,
  scrollPrev,
  scrollNext,
  prevLabel,
  nextLabel,
}: {
  prevDisabled: boolean;
  nextDisabled: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  prevLabel: string;
  nextLabel: string;
}) {
  const btnClass =
    "focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-primary text-content-primary shadow-md transition-[box-shadow,transform,background-color] hover:bg-surface-subtle hover:shadow-lg disabled:pointer-events-none disabled:opacity-35 motion-safe:active:scale-[0.97]";
  return (
    <div className="flex justify-center gap-3 sm:gap-4" role="group" aria-label="Carousel controls">
      <button type="button" onClick={scrollPrev} disabled={prevDisabled} className={btnClass} aria-label={prevLabel}>
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button type="button" onClick={scrollNext} disabled={nextDisabled} className={btnClass} aria-label={nextLabel}>
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

function ViewAllServicesCard({ t }: { t: (key: string) => string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={fadeUpStagger.initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="h-full min-h-[300px]"
    >
      <Link
        href="/services"
        className="focus-ring group relative flex h-full min-h-[300px] flex-col items-center justify-center gap-5 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.09] via-surface-primary to-secondary/[0.08] p-8 text-center shadow-sm ring-1 ring-black/[0.04] transition-[border-color,box-shadow,transform] duration-200 hover:border-primary/35 hover:shadow-md motion-safe:hover:-translate-y-0.5"
      >
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.14] via-transparent to-transparent"
          aria-hidden
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner ring-1 ring-primary/10 transition-transform duration-200 motion-safe:group-hover:scale-105">
          <LayoutGrid className="h-7 w-7" aria-hidden strokeWidth={1.75} />
        </span>
        <div className="relative space-y-2">
          <span className="block text-xl font-bold tracking-tight text-content-primary">{t("viewAllTitle")}</span>
          <span className="block max-w-[14rem] text-sm leading-snug text-content-secondary">{t("viewAllHint")}</span>
        </div>
        <span className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-content-inverse shadow-sm transition-[box-shadow,transform] motion-safe:group-hover:shadow-md">
          {t("viewAllCta")}
          <motion.span
            className="inline-flex"
            whileHover={reduceMotion ? undefined : { x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <ArrowRight className="h-4 w-4" aria-hidden />
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function ServicesCarousel({ items }: Props) {
  const t = useTranslations("services");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [booking, setBooking] = useState<{ slug: string; title: string } | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const arrowProps = {
    prevDisabled,
    nextDisabled,
    scrollPrev,
    scrollNext,
    prevLabel: t("carouselPrev"),
    nextLabel: t("carouselNext"),
  };

  return (
    <div>
      <div className={`overflow-hidden ${carouselTrackGutter}`} ref={emblaRef}>
        <div className="flex touch-pan-y">
          {items.map((item, i) => {
            const colorName = serviceColors[i % serviceColors.length];
            const { bgClass, fillClass } = colorClasses(colorName);
            const iconType = resolveIconKey(item.iconKey);
            const img = item.imageUrl?.trim();
            const alt = item.imageAlt?.trim() || item.title;
            const objPos = item.imageObjectPosition === "bottom" ? "object-bottom" : "object-center";

            return (
              <div key={item.id} className={slideCellClass}>
                <article className="flex h-full min-h-[300px] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface-primary shadow-sm transition-shadow duration-150 hover:shadow-md">
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-subtle">
                    {img ? (
                      <Image
                        src={img}
                        alt={alt}
                        fill
                        className={`object-cover ${objPos}`}
                        sizes="(max-width: 640px) 74vw, (max-width: 1024px) 40vw, (max-width: 1280px) 30vw, 26vw"
                        unoptimized={img.startsWith("http")}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/20" aria-hidden />
                    )}
                    <div
                      className={`absolute bottom-3 left-3 z-10 flex h-12 w-12 items-center justify-center rounded-lg shadow-sm ${bgClass}`}
                      aria-hidden
                    >
                      <ServiceIconGlyph iconKey={iconType} className={`h-6 w-6 ${fillClass}`} />
                    </div>
                    <ServicePriceImageBadge priceFrom={item.priceFrom} priceWas={item.priceWas} />
                  </div>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <h3 className="shrink-0 text-lg font-bold text-content-primary">{item.title}</h3>
                    <div className="mt-2 min-h-0 min-w-0 flex-1 overflow-hidden">
                      <p className="line-clamp-3 break-words text-sm leading-relaxed text-content-secondary">{item.description}</p>
                    </div>
                    <div className="mt-auto flex w-full min-w-0 items-center justify-between gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setBooking({ slug: item.slug, title: item.title })}
                        className="focus-ring inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90"
                      >
                        {t("bookNow")}
                      </button>
                      <Link
                        href={`/services#${item.slug}`}
                        className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <span>{t("learnMore")}</span>
                        <motion.span
                          className="inline-flex"
                          initial={false}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}

          <div className={slideCellClass}>
            <ViewAllServicesCard t={t} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center px-4 sm:px-6">
        <CarouselArrows {...arrowProps} />
      </div>

      {booking ? (
        <ServiceBookingOverlay
          open
          onClose={() => setBooking(null)}
          serviceSlug={booking.slug}
          serviceTitle={booking.title}
        />
      ) : null}
    </div>
  );
}
