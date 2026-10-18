import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function PromoBanner() {
  return (
    <section className="w-full bg-[#C3F85C] text-[#10131E] py-14 sm:py-16">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono text-[#10131E]/80 block mb-2">
              Small price. Big nostalgia.
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#10131E] leading-[1.1] mb-3">
              Your next replay, under $35.
            </h2>
            <p className="text-sm sm:text-base text-[#10131E]/80 font-medium leading-relaxed">
              Super Mario World at $34.99. Sonic the Hedgehog at $24.99. Two legendary ways to start again.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/purchase"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#10131E]/30 hover:border-[#10131E] bg-[#10131E]/5 hover:bg-[#10131E]/15 text-xs sm:text-sm font-bold text-[#10131E] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10131E]"
            >
              <span>Find your first level</span>
              <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
