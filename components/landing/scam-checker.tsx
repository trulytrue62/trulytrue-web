"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

const PLACEHOLDER_REPLY =
  "🟡 SUSPICIOUS — real-time checking isn't wired up yet, this is a placeholder result. Once live, this will combine community reports and AI analysis and explain why."

export function ScamChecker() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const value = input.trim()
    if (!value) {
      return
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "user", content: value },
      { id: prev.length + 1, role: "assistant", content: PLACEHOLDER_REPLY },
    ])
    setInput("")
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 rounded-xl border bg-card p-4">
      <div className="flex min-h-40 flex-col gap-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Paste a phone number, URL, email, UPI ID, or message to check it.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted"
              )}
            >
              {message.content}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. +91 98765 43210, http://..., name@bank.com"
        />
        <Button type="submit">Check</Button>
      </form>
    </div>
  )
}
