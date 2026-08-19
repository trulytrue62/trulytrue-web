import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { LandingNavbar } from "@/components/landing/navbar"
import { CheckInput } from "@/components/check/check-input"
import { authOptions } from "@/lib/auth"

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-20 text-center md:px-16">
        <p className=" text-md text-muted-foreground">
          Paste a phone number, link, email, UPI ID, message or upload a
          screenshot to check it against community reports.
        </p>
        <div className="w-full max-w-2xl">
          <CheckInput />
        </div>
      </main>
    </div>
  )
}
