import { Link } from 'react-router-dom';

export function RetroLogoIcon({ className = "w-7 h-7" }) {
  return (
    <svg 
      viewBox="0 0 28 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Outer retro cartridge/pad geometric shape in retro-lime */}
      {/* Top cap */}
      <rect x="0" y="0" width="22" height="5" fill="#C3F85C" />
      {/* Right shoulder tab */}
      <rect x="0" y="5" width="28" height="3" fill="#C3F85C" />
      {/* Right wall */}
      <rect x="22" y="8" width="6" height="14" fill="#C3F85C" />
      {/* Top left wall */}
      <rect x="0" y="8" width="6" height="4" fill="#C3F85C" />
      {/* Bottom left wall */}
      <rect x="0" y="17" width="6" height="5" fill="#C3F85C" />
      {/* Bottom base */}
      <rect x="0" y="22" width="25" height="2" fill="#C3F85C" />
      {/* Center play triangle */}
      <polygon points="10,9 10,21 21,15" fill="#C3F85C" />
    </svg>
  );
}

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3F85C] rounded ${className}`}>
      <RetroLogoIcon className="w-8 h-8 text-[#C3F85C] shrink-0 transition-transform group-hover:scale-105" />
      <div className="flex flex-col text-left leading-none">
        <span className="font-extrabold tracking-wider text-white text-base leading-none">RETRO</span>
        <span className="font-extrabold tracking-wider text-white text-base leading-none mt-0.5">REPLAY</span>
      </div>
    </Link>
  );
}
