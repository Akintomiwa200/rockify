import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { UserProvider } from "@/context/UserContext/page"
import { SocketProvider } from "@/context/SocketContext.tsx/page";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Buks LMS",
  description: "A learning management system for developing applications and web applications",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav.svg" />
      </head>
      <body className={`${inter.variable} antialiased`}>
      <UserProvider>
      <SocketProvider>
          {children}
          </SocketProvider>
          </UserProvider>
      </body>
    </html>
  )
}
