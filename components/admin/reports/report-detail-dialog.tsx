"use client"

import { useState } from "react"
import { CheckIcon, MessageCircleQuestionIcon, PaperclipIcon, XIcon } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DetailRow } from "@/components/ui/detail-row"
import { FileUpload } from "@/components/ui/file-upload"
import { IconRevealButton } from "@/components/ui/icon-reveal-button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import { scamTypeLabel } from "@/components/admin/reports/columns"
import type { ReportDecision } from "@/components/admin/reports/decision"
import { adminContent } from "@/data/admin-content"
import { getMockUserById } from "@/data/mock/admin-users"
import { identifierTypeIcons } from "@/utils/identifier"
import type { ScamReport } from "@/types/report"

const content = adminContent.reports.dialog

type DialogMode = "view" | "reject" | "request_info"

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
          <DialogTitle className="flex items-center justify-between gap-2 pr-6">
            <span className="flex items-center gap-2">
              <Icon className="size-4 text-muted-foreground" />
              {activeReport.id}
            </span>
            <ReportStatusBadge status={activeReport.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex flex-col">
            <DetailRow label={adminContent.reports.columns.category} value={scamTypeLabel(activeReport.scamType)} />
            <DetailRow label="Identifier" value={activeReport.identifierValue} />
            <DetailRow label={adminContent.reports.columns.location} value={activeReport.region} />
            <DetailRow
              label={adminContent.reports.columns.submittedBy}
              value={
                submitter ? (
                  <span className="flex flex-col">
                    <span>{submitter.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{submitter.email}</span>
                  </span>
                ) : (
                  "Unknown"
                )
              }
            />
            <DetailRow label={adminContent.reports.columns.description} value={activeReport.description} />
            <DetailRow
              label="Evidence"
              value={
                activeReport.evidenceFileName ? (
                  <span className="inline-flex items-center gap-1.5">
                    <PaperclipIcon className="size-3.5" />
                    {activeReport.evidenceFileName}
                  </span>
                ) : undefined
              }
            />
          </div>

          {activeReport.rejectionReason && (
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{content.existingRejectionReason}: </span>
              {activeReport.rejectionReason}
            </p>
          )}
          {activeReport.infoRequestMessage && (
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{content.existingInfoRequest}: </span>
              {activeReport.infoRequestMessage}
            </p>
          )}

          <Separator />

          {mode === "view" ? (
            <p className="text-xs font-medium text-muted-foreground">Decision</p>
          ) : (
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
