"use client";

/**
 * Wraps a server form action and asks for confirmation before submit.
 */
export function AdminConfirmDeleteForm({
  action,
  confirmMessage,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  confirmMessage: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </form>
  );
}
