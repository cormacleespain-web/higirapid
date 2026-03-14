"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp } from "@/lib/motion";

/** Full-bleed hero background (professional cleaning scene). */
const HERO_IMAGE = "/images/hero.png";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34600000000";

function getQuoteMessage(locale: string): string {
  switch (locale) {
    case "es":
      return "Hola, me gustaría solicitar un presupuesto.";
    case "ca":
      return "Hola, m'agradaria sol·licitar un pressupost.";
    default:
      return "Hi, I'd like to get a quote.";
  }
}

function getContactMessage(locale: string): string {
  switch (locale) {
    case "es":
      return "Hola, me gustaría hacer una consulta.";
    case "ca":
      return "Hola, m'agradaria fer una consulta.";
    default:
      return "Hi, I'd like to get in touch.";
  }
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const quoteHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(getQuoteMessage(locale))}`;
  const contactHref = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(getContactMessage(locale))}`;

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      {/* Dark overlay for text legibility and WCAG contrast */}
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      {/* Centered content with accessible light-on-dark styling */}
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

