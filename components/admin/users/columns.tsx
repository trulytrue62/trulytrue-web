"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { format } from "date-fns"

import { UserActionsCell } from "@/components/admin/users/actions"
import type { UsersTableFeatures } from "@/components/admin/users/features"
import { UserStatusBadge } from "@/components/admin/status-badge"
import { Badge } from "@/components/ui/badge"
import { StackedCell } from "@/components/ui/stacked-cell"
import { adminContent } from "@/data/admin-content"
import { getMockReportCountBySubmitter } from "@/data/mock/admin-reports"
import type { AdminUser, UserRole, UserStatus } from "@/types/admin"

const content = adminContent.users.columns

const ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  moderator: "Moderator",
  admin: "Admin",
}

const ROLE_FILTER_OPTIONS = (Object.entries(ROLE_LABELS) as [UserRole, string][]).map(([value, label]) => ({
  value,
  label,
}))

const STATUS_FILTER_OPTIONS: { value: UserStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "banned", label: "Banned" },
]

const columnHelper = createColumnHelper<UsersTableFeatures, AdminUser>()

export function createUserColumns(
  onToggleBanned: (user: AdminUser) => void,
  onChangeRole: (user: AdminUser, role: UserRole) => void
) {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      header: content.name,
      sortFn: "text",
      cell: (info) => <StackedCell primary={info.getValue()} secondary={info.row.original.email} />,
    }),
    columnHelper.accessor("role", {
      header: content.role,
      filterFn: "equalsString",
      sortFn: "alphanumeric",
      meta: { filterOptions: ROLE_FILTER_OPTIONS },
      cell: (info) => <Badge variant="soft">{ROLE_LABELS[info.getValue()]}</Badge>,
    }),
    columnHelper.accessor("status", {
      header: content.status,
      filterFn: "equalsString",
      sortFn: "alphanumeric",
      meta: { filterOptions: STATUS_FILTER_OPTIONS },
      cell: (info) => <UserStatusBadge status={info.getValue()} />,
    }),
    columnHelper.accessor((row) => getMockReportCountBySubmitter(row.id), {
      id: "reportsSubmitted",
      header: content.reportsSubmitted,
    }),
    columnHelper.accessor("createdAt", {
      header: content.joined,
      sortFn: "datetime",
      cell: (info) => format(new Date(info.getValue()), "MMM d, yyyy"),
    }),
    columnHelper.display({
      id: "actions",
      cell: (info) => (
        <UserActionsCell user={info.row.original} onToggleBanned={onToggleBanned} onChangeRole={onChangeRole} />
      ),
    }),
  ])
}
