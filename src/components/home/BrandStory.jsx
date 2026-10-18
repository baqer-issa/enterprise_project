import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function BrandStory() {
  return (
    <section className="w-full bg-[#10131E] text-white py-20 lg:py-28">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Living Room Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141824] aspect-[600/430]">
              <img
                src="/images/living-room.png"
                alt="Cozy retro living room with a glowing CRT television playing a nostalgic game"
                className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Story Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono text-[#A78BFA] block mb-4">
              More than a save file
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Some things never get<br />
              old.
            </h2>

            <p className="text-base sm:text-lg text-[#949BA8] leading-relaxed max-w-xl mb-8">
              A wired controller. A couch full of friends. One more try before dinner. Retro Replay is a new concept store built around a simple idea: the best games still have plenty of life left in them.
            </p>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 hover:border-white bg-[#151926] hover:bg-[#1C2234] text-xs sm:text-sm font-semibold text-white transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3F85C]"
              >
                <span>Meet Retro Replay</span>
                <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
