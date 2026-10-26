import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowUpRight, FiAlertCircle } from 'react-icons/fi';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CheckoutSteps from './checkout/CheckoutSteps';
import CheckoutOrderSummary from './checkout/CheckoutOrderSummary';

const ORDER_API_URL = `${import.meta.env.VITE_AWS_API_URL}/order-processing/order`;

export default function ViewOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState(null);

  const existingOrder = location.state?.order || { items: [] };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setApiError(null);
    
    const payload = {
      items: existingOrder.items,
      paymentDetails: {
        card_holder_name: existingOrder.card_holder_name,
        credit_card_number: existingOrder.credit_card_number,
        expir_date: existingOrder.expir_date,
        cvvCode: existingOrder.cvvCode
      },
      shippingInformation: {
        name: existingOrder.name,
        email: existingOrder.email,
        addressLine1: existingOrder.addressLine1,
        addressLine2: existingOrder.addressLine2,
        city: existingOrder.city,
        state: existingOrder.state,
        zip: existingOrder.zip
      }
    };

    try {
      const response = await axios.post(ORDER_API_URL, payload);
      
      navigate('/purchase/confirmation', { 
        state: { 
          order: existingOrder,
          confirmationNumber: response.data.confirmationNumber 
        } 
      });
      
    } catch (error) {
      console.error("Order processing failed:", error);
      const errorMsg = error.response?.data?.error || "Failed to process order. Please try again.";
      setApiError(errorMsg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0E7] text-[#10131E] flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      <Navbar activePage="shop" />

      <main className="flex-grow py-10 sm:py-14">
        <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono text-[#7E8594] block mb-2">
              Checkout / Step 04 of 04
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#10131E] leading-tight mb-2">
              Review and submit.
            </h1>
          </div>

          <div className="mb-10 pb-4 border-b border-stone-300/70">
            <CheckoutSteps currentStep={4} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-[#10131E] mb-6">Final Review</h2>

              {apiError && (
                <div className="mb-6 p-4 rounded-xl bg-[#FEEBEB] border border-[#FCA5A5] flex items-start gap-3 text-[#991B1B]">
                  <FiAlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">Order Processing Error</h3>
                    <p className="text-xs text-[#991B1B] mt-0.5">{apiError}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6 text-sm text-[#5D6475]">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                  <h3 className="font-bold text-[#10131E] mb-2">Shipping to:</h3>
                  <p>{existingOrder.name}</p>
                  <p>{existingOrder.addressLine1} {existingOrder.addressLine2}</p>
                  <p>{existingOrder.city}, {existingOrder.state} {existingOrder.zip}</p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className={`bg-[#C3F85C] hover:bg-[#B3EA4F] text-[#10131E] font-bold text-sm px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-sm ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{isProcessing ? 'Processing...' : 'Place Order'}</span>
                  {!isProcessing && <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />}
                </button>

                <Link to="/purchase/shippingEntry" state={{ order: existingOrder }} className="text-xs sm:text-sm text-[#5D6475] hover:text-[#10131E] font-medium transition-colors">
                  ← Back to shipping
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <CheckoutOrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}