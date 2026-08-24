import { Suspense } from "react"

import { DotPattern } from "@/components/ui/dot-pattern"
import { ReportForm } from "@/components/report-form/report-form"

export default function ReportPage() {
  return (
    <div className="relative h-full px-4 pt-8 sm:px-10">
      <DotPattern
        width={28}
        height={28}
        className="text-primary/25 [mask-image:linear-gradient(to_top_left,black,transparent)]"
      />

      <div className="relative flex w-full flex-col gap-10">
        <Suspense fallback={null}>
          <ReportForm />
        </Suspense>
      </div>
    </div>
  )
}
