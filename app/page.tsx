import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { LandingNavbar } from "@/components/landing/navbar"
import { ScamChecker } from "@/components/landing/scam-checker"
import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth"

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex flex-1 flex-col items-start gap-10 px-6 py-20 text-left md:px-16">
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Check before you trust it.
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            TruelyTrue checks phone numbers, URLs, emails, UPI IDs, and
            messages against community reports and AI analysis, so you can
            spot a scam before it costs you.
          </p>
          <Button size="lg" className="w-fit" render={<Link href="#check" />}>
            Check now
            <ArrowRightIcon />
          </Button>
        </div>
        <div id="check" className="w-full max-w-2xl scroll-mt-20">
          <ScamChecker />
        </div>
      </main>
    </div>
  )
}
