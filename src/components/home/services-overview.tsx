"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sofa, Car } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";

export function ServicesOverview() {
  const t = useTranslations("services");

  const services = [
    {
      key: "upholstery",
      href: "/upholstery" as const,
      icon: Sofa,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    },
    {
      key: "carDetailing",
      href: "/car-detailing" as const,
      icon: Car,
      image: "https://images.unsplash.com/photo-1520340356584-f9166066d482?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <Link
                  href={service.href}
                  className="group relative block overflow-hidden rounded-2xl bg-card shadow-md transition-shadow hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden sm:h-56 lg:h-64">
                    <img
                      src={service.image}
                      alt={t(`${service.key}.title`)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2">
                        <Icon className="h-6 w-6 text-brand-green" />
                        <h3 className="font-heading text-xl font-bold text-white">
                          {t(`${service.key}.title`)}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground">
                      {t(`${service.key}.description`)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-blue">
                      {t(`${service.key}.cta`)}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
