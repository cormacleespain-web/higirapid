"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/config";

type Variant = "default" | "inverse";

export default function LanguageSwitcher({ variant = "default" }: { variant?: Variant }) {
  const currentLocale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInverse = variant === "inverse";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const locales = (Object.keys(localeNames) as Locale[]).filter((l) => l !== currentLocale);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="locale-listbox"
        id="locale-trigger"
        className={
          isInverse
            ? "flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-white/15 rounded-md hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary min-w-[7rem] justify-center"
            : "flex items-center gap-1 px-3 py-2 text-sm font-medium text-content-primary bg-surface-subtle rounded-md hover:bg-border/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-w-[7rem] justify-center"
        }
      >
        <span>{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          id="locale-listbox"
          role="listbox"
          aria-labelledby="locale-trigger"
          className="absolute right-0 top-full mt-1 py-1 w-full min-w-[7rem] bg-surface-primary border border-border rounded-md shadow-md z-50"
        >
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={false}>
              <Link
                href="/"
                locale={locale}
                className="block px-3 py-2 text-sm text-content-primary hover:bg-surface-subtle focus:outline-none focus:bg-surface-subtle focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setOpen(false)}
              >
                {localeNames[locale]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
