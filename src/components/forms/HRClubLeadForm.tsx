"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useMergedT } from "@/hooks/useMergedT";

type FormState = "idle" | "sending" | "success" | "error";

export default function HRClubLeadForm() {
  const locale = useLocale();
  const t = useMergedT("hrClubForm");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setState("sending");
    const form = e.currentTarget;
    const payload = {
      locale,
      sourcePath: `/${locale}/hr-club`,
      name: String(new FormData(form).get("name") ?? ""),
      email: String(new FormData(form).get("email") ?? ""),
      phone: String(new FormData(form).get("phone") ?? ""),
      inquiryType: String(new FormData(form).get("inquiryType") ?? ""),
      message: String(new FormData(form).get("message") ?? ""),
      consent: new FormData(form).get("consent") === "on",
    };

    try {
      const response = await fetch("/api/hr-club-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message || "Request failed");
      }
      form.reset();
      setState("success");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : t("error"));
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-surface-primary p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-content-primary">Get in Touch</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hr-name" className="block text-sm font-medium text-content-primary">
            {t("name")}
          </label>
          <input id="hr-name" name="name" required className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2" />
        </div>
        <div>
          <label htmlFor="hr-email" className="block text-sm font-medium text-content-primary">
            {t("email")}
          </label>
          <input
            id="hr-email"
            name="email"
            type="email"
            required
            className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hr-phone" className="block text-sm font-medium text-content-primary">
            {t("phone")}
          </label>
          <input id="hr-phone" name="phone" className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2" />
        </div>
        <div>
          <label htmlFor="hr-type" className="block text-sm font-medium text-content-primary">
            {t("inquiryType")}
          </label>
          <select id="hr-type" name="inquiryType" required className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2">
            <option value="">{t("inquiryTypePlaceholder")}</option>
            <option value="home">{t("typeHome")}</option>
            <option value="business">{t("typeBusiness")}</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="hr-message" className="block text-sm font-medium text-content-primary">
          {t("message")}
        </label>
        <textarea
          id="hr-message"
          name="message"
          rows={5}
          minLength={10}
          required
          className="focus-ring mt-1 w-full rounded-md border border-border px-3 py-2"
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-content-secondary">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 rounded border-border text-primary" />
        {t("consent")}
      </label>
      <button
        type="submit"
        disabled={state === "sending"}
        className="focus-ring rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? t("sending") : t("submit")}
      </button>
      {state === "success" ? <p className="text-sm text-success">{t("success")}</p> : null}
      {state === "error" ? <p className="text-sm text-error">{error ?? t("error")}</p> : null}
    </form>
  );
}
