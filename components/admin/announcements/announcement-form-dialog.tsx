"use client"

import { useState } from "react"
import { PaperclipIcon, SendIcon, SaveIcon, XIcon } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { FileUpload } from "@/components/ui/file-upload"
import { IconRevealButton } from "@/components/ui/icon-reveal-button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { adminContent } from "@/data/admin-content"
import type { Announcement, AnnouncementType } from "@/types/admin"

const content = adminContent.announcements.dialog
const typeContent = adminContent.announcements.type

const ANNOUNCEMENT_TYPES: AnnouncementType[] = ["alert", "update", "tip"]

export type AnnouncementFormValues = {
  title: string
  content: string
  type: AnnouncementType
  published: boolean
  attachmentName?: string
}

export function AnnouncementFormDialog({
  announcement,
  open,
  onOpenChange,
  onSave,
}: {
  announcement: Announcement | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: AnnouncementFormValues, id?: string) => void
}) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [type, setType] = useState<AnnouncementType>("update")
  const [attachment, setAttachment] = useState<File | null>(null)
  const [wasOpen, setWasOpen] = useState(open)

  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setTitle(announcement?.title ?? "")
      setBody(announcement?.content ?? "")
      setType(announcement?.type ?? "update")
      setAttachment(null)
    }
  }

  const isValid = title.trim().length > 0 && body.trim().length > 0

  function handleSave(published: boolean) {
    if (!isValid) {
      return
    }
    onSave(
      {
        title: title.trim(),
        content: body.trim(),
        type,
        published,
        attachmentName: attachment?.name ?? announcement?.attachmentName,
      },
      announcement?.id
    )
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="truncate pr-6">{announcement ? announcement.title : content.newTitle}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="announcement-title">{content.titleLabel}</FieldLabel>
            <Input
              id="announcement-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={content.titlePlaceholder}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="announcement-content">{content.contentLabel}</FieldLabel>
            <Textarea
              id="announcement-content"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={content.contentPlaceholder}
              rows={4}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="announcement-type">{content.typeLabel}</FieldLabel>
            <Select value={type} onValueChange={(value) => setType(value as AnnouncementType)}>
              <SelectTrigger id="announcement-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ANNOUNCEMENT_TYPES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {typeContent[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Attachment (optional)</FieldLabel>
            {attachment ?? announcement?.attachmentName ? (
              <span className="flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                <PaperclipIcon className="size-3.5" />
                {attachment?.name ?? announcement?.attachmentName}
              </span>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-dashed border-border">
                <FileUpload onChange={(files) => setAttachment(files[0] ?? null)} />
              </div>
            )}
          </Field>
        </div>

        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <IconRevealButton icon={XIcon} label={content.cancel} variant="ghost" onClick={() => onOpenChange(false)} />
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <IconRevealButton
              icon={SaveIcon}
              label={content.saveDraft}
              variant="outline"
              disabled={!isValid}
              onClick={() => handleSave(false)}
            />
            <IconRevealButton icon={SendIcon} label={content.publish} disabled={!isValid} onClick={() => handleSave(true)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
