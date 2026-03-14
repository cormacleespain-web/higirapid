"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { getQuoteHref, getContactHref } from "@/lib/whatsapp";
import { fadeUp, viewportOnce } from "@/lib/motion";

const navKeys = ["services", "process", "gallery", "testimonials", "faq", "contact"] as const;

export default function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const quoteHref = getQuoteHref(locale);
  const contactHref = getContactHref(locale);

  return (
    <footer
      id="contact"
      className="bg-surface-subtle border-t border-border scroll-mt-16"
    >
      <div className="container-default w-full py-12 md:py-16">
        <motion.div
          className="flex flex-col gap-10"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          {/* Desktop: brand (left) | contact (right). Mobile: stacked. */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-6">
            {/* Brand: logo with tagline stacked below */}
            <div className="flex flex-col gap-2">
              <a
                href="/"
                className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                aria-label="HigiRapid home"
              >
<Image
                src="/logos/web-footer.svg"
                alt="HigiRapid"
                width={240}
                height={37}
                className="h-8 w-auto"
              />
              </a>
              <p className="text-content-secondary text-sm max-w-md">
                {tFooter("tagline")}
              </p>
            </div>

            {/* Contact: headline + subtitle + CTAs — right-aligned on desktop */}
            <div className="md:text-right md:flex md:flex-col md:items-end">
              <h2 className="text-xl font-bold text-content-primary">
                {tContact("title")}
              </h2>
              <p className="mt-1 text-content-secondary text-sm max-w-md md:max-w-sm">
                {tContact("subtitle")}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3 md:justify-end">
                <Button
                  href={quoteHref}
                  variant="primary"
                  size="md"
                  aria-label={tContact("ctaQuote")}
                >
                  {tContact("ctaQuote")}
                </Button>
                <Button
                  href={contactHref}
                  variant="whatsapp"
                  size="md"
                  aria-label={tContact("ctaContactUs")}
                  className="inline-flex items-center gap-2"
                >
                  <WhatsAppIcon />
                  {tContact("ctaContactUs")}
                </Button>
              </div>
            </div>
          </div>

          {/* Links (left) + Language (right), same row on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-content-secondary mb-3">
                {tFooter("links")}
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {navKeys.map((key) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="text-content-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                    >
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 flex flex-col items-center">
              <p className="text-sm font-medium text-content-secondary mb-2">
                {tFooter("language")}
              </p>
              <div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-content-secondary">
              {tFooter("copyright", { year })}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
