import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

export default function Confirmation() {
  const location = useLocation();
  const confirmationNumber = location.state?.confirmationNumber || 'PENDING';

  return (
    <div className="min-h-screen bg-[#F3F0E7] text-[#10131E] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="bg-white rounded-2xl p-10 max-w-lg w-full text-center border border-stone-200 shadow-sm">
          <h1 className="text-3xl font-extrabold mb-4">Order Confirmed!</h1>
          <p className="text-[#5D6475] mb-6">Your retro classics are getting packed up.</p>
          
          <div className="bg-[#10131E] text-[#C3F85C] rounded-xl p-6 mb-8 font-mono">
            <p className="text-xs text-white/70 uppercase tracking-widest mb-2">Confirmation #</p>
            <p className="text-2xl font-bold">{confirmationNumber}</p>
          </div>

          <Link to="/" className="text-sm font-bold text-[#10131E] underline hover:text-[#C3F85C] transition-colors">
            Return to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}