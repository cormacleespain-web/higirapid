"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageToggle } from "./language-toggle";
import Image from "next/image";

const WHATSAPP_NUMBER = "34600000000";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/upholstery", label: t("upholstery") },
    { href: "/car-detailing", label: t("carDetailing") },
    { href: "/gallery", label: t("gallery") },
    { href: "/faq", label: t("faq") },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:justify-between lg:h-18">
        {/* Mobile: menu button (left) */}
        <div className="flex flex-1 lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <Image
                    src="/images/logo.png"
                    alt="Higirap"
                    width={120}
                    height={35}
                    className="h-8 w-auto"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="h-11 w-11"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-1 flex-col gap-1 p-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "bg-secondary text-brand-blue"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t p-4">
                  <Button
                    asChild
                    className="w-full bg-brand-green hover:bg-brand-green-light text-white gap-2 h-12 text-base"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      {t("getQuote")}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - centered on mobile, left-aligned on desktop */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-text.png"
            alt="Higirap"
            width={140}
            height={40}
            className="h-8 w-auto lg:hidden"
            priority
          />
          <Image
            src="/images/logo.png"
            alt="Higirap"
            width={168}
            height={48}
            className="hidden lg:block lg:h-12 lg:w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-brand-blue ${
                pathname === link.href
                  ? "text-brand-blue"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button asChild className="bg-brand-green hover:bg-brand-green-light text-white gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t("getQuote")}
            </a>
          </Button>
        </div>

        {/* Mobile: language toggle (right) */}
        <div className="flex flex-1 justify-end lg:hidden">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
