import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { LuGamepad2, LuTv } from 'react-icons/lu';

export default function Categories() {
  const categories = [
    {
      id: 'cartridges',
      title: 'Cartridge classics',
      subtitle: '3 original games / SNES, Genesis & Game Boy',
      icon: LuGamepad2,
      link: '/purchase',
    },
    {
      id: 'consoles',
      title: 'Console icons',
      subtitle: '2 original systems / Nintendo & Sony',
      icon: LuTv,
      link: '/purchase',
    },
  ];

  return (
    <section className="w-full bg-[#10131E] text-white pb-20 sm:pb-24">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
          Choose your way to play.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.link}
                className="group bg-[#151926] hover:bg-[#1A2030] border border-white/5 hover:border-white/15 rounded-xl p-6 sm:p-7 transition-all duration-200 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3F85C]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-lg bg-[#1D2133] flex items-center justify-center text-[#A78BFA] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#C3F85C] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7E8594] mt-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#7E8594] group-hover:text-white transition-colors">
                  <FiArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
