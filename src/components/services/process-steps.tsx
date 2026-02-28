"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  title: string;
  steps: Step[];
}

export function ProcessSteps({ title, steps }: ProcessStepsProps) {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeader title={title} />

        <div className="relative mt-10">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-brand-blue/20 sm:left-6" />

          <ol className="space-y-8">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="relative flex gap-4 sm:gap-5"
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white sm:h-12 sm:w-12">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="font-heading text-base font-bold sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
