"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, viewportOnce } from "@/lib/motion";

const testimonialKeys = ["1", "2", "3"] as const;

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="py-20 md:py-24 bg-testimonials scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-content-inverse text-center ${fontNunitoHeading.className}`}
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-2 text-white/80 text-center max-w-2xl mx-auto"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          {t("subtitle")}
        </motion.p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {testimonialKeys.map((key, i) => (
            <motion.blockquote
              key={key}
              className="p-6 rounded-lg bg-surface-primary border border-border shadow-sm"
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={viewportOnce}
              transition={{ ...fadeUp.transition, delay: 0.08 * i }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <p className="text-content-primary">&ldquo;{t(`${key}.quote`)}&rdquo;</p>
              <footer className="mt-4 text-sm text-content-secondary">
                <cite className="not-italic font-bold text-content-primary">
                  {t(`${key}.author`)}
                </cite>
                {t(`${key}.location`) && (
                  <span> — {t(`${key}.location`)}</span>
                )}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
