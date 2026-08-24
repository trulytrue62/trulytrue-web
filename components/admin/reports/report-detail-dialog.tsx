"use client"

import { useState } from "react"
import { CheckIcon, MessageCircleQuestionIcon, PaperclipIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ReportStatusBadge } from "@/components/admin/status-badge"
import type { ReportDecision } from "@/components/admin/reports/decision"
import { adminContent } from "@/data/admin-content"
import { getMockUserById } from "@/data/mock/admin-users"
import { scamTypes } from "@/data/mock/scam-types"
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
  const scamTypeLabel =
    scamTypes.find((type) => type.value === activeReport.scamType)?.label ?? activeReport.scamType

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
          <DialogTitle className="flex items-center gap-2">
            <Icon className="size-4 text-muted-foreground" />
            {activeReport.identifierValue}
          </DialogTitle>
          <DialogDescription>
            {scamTypeLabel} &middot; {activeReport.region}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 text-sm">
          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted p-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">{adminContent.reports.columns.submittedBy}</span>
              <span className="font-medium text-foreground">{submitter?.name ?? "Unknown"}</span>
              <span className="text-xs text-muted-foreground">{submitter?.email}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">{adminContent.reports.columns.status}</span>
              <ReportStatusBadge status={activeReport.status} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-foreground">Description</span>
            <p className="rounded-2xl border border-border/60 bg-card p-3 text-foreground">
              {activeReport.description}
            </p>
          </div>

          {activeReport.evidenceFileName && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-foreground">Evidence</span>
              <span className="flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground">
                <PaperclipIcon className="size-3.5" />
                {activeReport.evidenceFileName}
              </span>
            </div>
          )}

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
              <Button type="button" variant="destructive" onClick={() => setMode("reject")}>
                <XIcon />
                {content.reject}
              </Button>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={() => setMode("request_info")}>
                  <MessageCircleQuestionIcon />
                  {content.requestInfo}
                </Button>
                <Button type="button" onClick={handleApprove}>
                  <CheckIcon />
                  {content.approve}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button type="button" variant="ghost" onClick={() => setMode("view")}>
                {content.cancel}
              </Button>
              <Button type="button" disabled={!note.trim()} onClick={handleSubmitNote}>
                {content.submit}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
