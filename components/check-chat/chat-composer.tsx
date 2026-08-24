"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpIcon, FileIcon, PaperclipIcon, XIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { checkContent } from "@/data/check-content"
import type { ChatAttachment } from "@/types/chat"

type PendingAttachment = {
  file: File
  isImage: boolean
  previewUrl: string | null
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function toPendingAttachment(file: File): PendingAttachment {
  const isImage = file.type.startsWith("image/")
  return { file, isImage, previewUrl: isImage ? URL.createObjectURL(file) : null }
}

export function ChatComposer({
  onSend,
  disabled,
}: {
  onSend: (text: string, attachment?: ChatAttachment) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState("")
  const [attachment, setAttachment] = useState<PendingAttachment | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (attachment?.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl)
      }
    }
  }, [attachment])

  function resetAttachment() {
    setAttachment(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function handleSend() {
    if ((!value.trim() && !attachment) || disabled) {
      return
    }

    let chatAttachment: ChatAttachment | undefined
    if (attachment) {
      chatAttachment = {
        name: attachment.file.name,
        isImage: attachment.isImage,
        url: attachment.isImage ? await fileToDataUrl(attachment.file) : undefined,
      }
    }

    onSend(value, chatAttachment)
    setValue("")
    resetAttachment()
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2">
      {attachment && (
        <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-card p-1.5 pr-3 text-xs text-muted-foreground shadow-sm">
          {attachment.isImage && attachment.previewUrl ? (
            <Image
              src={attachment.previewUrl}
              alt={attachment.file.name}
              width={28}
              height={28}
              unoptimized
              className="size-7 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
              <FileIcon className="size-3.5" />
            </div>
          )}
          <span className="max-w-40 truncate">{attachment.file.name}</span>
          <button
            type="button"
            onClick={resetAttachment}
            aria-label="Remove attachment"
            className="rounded-full p-0.5 hover:bg-muted"
          >
            <XIcon className="size-3" />
          </button>
        </div>
      )}

      <div className="glass-panel focus-within:ring-3 focus-within:ring-ring/30 relative flex items-end gap-2 overflow-hidden rounded-[28px] p-2">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            setAttachment(file ? toPendingAttachment(file) : null)
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-full"
          aria-label="Attach a file"
          onClick={() => fileInputRef.current?.click()}
        >
          <PaperclipIcon />
        </Button>

        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault()
              handleSend()
            }
          }}
          placeholder={checkContent.composer.placeholder}
          rows={1}
          className="no-scrollbar max-h-40 min-h-9 flex-1 resize-none overflow-y-auto rounded-[28px] border-transparent bg-transparent px-2 py-1.5 shadow-none focus-visible:border-transparent! focus-visible:ring-0!"
        />
        <Button
          type="button"
          size="icon"
          className="shrink-0 rounded-full"
          aria-label={checkContent.composer.send}
          disabled={disabled || (!value.trim() && !attachment)}
          onClick={handleSend}
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  )
}
