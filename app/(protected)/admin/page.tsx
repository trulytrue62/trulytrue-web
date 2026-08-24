import { AdminShell } from "@/components/admin/admin-shell"

export default function AdminPage() {
  return (
    <div className="h-full min-h-0 p-4 sm:p-6">
      <div className="h-full min-h-0 rounded-4xl  bg-card/20 glass-panel p-8 ">
        <AdminShell />
      </div>
    </div>
  )
}
