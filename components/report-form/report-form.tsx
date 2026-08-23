"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { AnimatePresence, motion } from "motion/react"
import { CheckCircle2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { detectIdentifierType } from "@/components/report-form/identifier"
import { ReportProgress } from "@/components/report-form/report-progress"
import { ReportSummary } from "@/components/report-form/report-summary"
import {
  REPORT_STEPS,
  reportFormDefaultValues,
  reportFormSchema,
  type ReportFormValues,
} from "@/components/report-form/report-schema"
import { SimilarReportsSidebar } from "@/components/report-form/similar-reports-sidebar"
import { StepEvidence } from "@/components/report-form/step-evidence"
import { StepIdentifier } from "@/components/report-form/step-identifier"
import { StepLocation } from "@/components/report-form/step-location"
import { StepReview } from "@/components/report-form/step-review"
import { StepScamDetails } from "@/components/report-form/step-scam-details"
import type { ScamReport } from "@/types/report"

const STEP_COMPONENTS = [
  StepIdentifier,
  StepScamDetails,
  StepEvidence,
  StepLocation,
  StepReview,
]

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -24 : 24, opacity: 0 }),
}

function SuccessView() {
  useEffect(() => {
    void confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center gap-3 py-16 text-center"
    >
      <CheckCircle2Icon className="size-12 text-primary" />
      <h2 className="text-lg font-medium">Report submitted</h2>
      <p className="max-w-sm text-sm text-muted-foreground">
        Thanks for helping keep others safe. We&apos;ll review this report shortly.
      </p>
    </motion.div>
  )
}

export function ReportForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [similarReportsOpen, setSimilarReportsOpen] = useState(false)

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: reportFormDefaultValues,
    mode: "onChange",
  })

  const isLastStep = currentStep === REPORT_STEPS.length - 1
  const StepComponent = STEP_COMPONENTS[currentStep]

  async function goNext() {
    const fields = REPORT_STEPS[currentStep].fields
    const valid = fields.length === 0 || (await form.trigger(fields))
    if (!valid) {
      return
    }

    if (isLastStep) {
      await form.handleSubmit(onSubmit)()
      return
    }

    setDirection(1)
    setCurrentStep((step) => step + 1)
  }

  function goBack() {
    setDirection(-1)
    setCurrentStep((step) => Math.max(0, step - 1))
  }

  function onSubmit(values: ReportFormValues) {
    const [hours, minutes] = values.incidentTime.split(":").map(Number)
    const incidentDateTime = new Date(values.incidentDate)
    incidentDateTime.setHours(hours, minutes)

    const report: ScamReport = {
      identifierType: detectIdentifierType(values.identifierValue) ?? "phone",
      identifierValue: values.identifierValue,
      scamType: values.scamType,
      description: values.description,
      evidenceFileName: values.evidence?.name,
      incidentDateTime: incidentDateTime.toISOString(),
      country: values.country,
      region: values.region,
      status: "pending",
      submitterId: null,
      submittedAt: new Date().toISOString(),
    }

    console.log("Scam report submitted", report)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessView />
  }

  return (
    <div className="flex w-full flex-col gap-10 lg:flex-row">
      <aside className="w-full shrink-0 border-border/60 lg:w-52 lg:border-r lg:pr-8">
        <ReportProgress currentStep={currentStep} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {currentStep > 0 && (
          <ReportSummary form={form} onViewSimilarReports={() => setSimilarReportsOpen(true)} />
        )}

        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <StepComponent form={form} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button type="button" onClick={goNext} className="bg-indigo-600 text-white hover:bg-indigo-600/90">
            {isLastStep ? "Submit report" : "Next"}
          </Button>
        </div>
      </div>

      <Sheet open={similarReportsOpen} onOpenChange={setSimilarReportsOpen} modal={false}>
        <SheetContent side="right" overlay={false}>
          <SheetHeader>
            <SheetTitle>Similar reports</SheetTitle>
          </SheetHeader>
          <div className="px-6 pb-6">
            <SimilarReportsSidebar form={form} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
