"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Higirap"
              width={140}
              height={40}
              className="h-10 w-auto brightness-110"
            />
            <p className="text-sm text-white/70">
              Higienización con Rapidez
            </p>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-green">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/upholstery"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {t("upholstery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/car-detailing"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {t("carDetailing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-green">
              {t("info")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {t("gallery")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-brand-green">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+34600000000" className="hover:text-white">
                  +34 600 000 000
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@higirap.com" className="hover:text-white">
                  info@higirap.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="h-4 w-4 shrink-0" />
                <span>{t("hours")}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Higirap. {t("rights")}
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <span className="cursor-pointer hover:text-white/70">
              {t("legal")}
            </span>
            <span className="cursor-pointer hover:text-white/70">
              {t("privacy")}
            </span>
            <span className="cursor-pointer hover:text-white/70">
              {t("cookies")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
