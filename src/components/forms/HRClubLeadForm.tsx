"use client";

import { useLocale } from "next-intl";
import { useMergedT } from "@/hooks/useMergedT";
import LeadInquiryForm from "@/components/forms/LeadInquiryForm";

export default function HRClubLeadForm() {
  const locale = useLocale();
  const t = useMergedT("hrClubForm");

  return (
    <div className="rounded-xl border border-border bg-surface-primary p-6 shadow-sm">
      <LeadInquiryForm
        sourcePath={`/${locale}/hr-club`}
        heading={t("formHeading")}
        showInquiryTypeSelect
      />
    </div>
  );
}
