"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    name: string;
    location: string;
    text: string;
  }>;

  return (
    <section className="bg-secondary/50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="flex flex-col rounded-xl bg-card p-5 shadow-sm"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <Quote className="mt-3 h-5 w-5 text-brand-blue/30" />
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
