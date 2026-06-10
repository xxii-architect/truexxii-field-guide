import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">Privacy Policy</span>
        <div className="mt-8">
          <p className="text-sm uppercase tracking-[0.32em] text-truexxii-earth">Legal</p>
          <h1 className="mt-3 text-4xl font-black text-truexxii-cocoa">Privacy Policy</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-truexxii-forest/80">
            This policy explains how True XXII Plant ID collects, uses, and protects your data.
            We only retain the information necessary to provide identification, history, and account services.
          </p>
        </div>

        <section className="note-card mt-8 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">What we collect</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-truexxii-forest/80">
            <li>Account details when you sign up.</li>
            <li>Plant identification history and uploaded specimen images.</li>
            <li>Anonymous usage data to improve the app experience.</li>
          </ul>
        </section>

        <section className="note-card mt-6 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">How we use it</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            Data is used to power identification, history, and profile services. We do not sell personal data.
          </p>
        </section>

        <section className="note-card mt-6 space-y-4 p-6">
          <h2 className="text-xl font-semibold text-truexxii-cocoa">Your choices</h2>
          <p className="text-sm leading-7 text-truexxii-forest/80">
            You can request deletion of your account data by contacting support at
            <Link href="mailto:support@truexxii.com" className="text-truexxii-olive hover:underline"> support@truexxii.com</Link>.
          </p>
        </section>
      </div>
    </main>
  )
}
