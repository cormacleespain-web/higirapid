import { getAllHrClubLeadsAdmin } from "@/lib/admin-queries";
import { isDatabaseConfigured } from "@/db/index";
import { deleteLeadFormAction } from "../../actions";
import Link from "next/link";
import { AdminDoubleConfirmDeleteForm } from "@/components/admin/AdminDoubleConfirmDeleteForm";
import { LeadStatusForm } from "@/components/admin/LeadStatusForm";

const tabs = ["new", "open", "closed"] as const;

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function AdminLeadsPage({ searchParams }: Props) {
  const { tab } = await searchParams;
  const activeTab = tabs.includes((tab ?? "").toLowerCase() as (typeof tabs)[number])
    ? ((tab ?? "").toLowerCase() as (typeof tabs)[number])
    : "new";
  const dbOk = isDatabaseConfigured();
  const leads = dbOk ? await getAllHrClubLeadsAdmin() : [];
  const counts = {
    new: leads.filter((lead) => lead.status === "new").length,
    open: leads.filter((lead) => lead.status === "contacted" || lead.status === "qualified").length,
    closed: leads.filter((lead) => lead.status === "closed").length,
  };
  const filteredLeads = leads.filter((lead) => {
    if (activeTab === "new") return lead.status === "new";
    if (activeTab === "open") return lead.status === "contacted" || lead.status === "qualified";
    return lead.status === "closed";
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">Leads</h1>
      <p className="mt-2 text-sm text-content-secondary">
        HR-Club and service booking submissions appear here. Update status and notes as you follow up.
      </p>
      <nav className="mt-4 flex flex-wrap gap-2" aria-label="Lead status tabs">
        {tabs.map((key) => {
          const isActive = key === activeTab;
          const label = key[0].toUpperCase() + key.slice(1);
          return (
            <Link
              key={key}
              href={`/admin/leads?tab=${key}`}
              className={`focus-ring rounded-md border px-3 py-1.5 text-sm font-medium ${
                isActive
                  ? "border-primary bg-primary text-content-inverse"
                  : "border-border bg-surface-primary text-content-secondary hover:bg-surface-subtle"
              }`}
            >
              {label} ({counts[key]})
            </Link>
          );
        })}
      </nav>

      {!dbOk && <p className="mt-6 text-sm text-amber-800">Set DATABASE_URL and run migrations to manage leads.</p>}

      {dbOk && filteredLeads.length === 0 ? (
        <p className="mt-6 rounded-md border border-border bg-surface-primary p-4 text-sm text-content-secondary">
          No leads in this tab yet. New submissions from the HR-Club page or Our Services booking form will appear here.
        </p>
      ) : null}

      <div className="mt-6 space-y-4">
        {filteredLeads.map((lead) => (
          <article key={lead.id} className="rounded-lg border border-border bg-surface-primary p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium text-content-primary">{lead.name}</p>
                <p className="text-xs text-content-secondary">
                  {lead.email} {lead.phone ? `· ${lead.phone}` : ""} · {lead.createdAt}
                </p>
              </div>
              <span className="rounded bg-surface-subtle px-2 py-1 text-xs font-medium uppercase text-content-secondary">
                {lead.status}
              </span>
            </div>

            {lead.serviceSlug ? (
              <p className="mt-2 text-xs font-medium text-primary">
                Service: <span className="font-mono">{lead.serviceSlug}</span>
              </p>
            ) : null}
            <p className="mt-2 text-sm text-content-secondary">
              <span className="text-xs uppercase text-content-secondary/80">Source</span> · {lead.sourcePath} · Type:{" "}
              {lead.inquiryType}
            </p>
            <p className="mt-3 text-sm text-content-secondary">{lead.message}</p>

            <LeadStatusForm leadId={lead.id} status={lead.status} internalNotes={lead.internalNotes} />
            <div className="mt-3 flex justify-end">
              <AdminDoubleConfirmDeleteForm
                action={deleteLeadFormAction}
                itemId={lead.id}
                title="Delete lead"
                description="This will permanently remove this lead from admin."
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
