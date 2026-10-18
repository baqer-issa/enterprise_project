
export default function BrandHighlights() {
  return (
    <section className="w-full bg-[#10131E] text-white py-14 sm:py-18 border-t border-white/5">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8 text-center">
        {/* Kicker Tag */}
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase font-mono text-[#7E8594] mb-10">
          Different worlds. One shared childhood.
        </p>

        {/* Brand Typographic Marks */}
        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 lg:gap-24 mb-10 text-[#B49BFA] opacity-90">
          {/* NINTENDO */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-widest uppercase border-2 border-[#B49BFA]/40 px-4 py-1 rounded-full font-sans select-none">
            NINTENDO
          </div>

          {/* SEGA */}
          <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase italic select-none font-sans drop-shadow-sm">
            SEGA
          </div>

          {/* PlayStation */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight select-none font-sans">
            PlayStation
          </div>

          {/* GAME BOY */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-widest uppercase select-none font-sans">
            GAME BOY
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#5D6475] max-w-xl mx-auto leading-relaxed">
          Independent concept retailer. Platform names belong to their respective owners; no affiliation implied.
        </p>
      </div>
    </section>
  );
}
