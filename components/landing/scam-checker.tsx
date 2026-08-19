"use client"

import { useState } from "react"
import {
  ArrowUpIcon,
  LinkIcon,
  MailIcon,
  MessageSquareIcon,
  PhoneIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  {
    label: "Check a phone number",
    icon: PhoneIcon,
    example: "+91 98765 43210",
  },
  {
    label: "Check a link",
    icon: LinkIcon,
    example: "http://bit.ly/free-prize",
  },
  {
    label: "Check an email",
    icon: MailIcon,
    example: "support@bank-verify.com",
  },
  {
    label: "Check a message",
    icon: MessageSquareIcon,
    example: "You've won a lottery, click here to claim",
  },
]

const PLACEHOLDER_REPLY =
  "🟡 SUSPICIOUS — real-time checking isn't wired up yet, this is a placeholder result. Once live, this will combine community reports and AI analysis and explain why."

export function ScamChecker() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  function submit(value: string) {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "user", content: trimmed },
      { id: prev.length + 1, role: "assistant", content: PLACEHOLDER_REPLY },
    ])
    setInput("")
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit(input)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {messages.length > 0 && (
        <div className="flex flex-col items-start gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                message.role === "user"
                  ? "self-end bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative w-full">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste a phone number, URL, email, UPI ID, or message to check"
          className="h-14 rounded-3xl px-5 pr-14 text-base shadow-sm"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
        >
          <ArrowUpIcon />
        </Button>
      </form>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion.label}
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => submit(suggestion.example)}
            >
              <suggestion.icon />
              {suggestion.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
