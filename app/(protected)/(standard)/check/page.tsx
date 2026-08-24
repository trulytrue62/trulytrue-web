import { Suspense } from "react"

import { CheckChat } from "@/components/check-chat/check-chat"

export default function CheckPage() {
  return (
    <div className="h-full">
      <Suspense fallback={null}>
        <CheckChat />
      </Suspense>
    </div>
  )
}
