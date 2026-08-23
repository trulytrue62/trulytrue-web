"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { DotPattern } from "@/components/ui/dot-pattern"
import { checkContent } from "@/data/check-content"
import { analyzeMessage } from "@/data/mock/check-analysis"
import { ChatComposer } from "@/components/check-chat/chat-composer"
import { ChatMessageItem } from "@/components/check-chat/chat-message"
import logo from "@/public/logo.png"
import type { ChatAttachment, ChatMessage } from "@/types/chat"

const ANALYZE_DELAY_MS = 700

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: "greeting", role: "assistant", kind: "text", text: checkContent.greeting },
]

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
        <Image src={logo} alt="Assistant" className="size-5" />
      </div>
      <div className="flex w-fit items-center gap-1 rounded-3xl bg-muted px-4 py-3">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${index * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export function CheckChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isAnalyzing])

  function handleSend(text: string, attachment?: ChatAttachment) {
    const trimmed = text.trim()
    if (!trimmed && !attachment) {
      return
    }

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", kind: "text", text: trimmed, attachment },
    ])
    setIsAnalyzing(true)

    setTimeout(() => {
      const result = analyzeMessage(trimmed)
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", kind: "result", text: trimmed, result },
      ])
      setIsAnalyzing(false)
    }, ANALYZE_DELAY_MS)
  }

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <DotPattern
        width={28}
        height={28}
        className="text-primary/25 [mask-image:linear-gradient(to_top_left,black,transparent)]"
      />

      <div className="relative flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-8">
          {messages.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}

          {isAnalyzing && <TypingIndicator />}
          <div ref={endRef} />
        </div>
      </div>

      <div className="relative flex flex-col gap-3 px-4 pb-4">
        <ChatComposer onSend={handleSend} disabled={isAnalyzing} />
        {messages.length === 1 && !isAnalyzing && (
          <div className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-2">
            {checkContent.examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleSend(example)}
                className="rounded-full border border-primary/40 bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-sm transition-all hover:scale-105 hover:border-primary hover:bg-primary/20"
              >
                {example}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
