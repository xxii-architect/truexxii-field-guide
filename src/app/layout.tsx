import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BottomNav from '../components/core/BottomNav'
import Footer from '../components/core/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'True XXII — Wilderness Plant ID',
  description: 'Rugged plant and mushroom identification engineered for the wild.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-truexxii-parchment text-truexxii-forest antialiased`}>
        {children}
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
