"use client"

import { useRouter } from "next/navigation"

import { ChatComposer } from "@/components/check-chat/chat-composer"

export function DashboardComposer() {
  const router = useRouter()

  function handleSend(text: string) {
    const trimmed = text.trim()
    if (!trimmed) {
      return
    }
    router.push(`/check?message=${encodeURIComponent(trimmed)}`)
  }

  return <ChatComposer onSend={handleSend} />
}
