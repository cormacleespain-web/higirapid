"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMergedT } from "@/hooks/useMergedT";
import { Link } from "@/i18n/navigation";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function HRClubTeaser() {
  const t = useMergedT("hrClubTeaser");

  return (
    <section
      id="hr-club"
      className="relative overflow-hidden py-20 md:py-24 bg-primary scroll-mt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(173,216,79,0.4)_0%,rgba(173,216,79,0.2)_35%,rgba(173,216,79,0)_72%)] blur-3xl"
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          className="overflow-hidden rounded-3xl border border-primary/20 bg-surface-primary shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)]"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[260px] lg:min-h-full">
              <Image
                src="/images/hr-club-kitchen.png"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
            <div className="p-8 md:p-10 lg:p-12">
              <h2 className={`text-3xl md:text-4xl font-bold text-content-primary ${fontNunitoHeading.className}`}>
                {t("title")}
              </h2>
              <p className="mt-3 text-content-secondary max-w-3xl">{t("subtitle")}</p>
              <ul className="mt-6 space-y-2 text-content-secondary">
                <li>• {t("benefit1")}</li>
                <li>• {t("benefit2")}</li>
                <li>• {t("benefit3")}</li>
              </ul>
              <div className="mt-8">
                <Link
                  href="/hr-club"
                  className="focus-ring inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-content-inverse transition-transform duration-200 hover:scale-[1.02] hover:opacity-95"
                >
                  {t("cta")}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
