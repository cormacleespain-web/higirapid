"use client";

import { useTranslations } from "next-intl";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { motion } from "framer-motion";

export default function GalleryPage() {
  const t = useTranslations("galleryPage");

  return (
    <>
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

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
