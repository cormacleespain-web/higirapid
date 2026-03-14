/**
 * Shared motion variants and config for HigiRapid.
 * Restraint over excess: subtle reveal and stagger for professional feel.
 */

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

export const fadeUpStagger = {
  initial: { opacity: 0, y: 24 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: i * 0.08,
    },
  }),
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -80px 0px",
};

export const viewportOnceCenter = {
  once: true,
  amount: 0.2,
};
