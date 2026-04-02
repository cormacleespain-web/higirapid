"use client";

import { motion } from "motion/react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { useMergedT } from "@/hooks/useMergedT";
import type { ServiceCardDTO } from "@/lib/site-data";
import ServicesCarousel from "@/components/sections/ServicesCarousel";

type Props = {
  items: ServiceCardDTO[];
};

export default function Services({ items }: Props) {
  const tm = useMergedT("services");

  return (
    <section id="services" className="scroll-mt-16 overflow-x-hidden bg-surface-primary py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          className="text-center text-3xl font-bold font-heading text-content-primary md:text-4xl"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          {tm("title")}
        </motion.h2>
        <motion.p
          className="mx-auto mt-2 max-w-2xl text-center text-content-secondary"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          {tm("subtitle")}
        </motion.p>
      </div>
      <div className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2">
        <ServicesCarousel items={items} />
      </div>
    </section>
  );
}
