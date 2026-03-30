"use client";

import { useMemo, useState } from "react";
import { LOCALES } from "@/lib/content-admin-keys";
import type { ContentDefaultsMap } from "@/lib/content-defaults";
import { localeNames, type Locale } from "@/i18n/config";
import { FAQ_MAX_SLOTS, parseFaqOrder, stringifyFaqOrder } from "@/lib/faq-content";

function ck(locale: string, entryKey: string) {
  return `${locale}::${entryKey}`;
}

function arrayMove<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function resolveOrder(values: Record<string, string>, defaults: ContentDefaultsMap): number[] {
  for (const loc of LOCALES) {
    const v = (values[ck(loc, "faq.order")] ?? "").trim();
    if (v) return parseFaqOrder(v);
  }
  for (const loc of LOCALES) {
    const d = (defaults[loc as Locale]["faq.order"] ?? "").trim();
    if (d) return parseFaqOrder(d);
  }
  return parseFaqOrder(null);
}

function effectiveLine(
  slot: number,
  kind: "q" | "a",
  loc: Locale,
  values: Record<string, string>,
  defaults: ContentDefaultsMap,
): string {
  const key = `faq.${kind}${slot}`;
  const o = (values[ck(loc, key)] ?? "").trim();
  const fb = (defaults[loc][key] ?? "").trim();
  return o || fb || "";
}

type Props = {
  values: Record<string, string>;
  setCell: (locale: string, entryKey: string, value: string) => void;
  defaults: ContentDefaultsMap;
};

export default function FaqItemsAdmin({ values, setCell, defaults }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);

  const order = useMemo(() => resolveOrder(values, defaults), [values, defaults]);

  function persistOrder(next: number[]) {
    const s = stringifyFaqOrder(next);
    for (const loc of LOCALES) {
      setCell(loc, "faq.order", s);
    }
  }

  function nextFreeSlot(current: number[]): number | null {
    const used = new Set(current);
    for (let i = 1; i <= FAQ_MAX_SLOTS; i++) {
      if (!used.has(i)) return i;
    }
    return null;
  }

  function previewLabel(slot: number): string {
    const q = effectiveLine(slot, "q", "en", values, defaults);
    return q || "(Empty question)";
  }

  function clearSlotOverrides(slot: number) {
    for (const loc of LOCALES) {
      setCell(loc, `faq.q${slot}`, "");
      setCell(loc, `faq.a${slot}`, "");
    }
  }

  const canAdd = nextFreeSlot(order) !== null;

  return (
    <div className="mt-8 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-content-secondary">
          Drag rows to reorder how FAQs appear on the website. Expand a row to edit each language. Save the FAQ section
          when you are done.
        </p>
        <button
          type="button"
          disabled={!canAdd}
          onClick={() => {
            const slot = nextFreeSlot(order);
            if (slot === null) return;
            persistOrder([...order, slot]);
            setExpandedSlot(slot);
          }}
          className="focus-ring rounded-md bg-primary px-3 py-2 text-sm font-medium text-content-inverse disabled:opacity-50"
        >
          Add FAQ
        </button>
      </div>

      {order.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-surface-subtle/50 px-4 py-6 text-center text-sm text-content-secondary">
          No FAQs in the list. Use &quot;Add FAQ&quot; to create one.
        </p>
      ) : null}

      <ul className="space-y-2">
        {order.map((slot, index) => (
          <li
            key={slot}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex === null || dragIndex === index) return;
              persistOrder(arrayMove(order, dragIndex, index));
              setDragIndex(null);
            }}
            className="rounded-lg border border-border bg-surface-primary px-4 py-3 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <span className="cursor-grab select-none text-content-secondary" aria-hidden>
                  ::
                </span>
                <span className="truncate text-sm font-medium text-content-primary">
                  <span className="text-content-secondary">Slot {slot}</span>
                  <span className="mx-2 text-border">·</span>
                  {previewLabel(slot)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExpandedSlot((s) => (s === slot ? null : slot))}
                  className="focus-ring text-sm font-medium text-primary hover:underline"
                >
                  {expandedSlot === slot ? "Collapse" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!window.confirm("Remove this FAQ from the list? Overrides for this slot will be cleared.")) {
                      return;
                    }
                    const next = order.filter((s) => s !== slot);
                    persistOrder(next);
                    clearSlotOverrides(slot);
                    if (expandedSlot === slot) setExpandedSlot(null);
                  }}
                  className="focus-ring text-sm text-error hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedSlot === slot ? (
              <div className="mt-4 space-y-6 border-t border-border pt-4">
                {LOCALES.map((loc) => {
                  const qKey = `faq.q${slot}`;
                  const aKey = `faq.a${slot}`;
                  const defQ = defaults[loc as Locale][qKey] ?? "";
                  const defA = defaults[loc as Locale][aKey] ?? "";
                  const overrideQ = values[ck(loc, qKey)] ?? "";
                  const overrideA = values[ck(loc, aKey)] ?? "";
                  const hasCustom =
                    overrideQ.trim() !== "" || overrideA.trim() !== "";
                  return (
                    <div key={loc} className="rounded-md border border-border bg-surface-subtle/60 p-4">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-content-secondary">
                          {localeNames[loc as Locale]} ({loc})
                        </p>
                        {hasCustom ? (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900">
                            Custom text
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-xs text-content-secondary">Website default</p>
                          <div className="rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-secondary">
                            {defQ || (
                              <span className="italic text-content-secondary/70">No default string</span>
                            )}
                          </div>
                          <label className="text-xs text-content-secondary" htmlFor={ck(loc, qKey)}>
                            Your question
                          </label>
                          <textarea
                            id={ck(loc, qKey)}
                            rows={2}
                            value={overrideQ}
                            onChange={(e) => setCell(loc, qKey, e.target.value)}
                            placeholder="Leave empty to use the default above"
                            className="focus-ring w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-secondary/60"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-content-secondary">Website default</p>
                          <div className="rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-secondary">
                            {defA || (
                              <span className="italic text-content-secondary/70">No default string</span>
                            )}
                          </div>
                          <label className="text-xs text-content-secondary" htmlFor={ck(loc, aKey)}>
                            Your answer
                          </label>
                          <textarea
                            id={ck(loc, aKey)}
                            rows={4}
                            value={overrideA}
                            onChange={(e) => setCell(loc, aKey, e.target.value)}
                            placeholder="Leave empty to use the default above"
                            className="focus-ring w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-secondary/60"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
