"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useMergedT } from "@/hooks/useMergedT";
import { getQuoteHref } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

const navItems = [
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "hrClub", href: "/hr-club" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "#faq" },
] as const;

function resolveNavHref(href: string): string {
  return href.startsWith("#") ? `/${href}` : href;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header({ whatsappE164 }: { whatsappE164: string }) {
  const t = useTranslations("nav");
  const tHero = useMergedT("hero");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0);
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const main = document.getElementById("main");
      if (main) main.setAttribute("aria-hidden", "true");
    } else {
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      if (main) main.removeAttribute("aria-hidden");
    }
    return () => {
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      if (main) main.removeAttribute("aria-hidden");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !mobileMenuRef.current) return;
    const menu = mobileMenuRef.current;
    const focusables = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusables[0];
    if (first) first.focus();
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        e.preventDefault();
        return;
      }
      if (e.key !== "Tab" || !mobileMenuRef.current) return;
      const menu = mobileMenuRef.current;
      const focusables = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const target = e.target as HTMLElement;
      if (e.shiftKey) {
        if (target === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (target === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <header className="relative sticky top-0 z-40 bg-primary border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-16 md:h-18 min-w-0">
        <Link href="/" className="flex items-center shrink-0 min-w-0 max-w-[140px] md:max-w-[180px]" aria-label="HigiRapid home">
          <img
            src="/logos/web-header-logo.svg"
            alt="HigiRapid"
            className="h-6 md:h-8 w-auto max-h-8 object-contain object-left"
            width={579}
            height={86}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink min-w-0 flex-1 justify-center" aria-label={tCommon("mainNav")}>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={resolveNavHref(item.href)}
              className="text-white font-medium hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded px-1 whitespace-nowrap"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden lg:block">
            <LanguageSwitcher variant="inverse" />
          </div>
          <a
            href={getQuoteHref(locale, whatsappE164)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors font-medium whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            {tHero("ctaQuote")}
          </a>

          <button
            ref={hamburgerRef}
            type="button"
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? tCommon("closeMenu") : tCommon("openMenu")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className="absolute left-0 right-0 bottom-0 w-full overflow-hidden"
        style={{ height: "4px" }}
        role="presentation"
        aria-hidden
      >
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            backgroundColor: "#add84f",
          }}
        />
      </div>

      {menuOpen && (
        <div
          role="presentation"
          aria-hidden
          className="lg:hidden fixed inset-0 top-16 md:top-[4.5rem] bottom-0 z-[25] bg-black/40"
          onClick={closeMenu}
        />
      )}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-16 md:top-[4.5rem] bottom-0 z-30 bg-surface-primary border-t border-border overflow-auto ${menuOpen ? "block" : "hidden"}`}
        role="region"
        aria-label={tCommon("mobileMenu")}
        aria-hidden={!menuOpen}
      >
        <div className="px-4 py-6 flex flex-col gap-1 min-h-full">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={resolveNavHref(item.href)}
              className="py-3 text-content-primary font-medium hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded px-3"
              onClick={closeMenu}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium text-content-secondary mb-2 px-1">{tFooter("language")}</p>
            <LanguageSwitcher variant="default" />
          </div>
          <a
            href={getQuoteHref(locale, whatsappE164)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block"
            onClick={closeMenu}
          >
            <Button variant="whatsapp" fullWidth className="inline-flex items-center justify-center gap-2">
              <WhatsAppIcon />
              {tHero("ctaQuote")}
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
