'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/',            label: 'Scan',       emoji: '📷' },
  { href: '/history',     label: 'Journal',    emoji: '🕐' },
  { href: '/field-guide', label: 'Guide',      emoji: '📖' },
  { href: '/biome',       label: 'Terrain',    emoji: '🏔️' },
  { href: '/profile',     label: 'Camp',       emoji: '👤' },
]

export default function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-zinc-950/90 backdrop-blur-md">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map(tab => {
          const active = path === tab.href
          return (
            <Link key={tab.href} href={tab.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all
                ${active ? 'text-truexxii-green' : 'text-white/40 hover:text-white/70'}`}>
              <span className="text-xl leading-none">{tab.emoji}</span>
              <span className={`text-[10px] font-semibold ${active ? 'text-truexxii-green' : 'text-white/40'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
