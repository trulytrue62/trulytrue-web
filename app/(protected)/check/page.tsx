import { CheckInput } from "@/components/check/check-input"
import { checkInputContent } from "@/content/check-input"

export default function CheckPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-md text-muted-foreground">
        {checkInputContent.description}
      </p>
      <div className="max-w-2xl">
        <CheckInput />
      </div>
    </div>
  )
}
