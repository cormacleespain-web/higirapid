"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalculatorItem } from "@/components/calculator/calculator-item";
import { QuoteSummary } from "@/components/calculator/quote-summary";
import { SectionHeader } from "@/components/shared/section-header";
import type { CalculatorItem as ItemType } from "@/lib/calculator-data";

interface PriceCalculatorProps {
  items: ItemType[];
  categories: { key: string; label: string }[];
}

export function PriceCalculator({ items, categories }: PriceCalculatorProps) {
  const t = useTranslations("calculator");
  const locale = useLocale();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const selectedItems = useMemo(() => {
    return Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = items.find((i) => i.id === id)!;
        return { ...item, quantity: qty };
      });
  }, [quantities, items]);

  const total = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [selectedItems]);

  return (
    <section className="py-14 lg:py-20" id="calculator">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue={categories[0].key}>
              <TabsList className="flex w-full overflow-x-auto">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.key}
                    value={cat.key}
                    className="min-h-[44px] flex-1 whitespace-nowrap text-xs sm:text-sm"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((cat) => (
                <TabsContent key={cat.key} value={cat.key} className="mt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {items
                      .filter((item) => item.category === cat.key)
                      .map((item) => (
                        <CalculatorItem
                          key={item.id}
                          item={item}
                          quantity={quantities[item.id] || 0}
                          onUpdate={(delta) => updateQuantity(item.id, delta)}
                          locale={locale}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Desktop sidebar summary */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <QuoteSummary
                items={selectedItems}
                total={total}
                locale={locale}
              />
            </div>
          </div>
        </div>

        {/* Mobile sticky bottom bar */}
        {total > 0 && (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur lg:hidden"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <QuoteSummary
              items={selectedItems}
              total={total}
              locale={locale}
              compact
            />
          </div>
        )}
      </div>
    </section>
  );
}
