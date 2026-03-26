"use client";

import { useRef } from "react";
import { updateLeadStatusAction } from "@/app/admin/actions";

const statusOptions = ["new", "contacted", "qualified", "closed"] as const;

export function LeadStatusForm({
  leadId,
  status,
  internalNotes,
}: {
  leadId: string;
  status: string;
  internalNotes: string | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={updateLeadStatusAction} className="mt-4 grid gap-3 sm:grid-cols-3">
      <input type="hidden" name="id" value={leadId} />
      <input type="hidden" name="internal_notes" value={internalNotes ?? ""} />
      <div>
        <label htmlFor={`status-${leadId}`} className="block text-xs text-content-secondary">
          Status
        </label>
        <select
          id={`status-${leadId}`}
          name="status"
          defaultValue={status}
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm"
          onChange={() => formRef.current?.requestSubmit()}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <p className="text-xs text-content-secondary">
          Changing status updates this lead immediately and refreshes the list.
        </p>
      </div>
    </form>
  );
}
