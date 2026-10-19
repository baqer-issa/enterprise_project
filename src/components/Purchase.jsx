import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiPlus, FiMinus, FiTrash2, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { LuGamepad2, LuTv, LuSparkles } from 'react-icons/lu';
import { OrderContext } from '../OrderContext';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

// Hardcoded catalog of 5 retro gaming items matching public/images and Home page
const catalog = [
  {
    id: 1,
    slug: 'snes-mario',
    name: 'Super Mario World',
    price: 34.99,
    category: 'cartridges',
    tag: 'SNES',
    year: '1991',
    meta: '1991 / Game · Cartridge only',
    condition: 'Authentic · Cleaned & Tested · New Save Battery',
    image: '/images/snes-mario.png',
    zoomOut: false,
  },
  {
    id: 2,
    slug: 'genesis-sonic',
    name: 'Sonic the Hedgehog',
    price: 24.99,
    category: 'cartridges',
    tag: 'SEGA GENESIS',
    year: '1991',
    meta: '1991 / Game · Cartridge only',
    condition: 'Authentic · Cleaned & Tested · Original Label',
    image: '/images/genesis-sonic.png',
    zoomOut: true,
  },
  {
    id: 3,
    slug: 'gameboy-pokemon',
    name: 'Pokémon Red',
    price: 64.99,
    category: 'cartridges',
    tag: 'GAME BOY',
    year: '1998',
    meta: '1998 / Game · Cartridge only',
    condition: 'Authentic · Fresh CR2025 Save Battery Installed',
    image: '/images/gameboy-pokemon.png',
    zoomOut: false,
  },
  {
    id: 4,
    slug: 'n64-system',
    name: 'Nintendo 64',
    price: 119.99,
    category: 'consoles',
    tag: 'NINTENDO',
    year: '1996',
    meta: '1996 / Console · Controller + cables',
    condition: 'Refurbished System · 1x Tight-Stick Gray Controller + AV/Power',
    image: '/images/n64-console.png',
    zoomOut: false,
  },
  {
    id: 5,
    slug: 'ps1-system',
    name: 'PlayStation 1',
    price: 99.99,
    category: 'consoles',
    tag: 'SONY',
    year: '1995',
    meta: '1995 / Console · DualShock + cables',
    condition: 'Refurbished System · 1x Original Controller + Memory Card + Cables',
    image: '/images/ps1-console.png',
    zoomOut: true,
  },
];

