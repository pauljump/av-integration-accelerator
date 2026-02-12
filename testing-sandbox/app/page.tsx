"use client";

import HeroSimulation from "@/components/HeroSimulation";
import KdsReference from "@/components/KdsReference";
import JsonDiff from "@/components/JsonDiff";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================================================================
            Section 1: Hero Text
            ================================================================ */}
        <section className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 max-w-3xl">
            Your POS is{" "}
            <span className="text-accent">3 fields</span> away from
            the future of delivery.
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-6">
            Autonomous vehicles are delivering food today. See how one webhook
            update transforms your kitchen display — then build it yourself.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#simulation"
              className="bg-accent text-black px-5 py-2.5 rounded-lg hover:bg-accent-hover transition font-semibold text-sm flex items-center gap-2"
            >
              Watch the experience
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
            <a
              href="/build"
              className="bg-surface-2 text-white px-5 py-2.5 rounded-lg hover:bg-surface transition font-semibold text-sm border border-border flex items-center gap-2"
            >
              Start building
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* ================================================================
            Section 2: Hero Simulation
            ================================================================ */}
        <section id="simulation" className="mb-16">
          <HeroSimulation />
          <p className="text-text-tertiary text-xs mt-3 text-center">
            Use arrow keys or click steps to navigate. Space to play/pause.
          </p>
        </section>

        {/* ================================================================
            Section 3: The 3 Fields (moved down, with context bridge)
            ================================================================ */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              What you just saw relies on 3 fields.
            </h2>
            <p className="text-text-secondary text-sm max-w-2xl">
              When a delivery is handled by an autonomous vehicle instead of a
              human courier, these 3 fields appear in the order payload. Your
              integration needs to detect and display them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-lg border border-border p-5">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
              </div>
              <code className="text-sm font-mono text-accent font-semibold">
                is_autonomous
              </code>
              <p className="text-sm text-text-secondary mt-2">
                Boolean. When <code className="text-xs bg-surface-2 px-1 rounded text-accent">true</code>, this delivery is handled by a robot. Switch
                your KDS to the AV-specific display.
              </p>
              <div className="mt-3 text-xs font-mono text-text-tertiary">
                Type: boolean
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-border p-5">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <code className="text-sm font-mono text-amber-500 font-semibold">
                passcode
              </code>
              <p className="text-sm text-text-secondary mt-2">
                4-digit PIN the crew enters on the robot to open the food
                compartment. Display this prominently on the KDS.
              </p>
              <div className="mt-3 text-xs font-mono text-text-tertiary">
                Type: string | undefined
              </div>
            </div>

            <div className="bg-surface rounded-lg border border-border p-5">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <code className="text-sm font-mono text-blue-500 font-semibold">
                handoff_instructions
              </code>
              <p className="text-sm text-text-secondary mt-2">
                Step-by-step instructions for loading food into the robot. Varies
                by provider (Serve, Nuro, Waymo, etc.).
              </p>
              <div className="mt-3 text-xs font-mono text-text-tertiary">
                Type: string | undefined
              </div>
            </div>
          </div>

          <div className="mt-4 bg-surface rounded-lg p-3 flex items-center gap-2 border border-border">
            <svg className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <span className="text-sm text-text-secondary">
              All 3 fields live at{" "}
              <code className="bg-surface-2 px-1.5 py-0.5 rounded text-xs font-mono text-accent border border-border">
                order.deliveries[].vehicle
              </code>
            </span>
          </div>
        </section>

        {/* ================================================================
            Section 4: Interactive KDS Reference
            ================================================================ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">
            KDS Reference Design
          </h2>
          <p className="text-text-secondary text-sm mb-6 max-w-2xl">
            Explore how the kitchen display should adapt across providers and
            delivery states. Toggle annotations to see why each element matters.
          </p>
          <KdsReference mode="interactive" />
        </section>

        {/* ================================================================
            Section 5: JSON Diff (collapsible)
            ================================================================ */}
        <section className="mb-16">
          <details className="group">
            <summary className="cursor-pointer list-none flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-text-tertiary transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <div>
                <h2 className="text-xl font-semibold text-white inline">
                  Standard vs AV Order Payload
                </h2>
                <p className="text-text-secondary text-sm mt-0.5">
                  Compare the raw JSON side-by-side. Click highlighted fields to learn more.
                </p>
              </div>
            </summary>
            <div className="mt-2">
              <JsonDiff />
            </div>
          </details>
        </section>

        {/* ================================================================
            Section 6: Journey CTA
            ================================================================ */}
        <section className="mb-8">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Ready to integrate?
                </h3>
                <p className="text-sm text-text-secondary">
                  Follow the 5-step journey from code snippets to AV-ready validation.
                </p>
              </div>
              <a
                href="/build"
                className="bg-accent text-black px-5 py-2.5 rounded-lg hover:bg-accent-hover transition font-semibold text-sm flex items-center gap-2 flex-shrink-0"
              >
                Start Building
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Mini Progress Indicator */}
            <div className="mt-5 flex items-center gap-1">
              {["Learn", "Build", "Test", "Simulate", "Validate"].map(
                (label, idx) => (
                  <div key={label} className="flex items-center">
                    <a
                      href={
                        idx === 0
                          ? "/"
                          : `/${label.toLowerCase()}`
                      }
                      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition hover:bg-surface-2 ${
                        idx === 0
                          ? "text-accent font-medium"
                          : "text-text-tertiary"
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          idx === 0
                            ? "bg-accent text-black"
                            : "bg-surface-2 text-text-tertiary border border-border"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </a>
                    {idx < 4 && (
                      <div className="w-4 h-px bg-border mx-0.5" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
