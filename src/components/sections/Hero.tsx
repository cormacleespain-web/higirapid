"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp } from "@/lib/motion";
import { useMergedT } from "@/hooks/useMergedT";
import { getContactHref, getQuoteHref, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const DEFAULT_HERO = "/images/hero.png";

type HeroProps = {
  whatsappE164?: string;
  heroImageSrc?: string | null;
};

export default function Hero({ whatsappE164, heroImageSrc }: HeroProps) {
  const t = useMergedT("hero");
  const locale = useLocale();
  const wa = whatsappE164 ?? WHATSAPP_NUMBER;
  const quoteHref = getQuoteHref(locale, wa);
  const contactHref = getContactHref(locale, wa);
  const src = heroImageSrc?.trim() ? heroImageSrc.trim() : DEFAULT_HERO;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 sm:px-6 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            className={`text-4xl font-bold leading-tight text-content-inverse md:text-5xl ${fontNunitoHeading.className}`}
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
          >
            {t("headline")}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg leading-relaxed text-white/90 md:text-xl"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
          >
            {t("subhead")}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <Button
              href={quoteHref}
              variant="primary"
              size="lg"
              aria-label={t("ctaQuote")}
              className="focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
            >
              {t("ctaQuote")}
            </Button>
            <Button
              href={contactHref}
              variant="whatsapp"
              size="lg"
              aria-label={t("ctaContactUs")}
              className="inline-flex items-center gap-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80"
            >
              <WhatsAppIcon />
              {t("ctaContactUs")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
