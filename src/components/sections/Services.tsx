"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, fadeUpStagger, viewportOnce } from "@/lib/motion";

const serviceKeys = ["upholstery", "carpet", "rug", "car", "hygiene"] as const;
const serviceColors = ["primary", "accent", "secondary", "primary", "accent"] as const;

function ServiceIcon({
  type,
  colorClass,
}: {
  type: (typeof serviceKeys)[number];
  colorClass: string;
}) {
  const iconClass = `w-6 h-6 ${colorClass}`;
  const stroke = "currentColor";
  switch (type) {
    case "upholstery":
      /* Sofa / couch */
      return (
        <svg className={iconClass} fill="none" stroke={stroke} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v6h16v-6M4 12a2 2 0 012-2h12a2 2 0 012 2M4 16h16M6 12v4m12-4v4" />
        </svg>
      );
    case "carpet":
      /* Carpet / floor grid */
      return (
        <svg className={iconClass} fill="none" stroke={stroke} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5v4h4V5H4zm10 0v4h4V5h-4zM4 15v4h4v-4H4zm10 0v4h4v-4h-4z" />
        </svg>
      );
    case "rug":
      /* Rug / mat */
      return (
        <svg className={iconClass} fill="none" stroke={stroke} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1z" />
        </svg>
      );
    case "car":
      /* Car */
      return (
        <svg className={iconClass} fill="none" stroke={stroke} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8l2 4H6l2-4zM6 17v2m12-2v2M6 17h12a1 1 0 001-1v-4H5v4a1 1 0 001 1z" />
        </svg>
      );
    case "hygiene":
      /* Sparkles / cleaning */
      return (
        <svg className={iconClass} fill="none" stroke={stroke} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zm0 12l.75 2.25L15 18l-2.25.75L12 21l-.75-2.25L9 18l2.25-.75L12 15z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Services() {
  const t = useTranslations("services");

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
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-2 text-content-secondary text-center max-w-2xl mx-auto"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          {t("subtitle")}
        </motion.p>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => {
            const colorName = serviceColors[i];
            const bgClass = colorName === "primary" ? "bg-primary/10" : colorName === "accent" ? "bg-accent/10" : "bg-secondary/10";
            const fillClass = colorName === "primary" ? "text-primary" : colorName === "accent" ? "text-accent" : "text-secondary";
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
                  <ServiceIcon type={key} colorClass={fillClass} />
                </div>
                <h3 className="text-xl font-bold text-content-primary">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 text-content-secondary">
                  {t(`${key}.description`)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
