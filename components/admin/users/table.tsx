"use client"

import { useMemo, useState } from "react"

import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { createUserColumns } from "@/components/admin/users/columns"
import { features } from "@/components/admin/users/features"
import { UserDetailDialog } from "@/components/admin/users/user-detail-dialog"
import { DataTable } from "@/components/ui/data-table"
import { adminContent } from "@/data/mock/admin-content"
import { currentUser } from "@/data/mock/user"
import { mockUsers } from "@/data/mock/admin-users"
import { touchAuditFields } from "@/types/audit"
import type { User } from "@/types/user"
import type { ScamReport } from "@/types/report"

const content = adminContent.users

export function UsersTable({
  reports,
  onSelectReport,
}: {
  reports: ScamReport[]
  onSelectReport: (reportId: string) => void
}) {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return users
    }
    return users.filter((user) => [user.name, user.email].join(" ").toLowerCase().includes(query))
  }, [users, search])

  function handleToggleBanned(user: User) {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id
          ? touchAuditFields({ ...item, status: item.status === "banned" ? "active" : "banned" }, currentUser.id)
          : item
      )
    )
  }

  const columns = useMemo(() => createUserColumns(handleToggleBanned), [])

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <AdminPageHeader
        title={content.title}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={content.searchPlaceholder}
      />

      <div className="min-h-0 flex-1">
        <DataTable
          features={features}
          columns={columns}
          data={filteredUsers}
          altRows
          emptyMessage={content.empty}
          onRowClick={setSelectedUser}
        />
      </div>

      <UserDetailDialog
        user={selectedUser}
        reports={selectedUser ? reports.filter((report) => report.createdBy === selectedUser.id) : []}
        open={selectedUser !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedUser(null)
          }
        }}
        onSelectReport={onSelectReport}
      />
    </div>
  )
}
