"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { X } from "lucide-react";
import LeadInquiryForm from "@/components/forms/LeadInquiryForm";

export default function ServiceBookingOverlay({
  open,
  onClose,
  serviceSlug,
  serviceTitle,
}: {
  open: boolean;
  onClose: () => void;
  serviceSlug: string;
  serviceTitle: string;
}) {
  const locale = useLocale();
  const t = useTranslations("servicesPage");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-booking-dialog-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-surface-primary p-5 shadow-xl sm:max-h-[90vh] sm:rounded-2xl sm:p-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="service-booking-dialog-title" className="pr-8 text-xl font-semibold text-content-primary">
            {t("bookingDialogTitle", { service: serviceTitle })}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring -m-2 shrink-0 rounded-md p-2 text-content-secondary hover:bg-surface-subtle"
            aria-label={t("closeBooking")}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <LeadInquiryForm
          sourcePath={`/${locale}/services#${serviceSlug}`}
          showHeading={false}
          serviceSlug={serviceSlug}
          serviceTitle={serviceTitle}
          fixedInquiryType="home"
          showInquiryTypeSelect={false}
          consentLabel={t("bookingConsent")}
        />
      </div>
    </div>
  );
}
