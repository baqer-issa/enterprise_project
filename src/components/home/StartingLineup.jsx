import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const classics = [
  {
    id: 'snes-mario',
    name: 'Super Mario World',
    price: '$34.99',
    meta: '1991 / Game · Cartridge only',
    image: '/images/snes-mario.png',
    tag: 'SNES',
  },
  {
    id: 'gameboy-pokemon',
    name: 'Pokémon Red',
    price: '$64.99',
    meta: '1998 / Game · Cartridge only',
    image: '/images/gameboy-pokemon.png',
    tag: 'GAME BOY',
  },
  {
    id: 'n64-system',
    name: 'Nintendo 64',
    price: '$119.99',
    meta: '1996 / Console · Controller + cables',
    image: '/images/n64-console.png',
    tag: 'NINTENDO',
  },
];

export default function StartingLineup() {
  return (
    <section className="w-full bg-[#10131E] text-white pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono mb-3">
              <span className="text-[#A78BFA]">01 / </span>
              <span className="text-[#7E8594]">THE STARTING LINEUP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight">
              Great then. Great now.
            </h2>
          </div>

          <Link
            to="/purchase"
            className="text-xs sm:text-sm font-semibold text-[#C3F85C] hover:underline inline-flex items-center gap-1 group pb-1"
          >
            <span>Explore all 5 classics</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classics.map((product) => (
            <div
              key={product.id}
              className="bg-[#121622] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[416/300] bg-[#EFE0CB] overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Product Info & Action */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow bg-[#10131E]">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#C3F85C] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-base sm:text-lg font-bold text-[#C3F85C] font-mono">
                    {product.price}
                  </span>
                </div>

                <p className="text-xs text-[#7E8594] mt-1 mb-5">
                  {product.meta}
                </p>

                <div className="mt-auto">
                  <Link
                    to="/purchase"
                    className="w-full py-2.5 px-4 rounded-lg border border-white/10 hover:border-[#C3F85C] bg-[#141824] hover:bg-[#181D2C] text-xs font-semibold text-white hover:text-[#C3F85C] inline-flex items-center justify-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3F85C]"
                  >
                    <span>Shop this classic</span>
                    <FiArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
