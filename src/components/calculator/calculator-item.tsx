"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalculatorItem as ItemType } from "@/lib/calculator-data";

interface CalculatorItemProps {
  item: ItemType;
  quantity: number;
  onUpdate: (delta: number) => void;
  locale: string;
}

export function CalculatorItem({ item, quantity, onUpdate, locale }: CalculatorItemProps) {
  const name = locale === "es" ? item.nameEs : item.nameEn;
  const isSelected = quantity > 0;

  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
        isSelected
          ? "border-brand-green bg-brand-green/5 shadow-sm"
          : "border-border bg-card hover:border-brand-blue/30"
      }`}
    >
      <button
        type="button"
        onClick={() => !isSelected && onUpdate(1)}
        className="flex-1 text-left"
      >
        <span className="text-sm font-medium lg:text-base">{name}</span>
        <span className="ml-2 text-sm font-semibold text-brand-blue">
          {item.price}€
        </span>
      </button>

      {isSelected ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdate(-1)}
            className="h-9 w-9 min-h-[44px] min-w-[44px] rounded-full"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center text-sm font-bold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdate(1)}
            className="h-9 w-9 min-h-[44px] min-w-[44px] rounded-full"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onUpdate(1)}
          className="h-9 w-9 min-h-[44px] min-w-[44px] rounded-full text-muted-foreground hover:text-brand-green"
        >
          <Plus className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
