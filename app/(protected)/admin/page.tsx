import { AdminShell } from "@/components/admin/admin-shell"

export default function AdminPage() {
  return (
    <div className="h-full min-h-0 p-4 sm:p-6">
      <div className="h-full min-h-0 rounded-3xl border border-border/60 bg-card p-6">
        <AdminShell />
      </div>
    </div>
  )
}
