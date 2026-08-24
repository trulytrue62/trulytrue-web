"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, CheckIcon, MapPinIcon, MessageCircleQuestionIcon, PaperclipIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload"
import { IconRevealButton } from "@/components/ui/icon-reveal-button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import type { ReportDecision } from "@/components/admin/reports/decision"
import { adminContent } from "@/data/mock/admin-content"
import { getMockUserById } from "@/data/mock/admin-users"
import { getScamTypeLabel } from "@/data/mock/scam-types"
import { identifierTypeIcons } from "@/utils/identifier"
import type { ScamReport } from "@/types/report"

const content = adminContent.reports.dialog

type DialogMode = "view" | "reject" | "request_info"

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

export function ReportDetailDialog({
  report,
  open,
  onOpenChange,
  onDecision,
}: {
  report: ScamReport | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onDecision: (reportId: string, decision: ReportDecision) => void
}) {
  const [mode, setMode] = useState<DialogMode>("view")
  const [note, setNote] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const [wasOpen, setWasOpen] = useState(open)

  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setMode("view")
      setNote("")
      setAttachment(null)
    }
  }

  if (!report) {
    return null
  }

  const activeReport = report
  const Icon = identifierTypeIcons[activeReport.identifierType]
  const submitter = getMockUserById(activeReport.createdBy)

  function handleApprove() {
    onDecision(activeReport.id, { type: "approve" })
    onOpenChange(false)
  }

  function handleSubmitNote() {
    const trimmed = note.trim()
    if (!trimmed) {
      return
    }
    if (mode === "reject") {
      onDecision(activeReport.id, { type: "reject", reason: trimmed })
    } else if (mode === "request_info") {
      onDecision(activeReport.id, {
        type: "request_info",
        message: trimmed,
        attachmentName: attachment?.name,
      })
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pr-6">
            {activeReport.id}
            <ReportStatusBadge status={activeReport.status} />
          </DialogTitle>
          <DialogDescription>Reported by {submitter?.name ?? "Unknown"}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-7 text-sm">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/50 p-4">
            <div className="flex items-center gap-2 text-base font-medium text-foreground">
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <span className="break-all">{activeReport.identifierValue}</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              <Badge variant="soft">{getScamTypeLabel(activeReport.scamType)}</Badge>
              <span className="flex items-center gap-1.5">
                <MapPinIcon className="size-4 shrink-0" />
                {activeReport.region}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-4 shrink-0" />
                {format(new Date(activeReport.createdAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>

          <Section label={adminContent.reports.columns.description}>
            <p className="text-foreground">{activeReport.description}</p>
          </Section>

          <Section label="Evidence">
            {activeReport.evidenceFileName ? (
              <span className="flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                <PaperclipIcon className="size-3.5" />
                {activeReport.evidenceFileName}
              </span>
            ) : (
              <p className="text-muted-foreground">No evidence attached</p>
            )}
          </Section>

          {activeReport.rejectionReason && (
            <Section label={content.existingRejectionReason}>
              <p className="text-muted-foreground">{activeReport.rejectionReason}</p>
            </Section>
          )}
          {activeReport.infoRequestMessage && (
            <Section label={content.existingInfoRequest}>
              <p className="text-muted-foreground">{activeReport.infoRequestMessage}</p>
            </Section>
          )}

          <Separator />

          {mode !== "view" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-foreground">
                {mode === "reject" ? content.rejectReasonLabel : content.infoRequestLabel}
              </label>
              <Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={mode === "reject" ? content.rejectReasonPlaceholder : content.infoRequestPlaceholder}
                rows={3}
                autoFocus
              />
              {mode === "request_info" && (
                <div className="overflow-hidden rounded-2xl border border-dashed border-border">
                  <FileUpload onChange={(files) => setAttachment(files[0] ?? null)} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          {mode === "view" ? (
            <>
              <IconRevealButton icon={XIcon} label={content.reject} variant="destructive" onClick={() => setMode("reject")} />
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <IconRevealButton
                  icon={MessageCircleQuestionIcon}
                  label={content.requestInfo}
                  variant="outline"
                  onClick={() => setMode("request_info")}
                />
                <IconRevealButton icon={CheckIcon} label={content.approve} onClick={handleApprove} />
              </div>
            </>
          ) : (
            <>
              <IconRevealButton icon={XIcon} label={content.cancel} variant="ghost" onClick={() => setMode("view")} />
              <IconRevealButton
                icon={CheckIcon}
                label={content.submit}
                disabled={!note.trim()}
                onClick={handleSubmitNote}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
