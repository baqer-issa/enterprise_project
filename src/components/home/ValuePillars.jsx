
export default function ValuePillars() {
  const pillars = [
    {
      num: '↳ 01',
      title: 'Curated, not crowded.',
      description:
        'Five era-defining picks. A focused collection, without the endless scrolling.',
    },
    {
      num: '↳ 02',
      title: 'The details matter.',
      description:
        'Clear platform, region and condition notes help you find the right fit.',
    },
    {
      num: '↳ 03',
      title: 'Ready for another player.',
      description:
        'Our proposed process: inspect, clean, play-test and pack each classic with care.',
    },
  ];

  return (
    <section className="w-full bg-[#F3F0E7] text-[#10131E] py-20 lg:py-24">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#10131E] mb-12 sm:mb-16">
          A better way to go back.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-sm font-mono font-bold text-[#5A6350] mb-3">
                {pillar.num}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#10131E] tracking-tight mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4E534C] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
