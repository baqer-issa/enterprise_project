import { LuGamepad2, LuScan, LuPackage } from 'react-icons/lu';

export default function ValueProps() {
  const props = [
    {
      icon: LuGamepad2,
      title: 'Originals, not replicas',
      description: 'Classic hardware. Real nostalgia.',
    },
    {
      icon: LuScan,
      title: 'Condition, made clear',
      description: "Know exactly what's in the box.",
    },
    {
      icon: LuPackage,
      title: 'Packed for the next level',
      description: 'Careful packaging for every replay.',
    },
  ];

  return (
    <section className="w-full bg-[#1B2030] border-y border-white/5 py-5 sm:py-6">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {props.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-4 ${index > 0 ? 'pt-4 md:pt-0 md:pl-6 lg:pl-8' : ''}`}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#8E95A5] shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-normal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7E8594] mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
