export default function TermsPage() {
  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">Terms of Service</span>
        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.32em] text-truexxii-earth">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-truexxii-cocoa">Terms of Service</h1>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-truexxii-forest/80">
          These terms define your rights and responsibilities while using True XXII Plant ID.
          By using the app, you agree to follow our usage guidelines and respect the safety recommendations provided.
        </p>

        <section className="note-card mt-8 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">Using the app</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            You may use True XXII for plant identification, journal logging, and guide reference. You must not use the service for unlawful or harmful activities.
          </p>
        </section>

        <section className="note-card mt-6 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">User responsibilities</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-truexxii-forest/80">
            <li>Provide accurate information when creating an account.</li>
            <li>Verify AI-generated identifications before acting on them.</li>
            <li>Respect other users and do not misuse shared information.</li>
          </ul>
        </section>

        <section className="note-card mt-6 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">Liability</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            True XXII Supply provides this app as-is and is not liable for decisions made based on plant identification results.
          </p>
        </section>
      </div>
    </main>
  )
}
