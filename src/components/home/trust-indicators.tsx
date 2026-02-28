"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Leaf, Zap } from "lucide-react";
import { motion } from "framer-motion";

const icons = [ShieldCheck, Leaf, Zap] as const;
const keys = ["safe", "eco", "fast"] as const;

export function TrustIndicators() {
  const t = useTranslations("trust");

  return (
    <section className="border-b bg-secondary/50 py-10 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-3">
        {keys.map((key, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10">
                <Icon className="h-7 w-7 text-brand-blue" />
              </div>
              <h3 className="font-heading text-base font-bold sm:text-lg">
                {t(`${key}.title`)}
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                {t(`${key}.description`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
