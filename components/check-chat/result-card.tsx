"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangleIcon, CheckCircle2Icon, ShieldAlertIcon } from "lucide-react"

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"
import { Button } from "@/components/ui/button"
import { checkContent } from "@/data/mock/check-content"
import { cn } from "@/lib/utils"
import { SimilarReportsDialog } from "@/components/report-form/similar-reports-dialog"
import type { CheckResult } from "@/data/mock/check-analysis"

const VERDICT_STYLES = {
  safe: {
    icon: CheckCircle2Icon,
    gaugeColor: "var(--color-safe)",
    badgeClassName: "bg-safe/10 text-safe",
  },
  suspicious: {
    icon: AlertTriangleIcon,
    gaugeColor: "var(--color-suspicious)",
    badgeClassName: "bg-suspicious/10 text-suspicious",
  },
  unsafe: {
    icon: ShieldAlertIcon,
    gaugeColor: "var(--color-danger)",
    badgeClassName: "bg-danger/10 text-danger",
  },
} as const

export function ResultCard({ result }: { result: CheckResult }) {
  const [similarOpen, setSimilarOpen] = useState(false)
  const style = VERDICT_STYLES[result.verdict]
  const VerdictIcon = style.icon
  const verdictContent = checkContent.verdict[result.verdict]

  return (
    <div className="surface-card w-full p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <AnimatedCircularProgressBar
          value={result.score}
          gaugePrimaryColor={style.gaugeColor}
          gaugeSecondaryColor="var(--muted)"
          className="size-16 shrink-0 text-sm font-semibold"
        />
        <div className="flex flex-col gap-1 pt-1">
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              style.badgeClassName
            )}
          >
            <VerdictIcon className="size-3.5" />
            {verdictContent.label}
          </span>
          <p className="text-sm text-muted-foreground">{verdictContent.description}</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2 border-t border-border/60 pt-4">
        {result.reasons.map((reason, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-foreground">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            {reason}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4">
        <Button type="button" variant="ghost" size="sm" onClick={() => setSimilarOpen(true)}>
          {checkContent.actions.viewSimilarReports}
        </Button>
        {result.verdict !== "safe" && result.extractedIdentifier && (
          <Button
            type="button"
            size="sm"
            render={
              <Link href={`/report?identifier=${encodeURIComponent(result.extractedIdentifier)}`} />
            }
          >
            {checkContent.actions.report}
          </Button>
        )}
      </div>

      <SimilarReportsDialog
        identifierValue={result.extractedIdentifier ?? ""}
        open={similarOpen}
        onOpenChange={setSimilarOpen}
        title={checkContent.similarReportsDrawerTitle}
      />
    </div>
  )
}
