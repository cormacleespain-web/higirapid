"use client";

import { motion } from "motion/react";
import { useMergedT } from "@/hooks/useMergedT";
import { fontNunitoHeading } from "@/lib/fonts";
import { fadeUp, viewportOnce } from "@/lib/motion";

const LocationIcon = () => (
  <svg
    width="401"
    height="401"
    viewBox="0 0 401 401"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-full"
    aria-hidden
  >
    <path
      d="M267.333 167.083C267.333 130.158 237.426 100.25 200.5 100.25C163.575 100.25 133.667 130.158 133.667 167.083C133.667 204.009 163.575 233.917 200.5 233.917C237.426 233.917 267.333 204.009 267.333 167.083ZM167.083 167.083C167.083 148.704 182.121 133.667 200.5 133.667C218.879 133.667 233.917 148.704 233.917 167.083C233.917 185.463 218.879 200.5 200.5 200.5C182.121 200.5 167.083 185.463 167.083 167.083Z"
      fill="currentColor"
    />
    <path
      d="M190.811 364.409C193.651 366.414 197.16 367.583 200.502 367.583C203.843 367.583 207.352 366.581 210.192 364.409C215.205 360.733 334.669 274.685 334.168 166.916C334.168 93.2324 274.185 33.2495 200.502 33.2495C126.818 33.2495 66.8348 93.2324 66.8348 166.916C66.3336 274.518 185.798 360.733 190.811 364.409ZM200.502 66.8333C255.806 66.8333 300.752 111.779 300.752 167.083C301.086 241.268 227.402 307.934 200.502 329.822C173.601 307.934 99.9173 241.435 100.251 167.083C100.251 111.779 145.197 66.8333 200.502 66.8333Z"
      fill="currentColor"
    />
  </svg>
);

export default function ServiceAreas() {
  const t = useMergedT("areas");

  return (
    <section
      id="areas"
      className="relative overflow-hidden py-20 md:py-24 bg-surface-primary scroll-mt-16"
    >
      {/* Decorative location icon: right column only (square = section height), 35° rotation, 15% opacity; hidden on mobile — BrandPackage/Web Icons/Location.svg */}
      <div
        className="absolute right-10 top-4 bottom-4 aspect-square opacity-15 rotate-[35deg] pointer-events-none text-content-primary hidden md:block"
        aria-hidden
      >
        <LocationIcon />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
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
          className="mt-2 text-content-secondary text-center max-w-2xl mx-auto"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.06 }}
        >
          {t("subtitle")}
        </motion.p>
        <motion.p
          className="mt-6 text-content-primary text-center max-w-2xl mx-auto"
          initial={fadeUp.initial}
          whileInView={fadeUp.animate}
          viewport={viewportOnce}
          transition={{ ...fadeUp.transition, delay: 0.12 }}
        >
          {t("list")}
        </motion.p>
      </div>
    </section>
  );
}
