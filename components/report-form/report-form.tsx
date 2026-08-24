"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import { AnimatePresence, motion } from "motion/react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2Icon, LockIcon, ShieldCheckIcon } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { reportContent } from "@/data/report-content"
import { currentUser } from "@/data/mock/user"
import { detectIdentifierType } from "@/utils/identifier"
import { detectApproximateRegion } from "@/utils/geo"
import { ReportProgress } from "@/components/report-form/report-progress"
import { ReportSummary } from "@/components/report-form/report-summary"
import {
  getReportFormDefaultValues,
  REPORT_STEPS,
  reportFormSchema,
  type ReportFormValues,
} from "@/schemas/report-schema"
import { SimilarReportsDialog } from "@/components/report-form/similar-reports-dialog"
import { StepEvidence } from "@/components/report-form/steps/step-evidence"
import { StepIdentifier } from "@/components/report-form/steps/step-identifier"
import { StepReview } from "@/components/report-form/steps/step-review"
import { StepScamDetails } from "@/components/report-form/steps/step-scam-details"
import { createAuditFields } from "@/types/audit"
import type { ScamReport } from "@/types/report"

const STEP_COMPONENTS = [
  StepIdentifier,
  StepScamDetails,
  StepEvidence,
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
      <h2 className="text-lg font-medium">{reportContent.success.title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{reportContent.success.description}</p>
    </motion.div>
  )
}

export function ReportForm() {
  const searchParams = useSearchParams()
  const prefilledIdentifier = searchParams.get("identifier") ?? ""
  const hasValidPrefill = Boolean(prefilledIdentifier) && detectIdentifierType(prefilledIdentifier) !== null

  const [currentStep, setCurrentStep] = useState(hasValidPrefill ? 1 : 0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [similarReportsOpen, setSimilarReportsOpen] = useState(false)

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: getReportFormDefaultValues(prefilledIdentifier),
    mode: "onChange",
  })

  const identifierValue = useWatch({ control: form.control, name: "identifierValue" })
  const isLastStep = currentStep === REPORT_STEPS.length - 1
  const StepComponent = STEP_COMPONENTS[currentStep]

  useEffect(() => {
    if (form.getValues("region")) {
      return
    }
    const detected = detectApproximateRegion()
    if (detected) {
      form.setValue("region", detected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      id: crypto.randomUUID(),
      identifierType: detectIdentifierType(values.identifierValue) ?? "phone",
      identifierValue: values.identifierValue,
      scamType: values.scamType,
      description: values.description,
      evidenceFileName: values.evidence?.name,
      incidentDateTime: incidentDateTime.toISOString(),
      region: values.region,
      status: "pending",
      ...createAuditFields(currentUser.id),
    }

    console.log("Scam report submitted", report)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessView />
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-8">
      <div className="flex w-full flex-1 flex-col gap-10 lg:flex-row">
        <aside className="w-full shrink-0 border-border/60 lg:w-72 lg:border-r lg:pr-8">
          <ReportProgress currentStep={currentStep} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="surface-card overflow-hidden p-6 shadow-sm">
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
              {reportContent.actions.back}
            </Button>
            <Button type="button" onClick={goNext}>
              {isLastStep ? reportContent.actions.submit : reportContent.actions.next}
            </Button>
          </div>
        </div>
      </div>

      {currentStep > 0 && <div className="flex justify-center"><ReportSummary  form={form} onViewSimilarReports={() => setSimilarReportsOpen(true)} /> </div>}

      <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShieldCheckIcon className="size-3.5" />
          {reportContent.footer.reviewed}
        </span>
        <span className="flex items-center gap-1.5">
          <LockIcon className="size-3.5" />
          {reportContent.footer.private}
        </span>
      </footer>

      <SimilarReportsDialog
        identifierValue={identifierValue ?? ""}
        open={similarReportsOpen}
        onOpenChange={setSimilarReportsOpen}
        title={reportContent.similarReportsDrawer.title}
      />
    </div>
  )
}
