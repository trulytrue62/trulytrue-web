"use client"

import { useMemo, useState } from "react"
import { PlusIcon } from "lucide-react"

import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { AnnouncementFormDialog, type AnnouncementFormValues } from "@/components/admin/announcements/announcement-form-dialog"
import { createAnnouncementColumns } from "@/components/admin/announcements/columns"
import { features } from "@/components/admin/announcements/features"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { adminContent } from "@/data/admin-content"
import { currentUser } from "@/data/mock/user"
import { mockAnnouncements } from "@/data/mock/admin-announcements"
import type { Announcement } from "@/types/admin"

const content = adminContent.announcements

export function AnnouncementsTable({ showNewButton = true }: { showNewButton?: boolean }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [search, setSearch] = useState("")
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return announcements
    }
    return announcements.filter((announcement) =>
      [announcement.title, announcement.content].join(" ").toLowerCase().includes(query)
    )
  }, [announcements, search])

  function handleNew() {
    setEditingAnnouncement(null)
    setDialogOpen(true)
  }

  function handleEdit(announcement: Announcement) {
    setEditingAnnouncement(announcement)
    setDialogOpen(true)
  }

  function handleTogglePublished(announcement: Announcement) {
    const now = new Date().toISOString()
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === announcement.id
          ? { ...item, published: !item.published, updatedAt: now, updatedBy: currentUser.id }
          : item
      )
    )
  }

  function handleSave(values: AnnouncementFormValues, id?: string) {
    const now = new Date().toISOString()
    if (id) {
      setAnnouncements((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...values, updatedAt: now, updatedBy: currentUser.id } : item))
      )
      return
    }
    setAnnouncements((prev) => [
      {
        id: crypto.randomUUID(),
        createdAt: now,
        createdBy: currentUser.id,
        updatedAt: now,
        updatedBy: currentUser.id,
        isDeleted: false,
        ...values,
      },
      ...prev,
    ])
  }

  const columns = useMemo(() => createAnnouncementColumns(handleEdit, handleTogglePublished), [])

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <AdminPageHeader
        title={content.title}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder={content.searchPlaceholder}
        action={
          showNewButton && (
            <Button type="button" size="sm" onClick={handleNew}>
              <PlusIcon />
              {content.newButton}
            </Button>
          )
        }
      />

      <div className="min-h-0 flex-1">
        <DataTable
          features={features}
          columns={columns}
          data={filteredAnnouncements}
          altRows
          emptyMessage={content.empty}
        />
      </div>

      <AnnouncementFormDialog
        announcement={editingAnnouncement}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
      />
    </div>
  )
}
