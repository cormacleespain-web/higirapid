"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, viewportOnce } from "@/lib/motion";

const steps = ["step1", "step2", "step3"] as const;

const STEP_ILLUSTRATIONS = [
  "/images/process-step-1.svg",
  "/images/process-step-2.svg",
  "/images/process-step-3.svg",
] as const;

export default function Process() {
  const t = useTranslations("process");

  return (
    <section id="process" className="py-20 md:py-24 bg-surface-subtle scroll-mt-16">
      <div className="container-default">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-content-primary text-center ${fontNunitoHeading.className}`}
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          {t("title")}
        </motion.h2>
        <motion.p
          className="mt-3 text-content-secondary text-center max-w-2xl mx-auto text-lg"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          {t("subtitle")}
        </motion.p>
        <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <motion.article
              key={step}
              className="flex flex-col items-center text-center"
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={viewportOnce}
              transition={{ ...fadeUp.transition, delay: 0.08 * i }}
              aria-labelledby={`process-step-${i + 1}-title`}
            >
              <div className="w-full max-w-[200px] aspect-square flex items-center justify-center overflow-hidden mb-5">
                <img
                  src={STEP_ILLUSTRATIONS[i]}
                  alt=""
                  className="w-full h-full object-contain"
                  width={200}
                  height={200}
                />
              </div>
              <h3
                id={`process-step-${i + 1}-title`}
                className={`text-xl font-bold text-content-primary ${fontNunitoHeading.className}`}
              >
                {i + 1}. {t(`${step}.title`)}
              </h3>
              <p className="mt-2 text-content-secondary leading-relaxed">
                {t(`${step}.description`)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
