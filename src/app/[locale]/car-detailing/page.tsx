"use client";

import { useTranslations } from "next-intl";
import { Check, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/services/process-steps";
import { PriceCalculator } from "@/components/calculator/price-calculator";
import { carDetailingItems } from "@/lib/calculator-data";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "34600000000";

const tierKeys = ["basic", "interior", "full", "premium"] as const;

export default function CarDetailingPage() {
  const t = useTranslations("carDetailingPage");

  const processSteps = t.raw("process.steps") as Array<{
    title: string;
    description: string;
  }>;

  const addons = t.raw("addons.items") as Array<{
    name: string;
    price: string;
  }>;

  const calculatorCategories = [
    { key: "packages", label: t("tiers.basic.name").split(" ")[0] || "Packages" },
    { key: "addons", label: t("addons.title") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-blue to-brand-blue-dark py-14 lg:py-20">
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

      {/* Service tiers */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tierKeys.map((key, i) => {
              const features = t.raw(`tiers.${key}.features`) as string[];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`flex flex-col rounded-2xl border p-5 lg:p-6 ${
                    key === "full"
                      ? "border-brand-green bg-brand-green/5 shadow-md"
                      : "bg-card"
                  }`}
                >
                  <h3 className="font-heading text-lg font-bold">
                    {t(`tiers.${key}.name`)}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-heading text-3xl font-extrabold text-brand-blue">
                      {t(`tiers.${key}.price`)}€
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {t(`tiers.${key}.duration`)}
                  </div>
                  <ul className="mt-4 flex-1 space-y-2">
                    {features.map((feature: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={key === "full" ? "default" : "outline"}
                    className={`mt-5 h-12 w-full text-base ${
                      key === "full"
                        ? "bg-brand-green text-white hover:bg-brand-green-light"
                        : ""
                    }`}
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Interested in ${t(`tiers.${key}.name`)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t(`tiers.${key}.name`)}
                    </a>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons grid */}
      <section className="bg-secondary/50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("addons.title")}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="flex items-center justify-between rounded-xl border bg-card p-4"
              >
                <span className="text-sm font-medium">{addon.name}</span>
                <span className="text-sm font-bold text-brand-blue">
                  +{addon.price}€
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps title={t("process.title")} steps={processSteps} />

      {/* Calculator */}
      <div className="bg-secondary/50">
        <PriceCalculator
          items={carDetailingItems}
          categories={calculatorCategories}
        />
      </div>
    </>
  );
}
