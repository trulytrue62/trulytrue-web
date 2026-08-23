"use client"

import { CheckIcon } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { REPORT_STEPS } from "@/schemas/report-schema"

export function ReportProgress({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex flex-col">
      {REPORT_STEPS.map((step, index) => {
        const isComplete = index < currentStep
        const isActive = index === currentStep
        const isLast = index === REPORT_STEPS.length - 1

        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors duration-300",
                  (isComplete || isActive) && "bg-primary text-primary-foreground",
                  isActive && "ring-4 ring-primary/20",
                  !isComplete && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? <CheckIcon className="size-4" /> : index + 1}
              </motion.div>
              {!isLast && (
                <div className="my-1 w-0.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="w-full bg-primary"
                    initial={false}
                    animate={{ height: isComplete ? "100%" : "0%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              )}
            </div>
            <div className={cn("text-left", !isLast && "pb-8")}>
              <p
                className={cn(
                  "pt-1 text-sm font-medium text-muted-foreground",
                  isActive && "text-foreground"
                )}
              >
                {step.title}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
