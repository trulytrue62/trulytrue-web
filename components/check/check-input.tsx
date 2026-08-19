"use client"

import { useRef, useState } from "react"
import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  attachment?: string
}

const SUGGESTIONS = [
  {
    description: "Check a phone number",
    example: "+91 98765 43210",
  },
  {
    description: "Check a link",
    example: "bit.ly/claim-prize",
  },
  {
    description: "Check an email",
    example: "support@bank-verify.com",
  },
  {
    description: "Check a message",
    example: "You've won a lottery, click here to claim",
  },
]

const PLACEHOLDER_REPLY =
  "🟡 SUSPICIOUS — real-time checking isn't wired up yet, this is a placeholder result. Once live, this will combine community reports and AI analysis and explain why."

  interface CheckInputProps {
    showSuggestions?  : boolean
    placeholderText? : string
  }

export function CheckInput({showSuggestions = true,placeholderText = ''} : CheckInputProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function submit(value: string) {
    const trimmed = value.trim()
    if (!trimmed && !attachment) {
      return
    }

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length,
        role: "user",
        content: trimmed || "(screenshot only, no message)",
        attachment: attachment?.name,
      },
      { id: prev.length + 1, role: "assistant", content: PLACEHOLDER_REPLY },
    ])
    setInput("")
    setAttachment(null)
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
                  : "border bg-card"
              )}
            >
              {message.attachment && (
                <div className="mb-1 flex items-center gap-1 text-xs opacity-80">
                  <PaperclipIcon className="size-3" />
                  {message.attachment}
                </div>
              )}
              {message.content}
            </div>
          ))}
        </div>
      )}

      {attachment && (
        <div className="flex w-fit items-center gap-2 rounded-full border bg-card py-1.5 pr-2 pl-3 text-xs">
          <PaperclipIcon className="size-3.5" />
          <span className="max-w-40 truncate">{attachment.name}</span>
          <button
            type="button"
            onClick={() => setAttachment(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-1 rounded-3xl border bg-background p-2 shadow-sm"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => setAttachment(event.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
        >
          <PaperclipIcon />
        </Button>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholderText}
          className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0"
        />
        <Button type="submit" size="icon">
          <ArrowUpIcon />
        </Button>
      </form>

      {messages.length === 0 && showSuggestions &&  (
        <div className="flex flex-nowrap justify-center gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <Button
              key={suggestion.example}
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              aria-label={suggestion.description}
              onClick={() => submit(suggestion.example)}
            >
              {suggestion.example}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
