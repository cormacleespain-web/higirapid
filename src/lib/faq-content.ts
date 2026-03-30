/** Max FAQ “slots” (stable ids for q/a keys). Order is stored separately in `faq.order`. */
export const FAQ_MAX_SLOTS = 20;

export const DEFAULT_FAQ_ORDER: number[] = [1, 2, 3, 4];

export function parseFaqOrder(raw: string | undefined | null): number[] {
  if (!raw?.trim()) return [...DEFAULT_FAQ_ORDER];
  try {
    const p = JSON.parse(raw) as unknown;
    if (Array.isArray(p)) {
      return p
        .map((x) => Number(x))
        .filter((n) => Number.isInteger(n) && n >= 1 && n <= FAQ_MAX_SLOTS);
    }
  } catch {
    /* ignore */
  }
  return [...DEFAULT_FAQ_ORDER];
}

export function stringifyFaqOrder(order: number[]): string {
  return JSON.stringify(order);
}

export function buildFaqContentGroupFields(): { key: string; label: string; hint?: string }[] {
  const fields: { key: string; label: string; hint?: string }[] = [
    { key: "faq.title", label: "Section title" },
    {
      key: "faq.order",
      label: "FAQ order",
      hint: "JSON array of slot numbers. Updated when you drag or add/remove items below.",
    },
  ];
  for (let i = 1; i <= FAQ_MAX_SLOTS; i++) {
    fields.push(
      { key: `faq.q${i}`, label: `Question (slot ${i})` },
      { key: `faq.a${i}`, label: `Answer (slot ${i})` },
    );
  }
  return fields;
}
