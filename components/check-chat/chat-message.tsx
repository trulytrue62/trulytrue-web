import Image from "next/image"
import { FileIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BlurFade } from "@/components/ui/blur-fade"
import { AssistantAvatar } from "@/components/check-chat/assistant-avatar"
import { ResultCard } from "@/components/check-chat/result-card"
import { currentUser } from "@/data/mock/user"
import { cn } from "@/lib/utils"
import type { ChatMessage } from "@/types/chat"

function MessageAvatar({ isUser }: { isUser: boolean }) {
  if (!isUser) {
    return <AssistantAvatar />
  }

  return (
    <Avatar className="shrink-0">
      <AvatarImage src={currentUser.image} alt={currentUser.name} />
      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}

export function ChatMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  return (
    <BlurFade className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <MessageAvatar isUser={isUser} />
      <div className={cn("min-w-0 max-w-[85%]", message.kind === "result" && "w-full")}>
        {message.kind === "result" ? (
          <ResultCard result={message.result} />
        ) : (
          <div
            className={cn(
              "flex flex-col gap-2 rounded-3xl px-4 py-2.5 text-sm leading-relaxed",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            )}
          >
            {isUser && message.attachment && (
              message.attachment.isImage && message.attachment.url ? (
                <Image
                  src={message.attachment.url}
                  alt={message.attachment.name}
                  width={200}
                  height={200}
                  unoptimized
                  className="max-h-48 w-auto rounded-xl object-cover"
                />
              ) : (
                <span className="flex w-fit items-center gap-1.5 rounded-full bg-background/20 px-2.5 py-1 text-xs">
                  <FileIcon className="size-3" />
                  {message.attachment.name}
                </span>
              )
            )}
            {message.text}
          </div>
        )}
      </div>
    </BlurFade>
  )
}
