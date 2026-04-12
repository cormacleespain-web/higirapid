"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { signOutAdmin } from "./signout-action";
import { applyLiveSiteUpdatesAction, refreshPublicContentAction } from "./actions";
import { defaultLocale } from "@/i18n/config";

const links = [
  { href: "/admin", label: "Dashboard", match: (p: string) => p === "/admin" },
  { href: "/admin/settings", label: "Site settings", match: (p: string) => p.startsWith("/admin/settings") },
  { href: "/admin/services", label: "Services", match: (p: string) => p.startsWith("/admin/services") },
  { href: "/admin/blog", label: "Blog posts", match: (p: string) => p.startsWith("/admin/blog") },
  { href: "/admin/leads", label: "Leads", match: (p: string) => p.startsWith("/admin/leads") },
  { href: "/admin/gallery", label: "Gallery", match: (p: string) => p.startsWith("/admin/gallery") },
  { href: "/admin/content", label: "Page copy", match: (p: string) => p.startsWith("/admin/content") },
] as const;

export default function AdminSidebar({ deployHookEnabled = false }: { deployHookEnabled?: boolean }) {
  const pathname = usePathname() ?? "";
  const [pendingRefresh, startRefresh] = useTransition();
  const [pendingHook, startHook] = useTransition();

  function handleRefreshPublic() {
    startRefresh(async () => {
      const result = await refreshPublicContentAction();
      if (result.ok) {
        toast.success("Live content refreshed for visitors.");
      } else {
        toast.error(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  function handleApplyLiveUpdates() {
    startHook(async () => {
      const result = await applyLiveSiteUpdatesAction();
      if (result.ok) {
        toast.success("Updates will appear on the site shortly.");
      } else {
        toast.error(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface-primary shadow-sm">
      <div className="border-b border-border bg-surface-subtle/80 px-4 py-4">
        <p className="font-heading text-lg font-bold italic text-content-primary">HigiRapid</p>
        <p className="text-xs font-medium text-content-secondary">Content admin</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Admin">
        {links.map((l) => {
          const active = l.match(pathname);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`focus-ring rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-l-[3px] border-primary bg-primary/10 text-primary"
                  : "border-l-[3px] border-transparent text-content-secondary hover:bg-surface-subtle hover:text-content-primary"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-3 space-y-2">
        <button
          type="button"
          onClick={handleRefreshPublic}
          disabled={pendingRefresh}
          className="focus-ring w-full rounded-md border border-border bg-surface-primary px-3 py-2.5 text-left text-sm font-medium text-content-primary shadow-sm transition-colors hover:bg-surface-subtle disabled:opacity-60"
        >
          {pendingRefresh ? "Refreshing…" : "Refresh what visitors see"}
        </button>
        {deployHookEnabled ? (
          <>
            <p className="px-1 text-xs text-content-secondary">
              If the site still shows old text or images after saving, you can apply a full update.
            </p>
            <button
              type="button"
              onClick={handleApplyLiveUpdates}
              disabled={pendingHook}
              className="focus-ring w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-content-secondary transition-colors hover:bg-surface-subtle hover:text-content-primary disabled:opacity-60"
            >
              {pendingHook ? "Starting…" : "Apply updates to the live site"}
            </button>
          </>
        ) : null}
      </div>
      <div className="border-t border-border p-3">
        <Link
          href={`/${defaultLocale}`}
          className="focus-ring mb-2 block rounded-md px-3 py-2.5 text-sm font-medium text-content-secondary transition-colors hover:bg-surface-subtle hover:text-primary"
        >
          View website
        </Link>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="focus-ring w-full rounded-md px-3 py-2.5 text-left text-sm text-content-secondary transition-colors hover:bg-surface-subtle hover:text-content-primary"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
