import { getTranslations } from "next-intl/server";
import { parseFaqOrder } from "@/lib/faq-content";

/** FAQ Q/A pairs for JSON-LD, aligned with visible FAQ section (same order/slots). */
export async function getFaqPairsForLocale(locale: string): Promise<{ question: string; answer: string }[]> {
  const t = await getTranslations({ locale, namespace: "faq" });
  const orderedSlots = parseFaqOrder(t("order"));
  const pairs: { question: string; answer: string }[] = [];
  for (const slot of orderedSlots) {
    const q = t(`q${slot}` as never);
    const a = t(`a${slot}` as never);
    if (q.trim() && a.trim()) {
      pairs.push({ question: q, answer: a });
    }
  }
  return pairs;
}
