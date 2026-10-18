import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="w-full bg-[#10131E] text-white pt-12 pb-16 lg:pt-16 lg:pb-24">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag / Kicker */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-[#C3F85C] inline-block shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#8E95A5] uppercase font-mono">
                The good old days. Ready to play.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight text-white leading-[1.04] mb-6">
              Relive the<br />
              Classics
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#949BA8] leading-relaxed max-w-lg mb-8">
              That first level. That familiar soundtrack. Find the games and consoles that made you a player — and pick up where you left off.
            </p>

            {/* Call to Action */}
            <div className="flex items-center gap-5 flex-wrap">
              <Link
                to="/purchase"
                className="bg-[#C3F85C] hover:bg-[#b3ea4f] text-[#10131E] font-bold text-sm px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C3F85C]"
              >
                <span>Shop Now</span>
                <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <span className="text-xs sm:text-sm text-[#7E8594] font-medium">
                5 icons. Endless replay.
              </span>
            </div>

            {/* Trust Footnote */}
            <div className="mt-10 pt-6 flex items-center gap-2.5 text-xs text-[#7E8594]">
              <svg 
                viewBox="0 0 16 16" 
                fill="none" 
                className="w-4 h-4 text-[#8E95A5] shrink-0"
                aria-hidden="true"
              >
                <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5L8 0Z" fill="currentColor"/>
                <circle cx="13" cy="2" r="1.5" fill="currentColor"/>
                <circle cx="3" cy="13" r="1.5" fill="currentColor"/>
              </svg>
              <span>Original hardware. Honest condition notes. No emulators.</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141824] aspect-[680/490]">
              <img
                src="/images/hero-consoles.png"
                alt="Vintage gaming consoles including Nintendo 64 and PlayStation 1 with game cartridges"
                className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
