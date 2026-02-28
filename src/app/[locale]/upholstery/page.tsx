"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/services/service-card";
import { ProcessSteps } from "@/components/services/process-steps";
import { PriceCalculator } from "@/components/calculator/price-calculator";
import { SectionHeader } from "@/components/shared/section-header";
import { upholsteryItems } from "@/lib/calculator-data";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categoryKeys = ["sofas", "mattresses", "chairs", "carpets", "other"] as const;

export default function UpholsteryPage() {
  const t = useTranslations("upholsteryPage");

  const processSteps = t.raw("process.steps") as Array<{
    title: string;
    description: string;
  }>;

  const categories = categoryKeys.map((key) => ({
    key,
    label: t(`categories.${key}`),
  }));

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

      {/* Service categories */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Tabs defaultValue="sofas">
            <TabsList className="flex w-full overflow-x-auto">
              {categoryKeys.map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="min-h-[44px] flex-1 whitespace-nowrap text-xs sm:text-sm"
                >
                  {t(`categories.${key}`)}
                </TabsTrigger>
              ))}
            </TabsList>

            {categoryKeys.map((key) => {
              const benefits = t.raw(`${key}.benefits`) as string[];
              return (
                <TabsContent key={key} value={key} className="mt-6">
                  <ServiceCard
                    title={t(`categories.${key}`)}
                    description={t(`${key}.description`)}
                    benefits={benefits}
                    index={0}
                  />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      {/* Process */}
      <div className="bg-secondary/50">
        <ProcessSteps title={t("process.title")} steps={processSteps} />
      </div>

      {/* Mini before/after CTA */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <SectionHeader
            title={
              categories[0].label
                ? "Antes y Después / Before & After"
                : "Before & After"
            }
          />
          <Button
            asChild
            variant="outline"
            className="mt-6 h-12 gap-2 px-6 text-base"
          >
            <Link href="/gallery">
              Ver galería completa / View full gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Calculator */}
      <div className="bg-secondary/50">
        <PriceCalculator items={upholsteryItems} categories={categories} />
      </div>
    </>
  );
}
