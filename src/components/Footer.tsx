import Link from "next/link";

const serviceAreas = [
  { name: "Fresno", slug: "fresno" },
  { name: "Clovis", slug: "clovis" },
  { name: "Madera", slug: "madera" },
  { name: "Sanger", slug: "sanger" },
  { name: "Selma", slug: "selma" },
  { name: "Kingsburg", slug: "kingsburg" },
  { name: "Reedley", slug: "reedley" },
  { name: "Visalia", slug: "visalia" },
  { name: "Tulare", slug: "tulare" },
  { name: "Hanford", slug: "hanford" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">New Star Cleaning</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Professional house cleaning services in Fresno, CA and the
              surrounding Central Valley. Vetted, insured, and satisfaction
              guaranteed.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Standard Recurring Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Move-In/Move-Out Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Areas</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/cleaning-services-${area.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {area.name}, CA
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <Link href="/book-now" className="hover:text-white transition-colors">
                  Book Online
                </Link>
              </li>
              <li>
                <Link
                  href="https://g.page/r/CZnoJYR4LIauEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Leave a Review
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} NEW STAR CLEANING LLC. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <span>Fresno, CA</span>
            <span>•</span>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
