import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { OrderContext } from '../OrderContext'; // Adjust path if OrderContext is in src/

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCart, clearCart } = useContext(OrderContext) || {};
  
  const confirmationNumber = location.state?.confirmationNumber || 'PENDING';

  const handleReturnHome = () => {
    // 1. Wipe global cart state
    if (clearCart) {
      clearCart();
    } else if (setCart) {
      setCart([]);
    }

    // 2. Clear any browser storage cache
    localStorage.removeItem('cart');
    localStorage.removeItem('retro_cart');

    // 3. Navigate back to homepage
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F3F0E7] text-[#10131E] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="bg-white rounded-2xl p-10 max-w-lg w-full text-center border border-stone-200 shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C3F85C]/20 text-[#10131E] flex items-center justify-center text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-3xl font-extrabold mb-4">Order Confirmed!</h1>
          <p className="text-[#5D6475] mb-6">Your retro classics are getting packed up.</p>
          
          <div className="bg-[#10131E] text-[#C3F85C] rounded-xl p-6 mb-8 font-mono">
            <p className="text-xs text-white/70 uppercase tracking-widest mb-2">Confirmation #</p>
            <p className="text-2xl font-bold">{confirmationNumber}</p>
          </div>

          {/* The sole next step: return home with empty cart */}
          <button
            type="button"
            onClick={handleReturnHome}
            className="w-full py-3.5 px-6 rounded-xl bg-[#10131E] text-[#C3F85C] font-bold text-sm uppercase tracking-wider hover:bg-black transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}