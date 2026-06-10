export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">Disclaimer</span>
        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.32em] text-truexxii-earth">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-truexxii-cocoa">Disclaimer</h1>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-truexxii-forest/80">
          The information provided in True XXII Plant ID is for educational and reference purposes only.
          The app does not guarantee identification accuracy and should not replace professional expertise.
        </p>

        <section className="note-card mt-8 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">Safety notice</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            Always verify plant identifications through trusted field guides, local experts, and reliable sources before using any plant for food, medicine, or craft.
          </p>
        </section>

        <section className="note-card mt-6 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">Responsibility</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            True XXII Supply is not responsible for losses, injuries, or damages arising from reliance on app content, plant identifications, or related decisions.
          </p>
        </section>
      </div>
    </main>
  )
}
