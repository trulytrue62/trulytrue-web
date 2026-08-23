import { Geist_Mono, Noto_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Navbar } from "@/components/navbar/navbar"
import { LightRays } from "@/components/ui/light-rays"
import { currentUser } from "@/data/mock/user"

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", notoSans.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <div className="flex h-screen flex-col">
              <Navbar user={currentUser} />
              <main className="flex-1 overflow-y-auto py-6">
                <div className="mx-auto h-full max-w-7xl rounded-4xl bg-card p-4">
                  {children}
                </div>
              </main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
