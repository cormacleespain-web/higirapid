"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "34600000000";

export function CtaBanner() {
  const t = useTranslations("ctaBanner");

  return (
    <section className="bg-gradient-to-r from-brand-blue to-brand-blue-dark py-14 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-4 text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-white/80 lg:text-lg">
          {t("subtitle")}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 h-12 bg-brand-green px-8 text-base font-semibold text-white hover:bg-brand-green-light sm:h-14 sm:text-lg"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {t("cta")}
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
