"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, fadeUpStagger, viewportOnce } from "@/lib/motion";
import { useMergedT } from "@/hooks/useMergedT";
import type { ServiceCardDTO } from "@/lib/site-data";
import { ServiceIconGlyph } from "@/components/ui/ServiceIconGlyph";

const serviceKeys = [
  "upholstery",
  "carpet",
  "ozone",
  "facade",
  "detailing",
  "commercialCarpet",
] as const;
const serviceColors = ["primary", "accent", "secondary", "primary", "accent", "secondary"] as const;

function resolveIconKey(raw: string): string {
  return raw?.trim() || "upholstery";
}

type Props = {
  dbItems?: ServiceCardDTO[] | null;
};

export default function Services({ dbItems }: Props) {
  const tm = useMergedT("services");
  const t = useTranslations("services");

  const useDb = Boolean(dbItems && dbItems.length > 0);

  return (
    <section id="services" className="py-20 md:py-24 bg-surface-primary scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-content-primary text-center ${fontNunitoHeading.className}`}
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
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useDb
            ? dbItems!.map((item, i) => {
                const colorName = serviceColors[i % serviceColors.length];
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
                const iconType = resolveIconKey(item.iconKey);
                return (
                  <motion.article
                    key={item.id}
                    className="p-6 rounded-lg border border-border bg-surface-primary shadow-sm hover:shadow-md transition-shadow duration-150"
                    initial={fadeUpStagger.initial}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${bgClass}`}
                      aria-hidden
                    >
                      <ServiceIconGlyph iconKey={iconType} className={`w-6 h-6 ${fillClass}`} />
                    </div>
                    <h3 className="text-xl font-bold text-content-primary">{item.title}</h3>
                    <p className="mt-2 text-content-secondary">{item.description}</p>
                  </motion.article>
                );
              })
            : serviceKeys.map((key, i) => {
                const colorName = serviceColors[i];
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
                return (
                  <motion.article
                    key={key}
                    className="p-6 rounded-lg border border-border bg-surface-primary shadow-sm hover:shadow-md transition-shadow duration-150"
                    initial={fadeUpStagger.initial}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${bgClass}`}
                      aria-hidden
                    >
                      <ServiceIconGlyph iconKey={key} className={`w-6 h-6 ${fillClass}`} />
                    </div>
                    <h3 className="text-xl font-bold text-content-primary">{t(`${key}.title`)}</h3>
                    <p className="mt-2 text-content-secondary">{t(`${key}.description`)}</p>
                  </motion.article>
                );
              })}
        </div>
      </div>
    </section>
  );
}
