import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-[#10131E] text-white border-t border-white/5">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-6">
            <Logo />
            <p className="mt-5 text-sm text-[#7E8594] leading-relaxed max-w-sm">
              Good games deserve another go. A considered collection of consoles, cartridges and memories.
            </p>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#C3F85C] uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/purchase"
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  Shop the collection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  Our story
                </Link>
              </li>
              <li>
                <Link
                  to="/purchase/viewOrder"
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  Your cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Player Support Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#C3F85C] uppercase mb-4">
              Player Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  to="/purchase/shippingEntry"
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  Shipping & delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-[#949BA8] hover:text-white transition-colors"
                >
                  Returns & refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5D6475]">
          <p>© 2026 Retro Replay · Concept store. Sample products, team and policies.</p>
          <div className="flex items-center gap-2">
            <span>Privacy</span>
            <span>/</span>
            <span>Terms</span>
            <span>/</span>
            <span>USD $ · United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
