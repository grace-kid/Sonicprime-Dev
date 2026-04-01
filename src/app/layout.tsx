import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SonicPrime Dev | Software Development Company',
  description: 'A forward-thinking technology firm dedicated to empowering innovation through exceptional software solutions.',
  keywords: ['software development', 'web development', 'app development', 'cloud solutions'],
  openGraph: {
    title: 'SonicPrime Dev',
    description: 'Software Development Company',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
