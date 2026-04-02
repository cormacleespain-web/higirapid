"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useMergedT } from "@/hooks/useMergedT";
import type { GalleryItemDTO } from "@/lib/site-data";
import { fadeUp, viewportOnce } from "@/lib/motion";

/** Display category (tab). carpetsAndRugs combines carpet + rug items. */
export type GalleryCategory = "all" | "car" | "upholstery" | "carpetsAndRugs" | "business";

/** Item category in data. carpet and rug both show under carpetsAndRugs tab. */
export type GalleryItemCategory = "car" | "upholstery" | "carpet" | "rug" | "business";

export interface GalleryItem {
  id: string;
  category: GalleryItemCategory;
  imageSrc: string;
  imageAlt: string;
  /** When "bottom", use object-bottom so subject (e.g. sofa) stays in view in aspect-video crop. */
  objectPosition?: "bottom" | "center";
  caption?: string;
  priceFrom: number;
}

const GALLERY_CATEGORIES: Exclude<GalleryCategory, "all">[] = [
  "car",
  "upholstery",
  "carpetsAndRugs",
  "business",
];

const PLACEHOLDER_ITEMS: GalleryItem[] = [
  {
    id: "1",
    category: "car",
    imageSrc: "/images/car-seats-after-cleaning.png",
    imageAlt: "Car seats after cleaning",
    caption: "Car seats",
    priceFrom: 45,
  },
  {
    id: "2",
    category: "car",
    imageSrc: "/images/car-interior-after-cleaning.png",
    imageAlt: "Car interior after cleaning",
    caption: "Car interior",
    priceFrom: 65,
  },
  {
    id: "3",
    category: "upholstery",
    imageSrc: "/images/sofa-after-cleaning.png",
    imageAlt: "Sofa after cleaning",
    objectPosition: "bottom",
    caption: "Sofa",
    priceFrom: 55,
  },
  {
    id: "4",
    category: "upholstery",
    imageSrc: "/images/armchair-after-cleaning.png",
    imageAlt: "Armchair after cleaning",
    objectPosition: "bottom",
    caption: "Armchair",
    priceFrom: 35,
  },
  {
    id: "5",
    category: "carpet",
    imageSrc: "/images/carpet-after-cleaning.png",
    imageAlt: "Carpet after cleaning",
    caption: "Carpet",
    priceFrom: 40,
  },
  {
    id: "6",
    category: "rug",
    imageSrc: "/images/rug-after-cleaning.png",
    imageAlt: "Rug after cleaning",
    caption: "Rug",
    priceFrom: 50,
  },
  {
    id: "7",
    category: "business",
    imageSrc: "/images/office-upholstery-cleaning.png",
    imageAlt: "Office upholstery cleaning",
    caption: "Office cleaning",
    priceFrom: 120,
  },
  {
    id: "8",
    category: "business",
    imageSrc: "/images/commercial-space-after-cleaning.png",
    imageAlt: "Commercial space after cleaning",
    caption: "Commercial space",
    priceFrom: 150,
  },
];

function matchesCategory(item: GalleryItem, activeCategory: GalleryCategory): boolean {
  if (activeCategory === "all") return true;
  if (activeCategory === "carpetsAndRugs") return item.category === "carpet" || item.category === "rug";
  return item.category === activeCategory;
}

type GalleryProps = {
  initialItems?: GalleryItemDTO[] | null;
};

export default function Gallery({ initialItems }: GalleryProps) {
  const t = useTranslations("gallery");
  const tm = useMergedT("gallery");
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const items: GalleryItem[] =
    initialItems && initialItems.length > 0 ? initialItems : PLACEHOLDER_ITEMS;
  const filteredItems = items.filter((item) => matchesCategory(item, activeCategory));

  const tabList: GalleryCategory[] = ["all", ...GALLERY_CATEGORIES];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowLeft") nextIndex = Math.max(0, index - 1);
    if (e.key === "ArrowRight") nextIndex = Math.min(tabList.length - 1, index + 1);
    if (nextIndex !== index) {
      e.preventDefault();
      setActiveCategory(tabList[nextIndex]);
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 md:py-24 bg-white scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-center text-3xl font-bold text-content-primary font-heading md:text-4xl"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          {tm("title")}
        </motion.h2>
        <motion.p
          className="mt-2 text-content-secondary text-center max-w-2xl mx-auto"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          {tm("subtitle")}
        </motion.p>

        {/* Category filter tabs */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label={t("filterLabel")}
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            aria-controls="gallery-grid"
            id="tab-all"
            tabIndex={activeCategory === "all" ? 0 : -1}
            onClick={() => setActiveCategory("all")}
            onKeyDown={(e) => handleTabKeyDown(e, 0)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[selected]:bg-primary data-[selected]:text-content-inverse data-[not-selected]:bg-surface-primary data-[not-selected]:text-content-primary data-[not-selected]:hover:bg-border border border-border"
            data-selected={activeCategory === "all" ? true : undefined}
            data-not-selected={activeCategory !== "all" ? true : undefined}
          >
            {t("categories.all")}
          </button>
          {GALLERY_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="gallery-grid"
              id={`tab-${cat}`}
              tabIndex={activeCategory === cat ? 0 : -1}
              onClick={() => setActiveCategory(cat)}
              onKeyDown={(e) => handleTabKeyDown(e, i + 1)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[selected]:bg-primary data-[selected]:text-content-inverse data-[not-selected]:bg-surface-primary data-[not-selected]:text-content-primary data-[not-selected]:hover:bg-border border border-border"
              data-selected={activeCategory === cat ? true : undefined}
              data-not-selected={activeCategory !== cat ? true : undefined}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid of cards (single image + caption + from price) */}
        <motion.div
          id="gallery-grid"
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => {
              const title = item.caption?.trim() || item.imageAlt;
              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex h-full min-h-[280px] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface-primary shadow-sm transition-shadow duration-150 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-subtle">
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        className={`object-cover ${item.objectPosition === "bottom" ? "object-bottom" : "object-center"}`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={item.imageSrc.startsWith("http")}
                      />
                    </motion.div>
                  </div>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <h3 className="shrink-0 text-lg font-bold text-content-primary">{title}</h3>
                    <p className="mt-2 text-lg font-semibold text-primary">
                      {t("fromPrice", { price: item.priceFrom })}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
