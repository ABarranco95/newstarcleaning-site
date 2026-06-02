export default function MobileCTABar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur border-t border-line"
      style={{ boxShadow: "0 -8px 24px -12px rgba(14,22,38,0.18)" }}
    >
      <div className="mx-auto flex max-w-lg items-stretch gap-2 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href="tel:+15597852822"
          className="flex flex-[0.9] items-center justify-center gap-1.5 rounded-full border border-line bg-white px-3 py-3 text-sm font-semibold text-primary"
          aria-label="Call New Star Cleaning"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </a>
        <a
          href="#quote"
          className="flex flex-[1.5] items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(239,106,55,0.6)]"
        >
          Get quote
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
