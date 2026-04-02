"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useMergedT } from "@/hooks/useMergedT";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { parseFaqOrder } from "@/lib/faq-content";

const accordionTransition = {
  height: {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8,
  },
  opacity: { duration: 0.2, ease: "easeOut" as const },
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      className="ml-2 shrink-0 inline-flex text-content-secondary"
      aria-hidden
      initial={false}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.span>
  );
}

export default function FAQ() {
  const t = useMergedT("faq");
  const orderedSlots = parseFaqOrder(t("order"));
  const visibleSlots = orderedSlots.filter((slot) => {
    const q = t(`q${slot}` as never);
    const a = t(`a${slot}` as never);
    return q.trim() !== "" || a.trim() !== "";
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (openIndex !== null && openIndex >= visibleSlots.length) {
      setOpenIndex(visibleSlots.length > 0 ? 0 : null);
    }
  }, [visibleSlots.length, openIndex]);

  return (
    <section
      id="faq"
      className="py-20 md:py-24 scroll-mt-16 bg-faq-section"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-center text-3xl font-bold font-heading text-white md:text-4xl"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={fadeUp.transition}
        >
          {t("title")}
        </motion.h2>
        <div className="mt-12 space-y-2">
          {visibleSlots.map((slot, i) => {
            const isOpen = openIndex === i;
            const qKey = `q${slot}` as never;
            const aKey = `a${slot}` as never;
            return (
              <motion.div
                key={slot}
                className="rounded-lg border border-border bg-surface-primary overflow-hidden"
                initial={fadeUp.initial}
                whileInView={fadeUp.animate}
                viewport={viewportOnce}
                transition={{ ...fadeUp.transition, delay: 0.05 * i }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-4 text-left font-bold text-content-primary hover:bg-surface-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset transition-colors duration-150 flex items-center justify-between gap-2"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${slot}`}
                  id={`faq-question-${slot}`}
                >
                  <span>{t(qKey)}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                <motion.div
                  id={`faq-answer-${slot}`}
                  role="region"
                  aria-labelledby={`faq-question-${slot}`}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={accordionTransition}
                  style={{ overflow: "hidden" }}
                >
                  <p className="px-6 pb-4 text-content-secondary">{t(aKey)}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
