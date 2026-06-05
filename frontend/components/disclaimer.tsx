export function Disclaimer() {
  return (
    <section id="disclaimer" className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-yellow-600"
                  aria-hidden="true"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-yellow-900">
                  Safety Disclaimer
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-yellow-800">
                  IntelliDerm is an AI-powered prototype designed for
                  informational purposes only. The analysis provided by this
                  tool is{" "}
                  <strong>
                    not a substitute for professional medical advice, diagnosis,
                    or treatment
                  </strong>
                  . Always seek the advice of a qualified dermatologist or
                  healthcare provider with any questions regarding a skin
                  condition. Never disregard professional medical advice or delay
                  seeking it because of results from this application.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-yellow-700">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    AI Prototype
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    Not a Medical Diagnosis
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    Consult a Doctor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
