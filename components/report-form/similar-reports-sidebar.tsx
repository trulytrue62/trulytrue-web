"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { SearchIcon, ShieldCheckIcon } from "lucide-react"
import { useWatch, type UseFormReturn } from "react-hook-form"

import { Skeleton } from "@/components/ui/skeleton"
import { detectIdentifierType } from "@/components/report-form/identifier"
import { getMockSimilarReports, type SimilarReportsResult } from "@/components/report-form/similar-reports"
import type { ReportFormValues } from "@/components/report-form/report-schema"

const SEARCH_DELAY_MS = 500

export function SimilarReportsSidebar({ form }: { form: UseFormReturn<ReportFormValues> }) {
  const identifierValue = useWatch({ control: form.control, name: "identifierValue" })
  const isSearchable = Boolean(identifierValue) && detectIdentifierType(identifierValue ?? "") !== null
  const [result, setResult] = useState<SimilarReportsResult | null>(null)
  const [resolvedFor, setResolvedFor] = useState<string | null>(null)
  const searching = isSearchable && resolvedFor !== identifierValue

  useEffect(() => {
    if (!isSearchable) {
      return
    }

    const timeout = setTimeout(() => {
      setResult(getMockSimilarReports(identifierValue ?? ""))
      setResolvedFor(identifierValue ?? null)
    }, SEARCH_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [identifierValue, isSearchable])

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {!isSearchable ? (
          <motion.p
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground"
          >
            We&apos;ll check for matching reports once you enter what you&apos;re reporting.
          </motion.p>
        ) : searching ? (
          <motion.div
            key="searching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <SearchIcon className="size-3.5 animate-pulse" />
              Checking for matches&hellip;
            </div>
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </motion.div>
        ) : result && result.count > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-indigo-600">{result.count}</span> other{" "}
              {result.count === 1 ? "report" : "reports"} for this identifier
            </p>
            <ul className="flex flex-col gap-2">
              {result.examples.map((example, index) => (
                <li
                  key={index}
                  className="rounded-2xl border border-border/60 bg-card px-3 py-2 text-xs"
                >
                  <p className="font-medium text-foreground">{example.scamType}</p>
                  <p className="text-muted-foreground">{example.daysAgo}d ago</p>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : result ? (
          <motion.div
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 text-xs text-muted-foreground"
          >
            <ShieldCheckIcon className="size-4 shrink-0 text-indigo-600" />
            No prior reports found for this identifier yet.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
