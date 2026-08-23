import { Geist_Mono, Noto_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Navbar } from "@/components/navbar/navbar"

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

  const dummy_user = {
    name: 'l1n3ar l1n3ar',
    roles: ['admin']
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", notoSans.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Navbar user={dummy_user} />
            <main className="min-h-screen bg-muted/20">{children}</main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
