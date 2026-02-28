"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingCart } from "lucide-react";
import type { CalculatorItem } from "@/lib/calculator-data";

const WHATSAPP_NUMBER = "34600000000";

interface QuoteSummaryProps {
  items: (CalculatorItem & { quantity: number })[];
  total: number;
  locale: string;
  compact?: boolean;
}

export function QuoteSummary({ items, total, locale, compact }: QuoteSummaryProps) {
  const t = useTranslations("calculator");

  const buildWhatsAppUrl = () => {
    if (items.length === 0) return "#";
    const lines = items.map((item) => {
      const name = locale === "es" ? item.nameEs : item.nameEn;
      return `- ${name} x${item.quantity}: ${item.price * item.quantity}€`;
    });
    const message = `${t("whatsappMessage")}\n\n${lines.join("\n")}\n\n${t("total")}: ${total}€`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-brand-blue" />
          <span className="text-lg font-bold">{total}€</span>
          <span className="text-sm text-muted-foreground">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </div>
        <Button
          asChild
          className="h-11 bg-brand-green px-6 font-semibold text-white hover:bg-brand-green-light"
        >
          <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            {t("getQuote")}
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="font-heading text-lg font-bold">{t("yourQuote")}</h3>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{t("noItems")}</p>
      ) : (
        <>
          <ul className="mt-4 space-y-2">
            {items.map((item) => {
              const name = locale === "es" ? item.nameEs : item.nameEn;
              return (
                <li
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {name}{" "}
                    <span className="text-muted-foreground">
                      x{item.quantity}
                    </span>
                  </span>
                  <span className="font-medium">
                    {item.price * item.quantity}€
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <span className="font-heading text-base font-bold">
              {t("total")}
            </span>
            <span className="font-heading text-xl font-bold text-brand-blue">
              {total}€
            </span>
          </div>

          <Button
            asChild
            className="mt-4 h-12 w-full bg-brand-green text-base font-semibold text-white hover:bg-brand-green-light"
          >
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              {t("getQuote")}
            </a>
          </Button>
        </>
      )}
    </div>
  );
}
