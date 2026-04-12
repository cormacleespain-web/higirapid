import AdminSidebar from "../AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const deployHookEnabled = Boolean(process.env.VERCEL_DEPLOY_HOOK_URL?.trim());

  return (
    <div className="flex min-h-screen">
      <AdminSidebar deployHookEnabled={deployHookEnabled} />
      <main className="min-h-screen flex-1 overflow-auto bg-surface-subtle/50 p-6 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