export default function Purchase() {
  const { cart, setCart } = useContext(OrderContext);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  // Initialize quantities from existing OrderContext cart if user navigates back
  const [quantities, setQuantities] = useState(() => {
    const initial = {};
    if (cart && cart.length > 0) {
      cart.forEach((item) => {
        initial[item.id] = item.quantity;
      });
    }
    return initial;
  });

  // Sync quantities with OrderContext cart in real time so Navbar badge updates immediately
  useEffect(() => {
    const selectedItems = catalog
      .map((item) => ({
        ...item,
        quantity: quantities[item.id] || 0,
      }))
      .filter((item) => item.quantity > 0);

    setCart(selectedItems);
  }, [quantities, setCart]);

  const handleQuantityChange = (id, value) => {
    const parsed = Math.max(0, parseInt(value, 10) || 0);
    setQuantities((prev) => ({
      ...prev,
      [id]: parsed,
    }));
  };

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) - 1),
    }));
  };

  const removeItem = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = catalog
      .map((item) => ({
        ...item,
        quantity: quantities[item.id] || 0,
      }))
      .filter((item) => item.quantity > 0);

    if (selectedItems.length === 0) {
      alert('Please select at least one classic item to purchase.');
      return;
    }

    setCart(selectedItems);
    // Also pass order object in router state for components using useLocation()
    const buyQuantity = catalog.map((item) => quantities[item.id] || 0);
    navigate('/purchase/paymentEntry', {
      state: {
        order: {
          buyQuantity,
          items: selectedItems,
          credit_card_number: '',
          expir_date: '',
          cvvCode: '',
          card_holder_name: '',
          name: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          zip: '',
        },
      },
    });
  };

  const filteredCatalog =
    activeCategory === 'all'
      ? catalog
      : catalog.filter((item) => item.category === activeCategory);

  const selectedList = catalog
    .map((item) => ({ ...item, quantity: quantities[item.id] || 0 }))
    .filter((item) => item.quantity > 0);

  const totalItems = selectedList.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedList.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      <Navbar activePage="shop" />

      <main className="flex-grow">
        {/* Hero / Header Banner */}
        <section className="w-full bg-[#10131E] border-b border-white/5 pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono mb-3">
                  <span className="text-[#A78BFA]">01 / </span>
                  <span className="text-[#7E8594]">THE VAULT CATALOG</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Shop Confirmed Classics.
                </h1>
                <p className="text-sm sm:text-base text-[#949BA8] mt-3 max-w-2xl">
                  Every cartridge and console is authentically sourced, ultrasonically cleaned, and bench-tested with fresh save batteries before shipping.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#C3F85C] text-[#10131E]'
                      : 'bg-[#151926] text-[#949BA8] hover:text-white border border-white/10'
                  }`}
                >
                  All Classics (5)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('cartridges')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-mono inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeCategory === 'cartridges'
                      ? 'bg-[#C3F85C] text-[#10131E]'
                      : 'bg-[#151926] text-[#949BA8] hover:text-white border border-white/10'
                  }`}
                >
                  <LuGamepad2 className="w-4 h-4" />
                  Cartridges (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('consoles')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-mono inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeCategory === 'consoles'
                      ? 'bg-[#C3F85C] text-[#10131E]'
                      : 'bg-[#151926] text-[#949BA8] hover:text-white border border-white/10'
                  }`}
                >
                  <LuTv className="w-4 h-4" />
                  Consoles (2)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Shop Grid + Sticky Cart Sidebar */}
        <section className="max-w-[1296px] mx-auto px-6 lg:px-8 py-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Columns: Product Cards + Quick-Order Table */}
            <div className="lg:col-span-8 space-y-12">
              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredCatalog.map((product) => {
                  const qty = quantities[product.id] || 0;
                  const isSelected = qty > 0;

                  return (
                    <div
                      key={product.id}
                      className={`rounded-2xl overflow-hidden flex flex-col transition-all duration-300 border ${
                        isSelected
                          ? 'bg-[#151A28] border-[#C3F85C] shadow-[0_0_25px_rgba(195,248,92,0.12)]'
                          : 'bg-[#121622] border-white/10 hover:border-white/25'
                      }`}
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[416/300] bg-[#EFE0CB] overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full h-full object-center hover:scale-105 transition-transform duration-500 ${
                            product.zoomOut
                              ? 'object-contain p-10 sm:p-12'
                              : 'object-cover'
                          }`}
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-[#10131E]/90 backdrop-blur-sm text-[#C3F85C] font-mono text-[11px] font-bold tracking-wider uppercase">
                            {product.tag}
                          </span>
                          <span className="px-2 py-1 rounded bg-[#10131E]/75 text-white font-mono text-[11px]">
                            {product.year}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#C3F85C] text-[#10131E] font-mono text-xs font-extrabold flex items-center gap-1 shadow">
                            <FiCheckCircle className="w-3.5 h-3.5" />
                            <span>In Cart ({qty})</span>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-lg font-bold text-white tracking-tight">
                            {product.name}
                          </h3>
                          <span className="text-lg font-bold text-[#C3F85C] font-mono">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-xs text-[#949BA8] mt-1">{product.meta}</p>
                        <p className="text-xs text-[#7E8594] mt-2 mb-5 flex items-center gap-1.5">
                          <LuSparkles className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
                          <span>{product.condition}</span>
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                          <label
                            htmlFor={`qty-${product.id}`}
                            className="text-xs font-mono uppercase tracking-wider text-[#949BA8]"
                          >
                            Quantity
                          </label>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(product.id)}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="w-8 h-8 rounded-lg bg-[#1B2030] hover:bg-[#252B3F] border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                              <FiMinus className="w-3.5 h-3.5" />
                            </button>

                            <input
                              id={`qty-${product.id}`}
                              type="number"
                              min="0"
                              value={qty}
                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                              className="w-14 h-8 rounded-lg bg-[#10131E] border border-white/15 text-center font-mono text-sm font-bold text-white focus:outline-none focus:border-[#C3F85C]"
                            />

                            <button
                              type="button"
                              onClick={() => incrementQuantity(product.id)}
                              aria-label={`Increase quantity of ${product.name}`}
                              className="w-8 h-8 rounded-lg bg-[#C3F85C] hover:bg-[#b3ea4f] text-[#10131E] flex items-center justify-center font-bold transition-colors cursor-pointer"
                            >
                              <FiPlus className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Lab 6 Requirement: Styled Product Catalog Table View */}
              <div className="bg-[#151926] border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 bg-[#181D2C] border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Quick-Order Catalog Table
                    </h2>
                    <p className="text-xs text-[#949BA8]">
                      Compare unit pricing and adjust quantities directly across all 5 launch titles.
                    </p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
                    5 Items Available
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-[#949BA8] bg-[#121622]">
                        <th className="py-3.5 px-6">Product Name</th>
                        <th className="py-3.5 px-4">Platform</th>
                        <th className="py-3.5 px-4 text-right">Unit Price</th>
                        <th className="py-3.5 px-6 text-center">Quantity</th>
                        <th className="py-3.5 px-6 text-right">Line Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {catalog.map((item) => {
                        const qty = quantities[item.id] || 0;
                        return (
                          <tr
                            key={item.id}
                            className={`transition-colors ${
                              qty > 0 ? 'bg-[#C3F85C]/5' : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className={`w-10 h-10 rounded-lg bg-[#EFE0CB] shrink-0 ${
                                  item.zoomOut ? 'object-contain p-1' : 'object-cover'
                                }`}
                              />
                              <div>
                                <div>{item.name}</div>
                                <div className="text-xs text-[#7E8594] font-normal">{item.year} Release</div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#A78BFA]">
                                {item.tag}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-[#C3F85C] font-semibold">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <input
                                type="number"
                                min="0"
                                aria-label={`Table quantity for ${item.name}`}
                                value={qty}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                className="w-16 h-8 rounded bg-[#10131E] border border-white/15 text-center font-mono text-sm text-white focus:outline-none focus:border-[#C3F85C]"
                              />
                            </td>
                            <td className="py-4 px-6 text-right font-mono font-bold text-white">
                              ${(item.price * qty).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Live Interactive Shopping Cart Summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-[#151926] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <FiShoppingBag className="w-5 h-5 text-[#C3F85C]" />
                  <h2 className="text-lg font-bold text-white">Your Save File (Cart)</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C3F85C] text-[#10131E] font-mono text-xs font-extrabold">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>

              {selectedList.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-sm text-[#949BA8] mb-1">Your cart is currently empty.</p>
                  <p className="text-xs text-[#7E8594]">
                    Use the + buttons or quantity inputs to add classics to your order.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10 my-4 max-h-[340px] overflow-y-auto pr-1">
                  {selectedList.map((item) => (
                    <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-12 h-12 rounded-lg bg-[#EFE0CB] shrink-0 ${
                            item.zoomOut ? 'object-contain p-1' : 'object-cover'
                          }`}
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                          <p className="text-xs text-[#949BA8] font-mono">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-mono font-bold text-[#C3F85C]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          title="Remove item"
                          className="p-1.5 text-[#7E8594] hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Totals */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
                <div className="flex justify-between text-[#949BA8]">
                  <span>Shipping</span>
                  <span className="font-mono text-[#C3F85C]">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2">
                  <span>Estimated Total</span>
                  <span className="font-mono text-xl text-[#C3F85C]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={selectedList.length === 0}
                className={`mt-6 w-full py-3.5 px-6 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedList.length > 0
                    ? 'bg-[#C3F85C] hover:bg-[#b3ea4f] text-[#10131E] shadow-lg'
                    : 'bg-white/10 text-[#7E8594] cursor-not-allowed'
                }`}
              >
                <span>Proceed to Payment</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </aside>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}