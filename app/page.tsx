import { LandingNavbar } from "@/components/landing/navbar"
import { ScamChecker } from "@/components/landing/scam-checker"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex flex-1 flex-col items-center gap-8 px-6 py-16 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Check before you trust it.
          </h1>
          <p className="max-w-lg text-muted-foreground">
            TruelyTrue checks phone numbers, URLs, emails, UPI IDs, and
            messages against community reports and AI analysis, so you can
            spot a scam before it costs you.
          </p>
        </div>
        <ScamChecker />
      </main>
    </div>
  )
}
