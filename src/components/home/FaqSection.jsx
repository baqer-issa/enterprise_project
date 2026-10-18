import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

export default function FaqSection() {
  const faqs = [
    {
      q: 'Will these work with my setup?',
      a: 'All five products are US-region originals. Classic consoles use AV cables; modern TVs may need an adapter, not included.',
    },
    {
      q: 'What comes with a console?',
      a: 'One original controller, AV cable and power supply. Games are sold separately.',
    },
  ];

  return (
    <section className="w-full bg-[#1B2030] text-white py-16 sm:py-20 lg:py-24 border-y border-white/5">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Heading and Support Link */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-[1.1] mb-5">
              A little help before<br className="hidden sm:inline" />
              you press start.
            </h2>
            <Link
              to="/contact"
              className="text-xs sm:text-sm font-semibold text-[#C3F85C] hover:underline inline-flex items-center gap-1 group"
            >
              <span>Visit player support</span>
              <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Right Column: FAQs */}
          <div className="lg:col-span-7 space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#949BA8] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
