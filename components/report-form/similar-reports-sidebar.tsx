"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { SearchIcon, ShieldCheckIcon } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { reportContent } from "@/data/report-content"
import { detectIdentifierType } from "@/utils/identifier"
import { getMockSimilarReports, type SimilarReportsResult } from "@/data/mock/similar-reports"

const SEARCH_DELAY_MS = 500
const content = reportContent.similarReportsDrawer

function IdleState() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-xs text-muted-foreground"
    >
      {content.idle}
    </motion.p>
  )
}

function SearchingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <SearchIcon className="size-3.5 animate-pulse" />
        {content.searching}
      </div>
      <Skeleton className="h-12 w-full rounded-2xl" />
      <Skeleton className="h-12 w-full rounded-2xl" />
    </motion.div>
  )
}

function ResultsFoundState({ result }: { result: SimilarReportsResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-3"
    >
      <p className="text-xs text-muted-foreground">
        <span className="font-medium text-primary">{result.count}</span> {content.resultPrefix}{" "}
        {content.resultSuffix(result.count)} {content.resultLocation}
      </p>
      <ul className="flex flex-col gap-2">
        {result.examples.map((example, index) => (
          <li key={index} className="rounded-2xl border border-border/60 bg-card px-3 py-2 text-xs">
            <p className="font-medium text-foreground">{example.scamType}</p>
            <p className="text-muted-foreground">{example.daysAgo}d ago</p>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function NoneFoundState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-start gap-2 text-xs text-muted-foreground"
    >
      <ShieldCheckIcon className="size-4 shrink-0 text-primary" />
      {content.noneFound}
    </motion.div>
  )
}

export function SimilarReportsSidebar({ identifierValue }: { identifierValue: string }) {
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
          <IdleState key="idle" />
        ) : searching ? (
          <SearchingState key="searching" />
        ) : result && result.count > 0 ? (
          <ResultsFoundState key="results" result={result} />
        ) : result ? (
          <NoneFoundState key="none" />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
