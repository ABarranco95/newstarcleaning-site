import Link from "next/link";

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-accent">★</span>
          <span className="font-medium text-gray-700">4.9 Rating</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">500+ Homes</span>
        </div>
        <Link
          href="/book-now"
          className="bg-accent hover:bg-accent-hover text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm shadow-md"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
