"use client";

import { useId, useRef, useState } from "react";

export function AdminDoubleConfirmDeleteForm({
  action,
  itemId,
  triggerLabel = "Delete",
  title = "Delete item",
  description = "This action cannot be undone.",
}: {
  action: (formData: FormData) => void | Promise<void>;
  itemId: string;
  triggerLabel?: string;
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  const [verification, setVerification] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const inputId = useId();

  const canDelete = verification.trim().toUpperCase() === "DELETE";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring rounded-md border border-error/40 px-3 py-1.5 text-sm text-error hover:bg-error/10"
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface-primary p-5 shadow-lg">
            <h3 className="text-lg font-semibold text-content-primary">{title}</h3>
            <p className="mt-2 text-sm text-content-secondary">{description}</p>
            <p className="mt-2 text-sm text-content-secondary">
              Type <span className="font-semibold text-content-primary">DELETE</span> to confirm.
            </p>
            <label htmlFor={inputId} className="mt-4 block text-xs text-content-secondary">
              Verification
            </label>
            <input
              id={inputId}
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm"
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setVerification("");
                }}
                className="focus-ring rounded-md border border-border px-3 py-2 text-sm text-content-secondary hover:bg-surface-subtle"
              >
                Cancel
              </button>
              <form ref={formRef} action={action}>
                <input type="hidden" name="id" value={itemId} />
                <button
                  type="submit"
                  disabled={!canDelete}
                  className="focus-ring rounded-md border border-error/40 px-3 py-2 text-sm font-medium text-error hover:bg-error/10 disabled:opacity-50"
                >
                  Delete lead
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
