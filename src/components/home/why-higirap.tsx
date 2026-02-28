"use client";

import { useTranslations } from "next-intl";
import {
  Award,
  Leaf,
  Truck,
  Settings,
  DollarSign,
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";

const icons = [Award, Leaf, Truck, Settings, DollarSign, ThumbsUp];

export function WhyHigirap() {
  const t = useTranslations("why");
  const items = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md lg:p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10">
                  <Icon className="h-5 w-5 text-brand-green" />
                </div>
                <h3 className="mt-3 font-heading text-base font-bold">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
