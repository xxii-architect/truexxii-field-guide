import Link from 'next/link'

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/ai-disclaimer', label: 'AI Disclaimer' },
]

const FEATURE_LINKS = [
  { href: '/', label: 'Identify' },
  { href: '/history', label: 'Journal' },
  { href: '/field-guide', label: 'Guide' },
  { href: '/profile', label: 'Camp' },
]

export default function Footer() {
  return (
    <footer className="app-footer mt-12 border-t border-truexxii-charcoal/25 bg-[rgba(232,220,194,0.95)] px-4 py-8 text-truexxii-forest">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-truexxii-cocoa">True XXII</p>
          <p className="max-w-md text-sm text-truexxii-forest/80">
            Wilderness Plant ID backed by rugged fieldcraft and honest AI guidance.
            Reach out if you need help, and always verify plant identifications with an expert.
          </p>
          <p className="text-sm text-truexxii-forest/70">support@truexxiisupply.com</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-truexxii-earth">Features</p>
            <ul className="mt-3 space-y-2 text-sm">
              {FEATURE_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-truexxii-forest/90 hover:text-truexxii-olive">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-truexxii-earth">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-truexxii-forest/90 hover:text-truexxii-olive">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-truexxii-earth">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-truexxii-forest/90">
              <li>support@truexxiisupply.com</li>
              <li>Trusted plant ID with expert review guidance.</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
