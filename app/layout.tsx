import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CallFlow Dashboard',
  description: 'Call tracking and analytics dashboard for dental practices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
