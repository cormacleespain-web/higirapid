"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMergedT } from "@/hooks/useMergedT";
import { ServiceIconGlyph } from "@/components/ui/ServiceIconGlyph";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, viewportOnce } from "@/lib/motion";

const bulletKeys = ["point1", "point2", "point3", "point4"] as const;
const iconKeys = ["disinfection", "eco", "home", "premium"] as const;

export default function WhyChooseUs() {
  const t = useMergedT("whyChooseUs");

  return (
    <section id="why-choose-us" className="relative py-20 md:py-24 bg-white scroll-mt-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="relative rounded-3xl bg-[#50d9b2] p-6 md:p-8 lg:p-10 shadow-[0_18px_50px_-36px_rgba(0,0,0,0.45)]"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1.35fr] lg:gap-10">
            <div>
              <Image
                src="/images/why-choose-logo-mark-white.svg"
                alt="HigiRapid logo"
                width={128}
                height={128}
                className="block h-auto w-32"
              />
              <h2 className={`mt-5 text-3xl md:text-4xl font-bold text-white ${fontNunitoHeading.className}`}>
                Why Choose Us?
              </h2>
              <p className="mt-3 text-white/90">{t("subtitle")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {bulletKeys.map((key, idx) => (
                <motion.article
                  key={key}
                  className="rounded-2xl border border-border bg-surface-primary/95 p-5 shadow-sm"
                  initial={fadeUp.initial}
                  whileInView={fadeUp.animate}
                  viewport={viewportOnce}
                  transition={{ ...fadeUp.transition, delay: idx * 0.06 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <ServiceIconGlyph iconKey={iconKeys[idx]} className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-4 text-content-primary font-medium">{t(key)}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
