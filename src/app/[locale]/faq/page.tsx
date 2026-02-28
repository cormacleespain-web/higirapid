"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "34600000000";

export default function FaqPage() {
  const t = useTranslations("faqPage");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-blue to-brand-blue-dark py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base text-white/80 lg:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* About section */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border bg-card p-6 lg:p-8"
            >
              <h2 className="font-heading text-xl font-bold sm:text-2xl">
                {t("about.title")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:text-base">
                {t("about.description")}
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
                  <Clock className="h-4 w-4 text-brand-blue" />
                  {t("about.hours")}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm">
                  <MapPin className="h-4 w-4 text-brand-blue" />
                  {t("about.area")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/50 py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <FaqAccordion />
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("stillHaveQuestions")}
          </h2>
          <Button
            asChild
            size="lg"
            className="mt-6 h-12 bg-brand-green px-8 text-base font-semibold text-white hover:bg-brand-green-light sm:h-14 sm:text-lg"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t("contactUs")}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
