"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/shared/section-header";
import { motion } from "framer-motion";

const serviceKeys = ["standard", "pet", "movein"] as const;

export function PopularServices() {
  const t = useTranslations("popular");

  return (
    <section className="bg-secondary/50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <Tabs defaultValue="standard" className="mt-10">
          <TabsList className="mx-auto flex w-full max-w-lg">
            {serviceKeys.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex-1 min-h-[44px] text-xs sm:text-sm"
              >
                {t(`${key}.name`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceKeys.map((key) => {
            const steps = t.raw(`${key}.steps`) as string[];
            return (
              <TabsContent key={key} value={key} className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-2xl"
                >
                  <div className="rounded-2xl bg-card p-6 shadow-sm lg:p-8">
                    <h3 className="font-heading text-xl font-bold">
                      {t(`${key}.name`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(`${key}.tagline`)}
                    </p>
                    <ol className="mt-6 space-y-4">
                      {steps.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="pt-1 text-sm lg:text-base">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
