"use client";

interface ResultsSectionProps {
  imagePreview: string;
  fileName: string;
  onReset: () => void;
  prediction?: string;
  confidence?: number;
  description?: string;
  isLoading?: boolean;
}

export function ResultsSection({
  imagePreview,
  fileName,
  onReset,
  prediction,
  confidence,
  description,
  isLoading,
}: ResultsSectionProps) {
  return (
    <section className="border-t border-border bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Analysis Results
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isLoading
              ? "AI is analyzing your image..."
              : "Preliminary AI assessment of your uploaded image"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Preview */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Uploaded Image
                  </p>
                  <p className="text-xs text-muted-foreground">{fileName}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Uploaded skin condition"
                className={`h-auto w-full rounded-xl object-cover transition-opacity ${isLoading ? "opacity-50" : "opacity-100"}`}
              />
            </div>
            {!isLoading && (
              <div className="border-t border-border px-5 py-3">
                <button
                  type="button"
                  onClick={onReset}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                  Upload a different image
                </button>
              </div>
            )}
          </div>

          {/* Diagnosis / Loading State */}
          <div className="flex flex-col gap-5">
            {isLoading ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 font-medium text-muted-foreground">
                  Running CNN Classification...
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Detected Condition
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                    {prediction || "Unable to identify"}
                  </h3>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      AI Verified
                    </span>
                    {confidence !== undefined && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {confidence.toFixed(1)}% Confidence
                      </span>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h4 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    General Care Tips
                  </h4>
                  <ul className="mt-4 flex flex-col gap-3">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      Maintain proper hygiene and avoid scratching the area.
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      Consult the nearby clinics listed below for a professional
                      diagnosis.
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* AI Description */}
        {!isLoading && description && (
          <div className="mt-8">
            <AIDescriptionBox description={description} />
          </div>
        )}
      </div>
    </section>
  );
}

function AIDescriptionBox({ description }: { description: string }) {
  let parsedData: Record<string, string[]> = {
    description: [],
    severity: [],
    risks: [],
    treatments: [],
  };

  try {
    const jsonStr = description.replace(/```json\n?|\n?```/g, "");
    const data = JSON.parse(jsonStr);

    const toArray = (val: any) => (Array.isArray(val) ? val : val ? [val] : []);

    if (data.description) {
      parsedData = {
        description: toArray(data.description),
        severity: toArray(data.severity),
        risks: toArray(data.risks),
        treatments: toArray(data.treatments),
      };
    }
  } catch (e) {
    // Fallback if not valid JSON
  }

  const formatBold = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  const renderList = (items: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <ul className="mt-3 flex flex-col gap-2 pl-5">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm leading-relaxed text-secondary-foreground list-disc marker:text-primary/70"
          >
            <span dangerouslySetInnerHTML={{ __html: formatBold(item) }} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="rounded-2xl border border-primary/20 bg-accent/60 p-6 md:p-8">
      <div className="flex flex-col gap-6">
        {/* Description Section */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-display text-lg font-semibold text-foreground">
              Disease Description
            </h4>
            {renderList(parsedData.description)}
          </div>
        </div>

        {/* Severity & Risks Section */}
        {(parsedData.severity.length > 0 || parsedData.risks.length > 0) && (
          <div className="flex items-start gap-4 border-t border-border/50 pt-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-destructive/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-destructive"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-display text-lg font-semibold text-foreground">
                Severity & Health Risks
              </h4>
              {renderList([...parsedData.severity, ...parsedData.risks])}
            </div>
          </div>
        )}

        {/* Treatments Section */}
        {parsedData.treatments.length > 0 && (
          <div className="flex items-start gap-4 border-t border-border/50 pt-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-green-600"
              >
                <path d="M10.5 20.5 7 17l-4 4" />
                <path d="M14 13v7" />
                <path d="M14 2v4" />
                <path d="M14 9h.01" />
                <path d="M18 13v7" />
                <path d="M18 2v4" />
                <path d="M18 9h.01" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-display text-lg font-semibold text-foreground">
                Commonly Used Medicines
              </h4>
              {renderList(parsedData.treatments)}
            </div>
          </div>
        )}

        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground border-t border-border/50 pt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          This is a preliminary AI assessment and not a medical diagnosis.
        </p>
      </div>
    </div>
  );
}
