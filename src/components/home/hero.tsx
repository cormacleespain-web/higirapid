"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "34600000000";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-blue to-brand-blue-dark">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-green blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-brand-blue-light blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-12 bg-brand-green px-8 text-base font-semibold text-white hover:bg-brand-green-light sm:h-14 sm:text-lg"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("cta1")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/20 sm:h-14 sm:text-lg"
            >
              <Link href="/upholstery">
                {t("cta2")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90">
              {t("trustBadge")}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
