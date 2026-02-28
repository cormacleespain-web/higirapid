"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  index: number;
}

export function ServiceCard({ title, description, benefits, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-xl border bg-card p-5 lg:p-6"
    >
      <h3 className="font-heading text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-2">
        {benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 shrink-0 text-brand-green" />
            {benefit}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
