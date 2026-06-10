export default function AIDisclaimerPage() {
  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">AI Disclaimer</span>
        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.32em] text-truexxii-earth">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-truexxii-cocoa">AI Disclaimer</h1>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-truexxii-forest/80">
          True XXII Plant ID uses artificial intelligence and machine learning models to suggest plant identifications.
          These results are not guaranteed and should always be verified by a qualified expert.
        </p>

        <section className="note-card mt-8 space-y-4 p-6">
          <p className="text-sm leading-7 text-truexxii-forest/80">
            The plant identification results provided by True XXII Plant ID are generated using artificial intelligence and machine learning models.
            While we strive for accuracy, these identifications are not guaranteed and should not be solely relied upon for making decisions related to plant consumption, medicinal use, or safety.
            Always consult with a qualified expert or trusted source before using any plant for such purposes.
            True XXII Supply disclaims any liability for damages or injuries resulting from reliance on AI-generated identifications.
          </p>
        </section>
      </div>
    </main>
  )
}
