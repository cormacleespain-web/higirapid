"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useMergedT } from "@/hooks/useMergedT";

type FormState = "idle" | "sending" | "success" | "error";

export type LeadInquiryFormProps = {
  sourcePath: string;
  /** Shown above fields when `showHeading` is true. */
  heading?: string;
  /** When booking for a specific service, email subject and DB row include this. */
  serviceSlug?: string | null;
  serviceTitle?: string | null;
  /** If set, inquiry type is not shown and this value is sent. */
  fixedInquiryType?: "home" | "business";
  showInquiryTypeSelect?: boolean;
  /** Hide the form title (e.g. when the parent dialog already has a heading). */
  showHeading?: boolean;
  /** Override consent checkbox label (default: HR-Club copy). */
  consentLabel?: string;
};

export default function LeadInquiryForm({
  sourcePath,
  heading,
  serviceSlug,
  serviceTitle,
  fixedInquiryType,
  showInquiryTypeSelect = true,
  showHeading = true,
  consentLabel,
}: LeadInquiryFormProps) {
  const locale = useLocale();
  const t = useMergedT("hrClubForm");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successExtra, setSuccessExtra] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccessExtra(null);
    setState("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const inquiryType = fixedInquiryType ?? String(fd.get("inquiryType") ?? "").trim();
    const payload = {
      locale,
      sourcePath,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      inquiryType,
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      serviceSlug: serviceSlug?.trim() || undefined,
      serviceTitle: serviceTitle?.trim() || undefined,
    };

    try {
      const response = await fetch("/api/hr-club-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as {
        message?: string;
        success?: boolean;
        emailSent?: boolean;
        persisted?: boolean;
      };
      if (!response.ok) {
        throw new Error(body.message || "Request failed");
      }
      if (body.persisted === true && body.emailSent === false) {
        setSuccessExtra(t("successNoEmail"));
      }
      form.reset();
      setState("success");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : t("error"));
    }
  }

  const idPrefix = serviceSlug ? `svc-${serviceSlug}` : "hr";

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-labelledby={showHeading ? `${idPrefix}-lead-heading` : undefined}>
      {showHeading ? (
        <h2 id={`${idPrefix}-lead-heading`} className="text-2xl font-semibold text-content-primary">
          {heading}
        </h2>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="block text-sm font-medium text-content-primary">
            {t("name")}
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            required
            autoComplete="name"
            className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="block text-sm font-medium text-content-primary">
            {t("email")}
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </div>
      </div>
      {fixedInquiryType && !showInquiryTypeSelect ? (
        <input type="hidden" name="inquiryType" value={fixedInquiryType} />
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="block text-sm font-medium text-content-primary">
            {t("phone")}
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            autoComplete="tel"
            className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </div>
        {showInquiryTypeSelect ? (
          <div>
            <label htmlFor={`${idPrefix}-type`} className="block text-sm font-medium text-content-primary">
              {t("inquiryType")}
            </label>
            <select
              id={`${idPrefix}-type`}
              name="inquiryType"
              required
              className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
            >
              <option value="">{t("inquiryTypePlaceholder")}</option>
              <option value="home">{t("typeHome")}</option>
              <option value="business">{t("typeBusiness")}</option>
            </select>
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`} className="block text-sm font-medium text-content-primary">
          {t("message")}
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          minLength={10}
          required
          className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-content-secondary">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 rounded border-border text-primary" />
        {consentLabel ?? t("consent")}
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="focus-ring rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? t("sending") : t("submit")}
      </button>
      {state === "success" ? (
        <div className="space-y-1">
          <p className="text-sm text-success">{t("success")}</p>
          {successExtra ? <p className="text-sm text-content-secondary">{successExtra}</p> : null}
        </div>
      ) : null}
      {state === "error" ? <p className="text-sm text-error">{error ?? t("error")}</p> : null}
    </form>
  );
}
