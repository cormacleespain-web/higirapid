"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "34600000000";

export function WhatsAppFab() {
  const t = useTranslations("whatsapp");
  const message = encodeURIComponent(t("defaultMessage"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("tooltip")}
      className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <MessageCircle className="h-7 w-7" fill="white" stroke="white" />
    </a>
  );
}
