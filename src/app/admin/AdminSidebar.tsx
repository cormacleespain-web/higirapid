"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "./signout-action";
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

export default function AdminSidebar() {
  const pathname = usePathname() ?? "";

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
