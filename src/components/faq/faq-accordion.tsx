"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const categoryKeys = ["process", "products", "pricing", "scheduling", "results"] as const;

export function FaqAccordion() {
  const t = useTranslations("faqPage");
  const [activeCategory, setActiveCategory] = useState<string>("process");

  const questions = t.raw("questions") as Array<{
    category: string;
    q: string;
    a: string;
  }>;

  const filtered = questions.filter((q) => q.category === activeCategory);

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`min-h-[44px] rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === key
                ? "bg-brand-blue text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {t(`categories.${key}`)}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6"
      >
        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border bg-card px-4 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger className="min-h-[44px] text-left text-sm font-medium hover:no-underline sm:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
}
