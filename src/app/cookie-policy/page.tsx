export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">Cookie Policy</span>
        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.32em] text-truexxii-earth">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-truexxii-cocoa">Cookie Policy</h1>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-truexxii-forest/80">
          True XXII Plant ID uses cookies and similar technologies to improve your experience and keep the app running smoothly.
        </p>

        <section className="note-card mt-8 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">What we use</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-truexxii-forest/80">
            <li>Session cookies for login and preferences.</li>
            <li>Analytics cookies to understand feature usage and improve the app.</li>
            <li>Functional cookies to keep the app responsive during your session.</li>
          </ul>
        </section>

        <section className="note-card mt-6 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">Your options</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            You can clear cookies through your browser settings at any time. Disabling cookies may affect some app features.
          </p>
        </section>
      </div>
    </main>
  )
}
