const CLINICS = [
  {
    name: "DermaCare Skin Clinic",
    address: "123 Medical Drive, Suite 200, San Francisco, CA 94102",
    phone: "+1 (415) 555-0120",
    specialties: ["Dermatology", "Skin Cancer Screening"],
    rating: 4.8,
  },
  {
    name: "ClearSkin Dermatology Center",
    address: "456 Health Boulevard, Floor 3, San Francisco, CA 94108",
    phone: "+1 (415) 555-0145",
    specialties: ["Cosmetic Dermatology", "Eczema Treatment"],
    rating: 4.6,
  },
  {
    name: "Bay Area Skin Health Institute",
    address: "789 Wellness Avenue, San Francisco, CA 94115",
    phone: "+1 (415) 555-0180",
    specialties: ["Pediatric Dermatology", "Allergy Testing"],
    rating: 4.9,
  },
  {
    name: "Pacific Dermatology Associates",
    address: "321 Harbor Way, Suite 105, San Francisco, CA 94133",
    phone: "+1 (415) 555-0199",
    specialties: ["Surgical Dermatology", "Psoriasis Care"],
    rating: 4.7,
  },
];

export function ClinicsSection() {
  return (
    <section id="clinics" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm font-medium text-muted-foreground">
              Nearby Help
            </span>
          </div>

          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Find a Dermatologist Near You
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Connect with certified skin specialists in your area for a
            professional consultation.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {CLINICS.map((clinic) => (
            <article
              key={clinic.name}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <path d="M12 11v4" />
                      <path d="M10 13h4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5 text-yellow-500"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-semibold text-foreground">
                      {clinic.rating}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {clinic.name}
                </h3>

                <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 h-4 w-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{clinic.address}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {clinic.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-block rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`}
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
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
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
