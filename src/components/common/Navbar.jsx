import { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import { OrderContext } from '../../OrderContext';

export default function Navbar({ activePage = 'home' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useContext(OrderContext) || { cart: [] };

  // Calculate cart count: if items exist in context, count them, otherwise prototype displays 3
  const contextCount = cart && cart.length > 0 
    ? cart.reduce((total, item) => total + (item.quantity || 1), 0) 
    : 3;

  return (
    <header className="w-full bg-[#10131E] text-white border-b border-white/5 sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <div className="w-full bg-[#C3F85C] text-[#10131E] py-1.5 px-4 text-center">
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase font-mono">
          OLD SCHOOL, NEW SAVE FILE. &nbsp;/&nbsp; FALL '26 COLLECTION
        </p>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-[1296px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition-colors ${
                isActive || activePage === 'home'
                  ? 'text-white'
                  : 'text-[#949BA8] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Home</span>
                {(isActive || activePage === 'home') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C3F85C]" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/purchase"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition-colors ${
                isActive && activePage === 'shop'
                  ? 'text-white'
                  : 'text-[#949BA8] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Shop</span>
                {isActive && activePage === 'shop' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C3F85C]" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition-colors ${
                isActive && activePage === 'about'
                  ? 'text-white'
                  : 'text-[#949BA8] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>About Us</span>
                {isActive && activePage === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C3F85C]" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative py-6 text-sm font-medium transition-colors ${
                isActive && activePage === 'contact'
                  ? 'text-white'
                  : 'text-[#949BA8] hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Contact Us</span>
                {isActive && activePage === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C3F85C]" />
                )}
              </>
            )}
          </NavLink>
        </div>

        {/* Right Action Icons: Search & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            aria-label="Search collection"
            className="text-[#949BA8] hover:text-white p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3F85C] rounded"
          >
            <FiSearch className="w-5 h-5" />
          </button>

          {/* Cart with count badge */}
          <Link
            to="/purchase/viewOrder"
            aria-label={`Shopping cart with ${contextCount} items`}
            className="flex items-center gap-2 p-1 text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3F85C] rounded"
          >
            <FiShoppingBag className="w-5 h-5" />
            <span className="bg-[#C3F85C] text-[#10131E] font-bold text-xs px-1.5 py-0.5 rounded-sm min-w-[20px] text-center leading-none">
              {contextCount}
            </span>
          </Link>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden text-[#949BA8] hover:text-white p-2"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181D2C] border-b border-white/10 px-6 py-4 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-medium text-base py-2 hover:text-[#C3F85C]"
          >
            Home
          </Link>
          <Link
            to="/purchase"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#949BA8] font-medium text-base py-2 hover:text-[#C3F85C]"
          >
            Shop
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#949BA8] font-medium text-base py-2 hover:text-[#C3F85C]"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#949BA8] font-medium text-base py-2 hover:text-[#C3F85C]"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
