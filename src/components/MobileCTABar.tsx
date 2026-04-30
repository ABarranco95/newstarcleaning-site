import Link from "next/link";

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-3 items-center gap-2 px-3 py-3 max-w-lg mx-auto">
        <a
          href="tel:+15597852822"
          className="rounded-lg border border-gray-200 px-3 py-2.5 text-center text-xs font-bold text-primary"
        >
          Call
        </a>
        <a
          href="#quote"
          className="rounded-lg bg-accent px-3 py-2.5 text-center text-xs font-bold text-white shadow-md"
        >
          Get Quote
        </a>
        <Link
          href="/book-now"
          className="rounded-lg bg-primary px-3 py-2.5 text-center text-xs font-bold text-white shadow-md"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
