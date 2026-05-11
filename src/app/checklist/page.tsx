import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional Cleaning Checklist — What We Clean",
  description:
    "See exactly what New Star Cleaning includes in every standard and deep clean. Full-room checklists for Fresno, Clovis & Madera homes.",
  alternates: {
    canonical: "/checklist",
  },
  openGraph: {
    title:
      "Professional Cleaning Checklist — What We Clean | New Star Cleaning",
    description:
      "Room-by-room checklist for standard and deep cleans. Trusted across Fresno, Clovis, and Madera.",
    url: "https://newstarcleaning.com/checklist",
  },
};

const standardClean: Record<string, string[]> = {
  Kitchen: [
    "Countertops wiped and disinfected",
    "Stovetop and visible appliances cleaned",
    "Microwave wiped inside and out",
    "Cabinet fronts spot-cleaned",
    "Sink scrubbed and shined",
    "Floors swept and mopped",
    "Trash emptied",
  ],
  Bathrooms: [
    "Toilet scrubbed and disinfected",
    "Tub and shower cleaned",
    "Sink and counters wiped",
    "Mirrors and fixtures shined",
    "Floors mopped",
    "Trash emptied",
  ],
  "Bedrooms & Living Areas": [
    "Beds made (linens left as found)",
    "Surfaces dusted",
    "Mirrors and glass cleaned",
    "Visible cobwebs removed",
    "Floors vacuumed and mopped",
  ],
  "All Rooms": [
    "Light switches and door handles wiped",
    "Trash collected",
    "Floors finished room by room",
    "Final walk-through before leaving",
  ],
};

const deepClean: string[] = [
  "Inside oven and microwave",
  "Inside refrigerator (on request)",
  "Cabinet fronts and handles",
  "Baseboards and trim hand-wiped",
  "Door frames and switch plates detailed",
  "Ceiling fans and light fixtures dusted",
  "Vent covers wiped",
  "Window sills and tracks cleaned",
  "Detailed bathroom grout and fixtures",
];

const addOns: string[] = [
  "Inside refrigerator",
  "Inside oven",
  "Inside cabinets",
  "Interior windows",
  "Laundry (wash/dry/fold) — on request",
  "Pet-area detail",
];

export default function ChecklistPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Cleaning checklist
          </span>
          <h1 className="mt-5 text-4xl lg:text-[3.25rem] leading-[1.05] max-w-3xl">
            Our Cleaning
            <span className="italic text-accent-light"> Checklist</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Here&apos;s exactly what we cover on a standard recurring clean,
            what gets added on a deep clean, and the add-ons you can request.
            No surprises.
          </p>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">01 / Recurring</span>
              <h2 className="mt-3 text-3xl lg:text-4xl text-ink">
                Standard clean checklist
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Included on every weekly, bi-weekly, and monthly clean.
              </p>
              <div className="mt-8 space-y-6">
                {Object.entries(standardClean).map(([room, items]) => (
                  <div
                    key={room}
                    className="rounded-2xl border border-line bg-white p-6 shadow-soft"
                  >
                    <h3 className="text-lg text-ink">{room}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-ink-soft"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.4}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">02 / Deep clean</span>
              <h2 className="mt-3 text-3xl lg:text-4xl text-ink">
                Deep clean adds
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                A full top-to-bottom reset — everything in the standard
                checklist, plus these detail items:
              </p>
              <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <ul className="space-y-2">
                  {deepClean.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.4}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="eyebrow eyebrow-dot mt-12 block">
                03 / Add-ons
              </span>
              <h2 className="mt-3 text-3xl lg:text-4xl text-ink">
                Optional add-ons
              </h2>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {addOns.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft shadow-soft"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-xl text-ink">Need a custom checklist?</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  We can tailor any visit. Tell us what matters most and
                  we&apos;ll build it into your service.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/book-now"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
                  >
                    Request a cleaning quote
                  </Link>
                  <Link
                    href="/services/standard-cleaning"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-primary hover:text-primary"
                  >
                    Standard cleaning
                  </Link>
                  <Link
                    href="/services/deep-cleaning"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-primary hover:text-primary"
                  >
                    Deep cleaning
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
