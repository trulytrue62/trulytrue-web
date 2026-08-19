import { GalleryVerticalEnd } from "lucide-react"

import { SignupForm } from "@/components/auth/signup-form"
import { siteContent } from "@/content/site"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        
        <SignupForm />
      </div>
    </div>
  )
}
