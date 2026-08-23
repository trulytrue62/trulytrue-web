import { DotPattern } from "@/components/ui/dot-pattern"
import { Separator } from "@/components/ui/separator"
import { reportContent } from "@/data/report-content"
import { ReportForm } from "@/components/report-form/report-form"

export default function ReportPage() {
  return (
    <div className="relative h-full sm:px-10">
      <DotPattern
        width={28}
        height={28}
        className="text-primary/25 [mask-image:linear-gradient(to_top_left,black,transparent)]"
      />

      <div className="relative flex w-full flex-col gap-10">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{reportContent.page.title}</h1>
            {/* <p className="text-sm text-muted-foreground">
              Help others stay safe by reporting a suspicious phone number, URL, email, UPI ID etc.
            </p> */}
             
          </div>
        
        </div>
              
        <ReportForm />
      </div>
    </div>
  )
}
