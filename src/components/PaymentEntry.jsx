import { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiArrowUpRight, FiAlertCircle, FiShield, FiCreditCard } from 'react-icons/fi';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CheckoutSteps from './checkout/CheckoutSteps';
import CheckoutOrderSummary from './checkout/CheckoutOrderSummary';
import { OrderContext } from '../OrderContext';

export default function PaymentEntry() {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentInfo, setPaymentInfo } = useContext(OrderContext) || {};

  const existingOrder = location.state?.order || {};

  // Initialize with existing context/state data, or prototype defaults
  const [formData, setFormData] = useState({
    card_holder_name: existingOrder.card_holder_name || paymentInfo?.card_holder_name || 'Jordan Lee',
    credit_card_number: existingOrder.credit_card_number || paymentInfo?.credit_card_number || '4242 4242 4242 4242',
    expir_date: existingOrder.expir_date || paymentInfo?.expir_date || '08/29',
    cvvCode: existingOrder.cvvCode || paymentInfo?.cvvCode || '842',
  });

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Validate fields according to prototype rules
  const validate = (data) => {
    const errs = {};

    // 1. Cardholder name
    if (!data.card_holder_name || !data.card_holder_name.trim()) {
      errs.card_holder_name = 'Enter the name shown on your card.';
    }

    // 2. Card number: 16 digits
    const cleanedNumber = String(data.credit_card_number || '').replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleanedNumber)) {
      errs.credit_card_number = 'Enter a valid 16-digit card number.';
    }

    // 3. Expiration date: MM/YY and future date
    const expMatch = String(data.expir_date || '').trim().match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
    if (!expMatch) {
      errs.expir_date = 'Use a future expiration date.';
    } else {
      const month = parseInt(expMatch[1], 10);
      const year = parseInt('20' + expMatch[2], 10);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        errs.expir_date = 'Use a future expiration date.';
      }
    }

    // 4. CVV: 3 digits
    const cleanedCvv = String(data.cvvCode || '').trim();
    if (!/^\d{3}$/.test(cleanedCvv)) {
      errs.cvvCode = 'Enter the 3-digit security code.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Optional card number formatting with spaces for 16 digits
    if (name === 'credit_card_number') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
      const parts = digitsOnly.match(/[\s\S]{1,4}/g) || [];
      formattedValue = parts.join(' ');
    } else if (name === 'expir_date') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
      if (digitsOnly.length > 2) {
        formattedValue = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
      } else {
        formattedValue = digitsOnly;
      }
    } else if (name === 'cvvCode') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    const updated = { ...formData, [name]: formattedValue };
    setFormData(updated);

    if (hasSubmitted) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});

    // Persist into OrderContext
    if (setPaymentInfo) {
      setPaymentInfo(formData);
    }

    // Combine with existing order state
    const updatedOrder = {
      ...existingOrder,
      ...formData,
    };

    navigate('/purchase/shippingEntry', { state: { order: updatedOrder } });
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="min-h-screen bg-[#F3F0E7] text-[#10131E] flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      <Navbar activePage="shop" />

      <main className="flex-grow py-10 sm:py-14">
        <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
          {/* Top Kicker and Heading */}
          <div className="mb-8">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase font-mono text-[#7E8594] block mb-2">
              Checkout / Step 02 of 04
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#10131E] leading-tight mb-2">
              Keep the good times going.
            </h1>
            <p className="text-sm sm:text-base text-[#5D6475]">
              First, your payment details. You won't be charged until you place your order.
            </p>
          </div>

          {/* Checkout Progress Steps */}
          <div className="mb-10 pb-4 border-b border-stone-300/70">
            <CheckoutSteps currentStep={2} />
          </div>

          {/* Two-Column Grid: Form + Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-[#10131E] mb-6">
                Payment details
              </h2>

              {/* Selected Payment Method Header Box */}
              <div className="mb-6 p-4 rounded-xl bg-[#EEF6E3] border border-[#C1DE98] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border-4 border-[#10131E] bg-white shrink-0" />
                  <FiCreditCard className="w-5 h-5 text-[#10131E] shrink-0" />
                  <span className="font-semibold text-sm text-[#10131E]">
                    Credit or debit card
                  </span>
                </div>
                <span className="font-bold text-xs tracking-wider text-[#10131E] uppercase">
                  VISA
                </span>
              </div>

              {/* Error Banner when validation fails */}
              {hasSubmitted && errorCount > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-[#FEEBEB] border border-[#FCA5A5] flex items-start gap-3 text-[#991B1B]">
                  <FiAlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">
                      Check your payment details
                    </h3>
                    <p className="text-xs text-[#991B1B] mt-0.5">
                      Please correct the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} before continuing to shipping.
                    </p>
                  </div>
                </div>
              )}

              <p className="text-xs text-[#7E8594] mb-6">
                All fields marked * are required. Sample card details only.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Cardholder name */}
                <div>
                  <label htmlFor="card_holder_name" className="block text-xs font-bold text-[#10131E] mb-2">
                    Cardholder name *
                  </label>
                  <div className="relative">
                    <input
                      id="card_holder_name"
                      type="text"
                      name="card_holder_name"
                      autoComplete="cc-name"
                      value={formData.card_holder_name}
                      onChange={handleChange}
                      placeholder="Enter cardholder name"
                      className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all ${
                        errors.card_holder_name
                          ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                          : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                      } focus:outline-none`}
                    />
                    {errors.card_holder_name && (
                      <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.card_holder_name && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.card_holder_name}
                    </p>
                  )}
                </div>

                {/* 2. Card number */}
                <div>
                  <label htmlFor="credit_card_number" className="block text-xs font-bold text-[#10131E] mb-2">
                    Card number *
                  </label>
                  <div className="relative">
                    <input
                      id="credit_card_number"
                      type="text"
                      inputMode="numeric"
                      name="credit_card_number"
                      autoComplete="cc-number"
                      value={formData.credit_card_number}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                      className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all font-mono ${
                        errors.credit_card_number
                          ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                          : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                      } focus:outline-none`}
                    />
                    {errors.credit_card_number && (
                      <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.credit_card_number ? (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.credit_card_number}
                    </p>
                  ) : (
                    <p className="text-xs text-[#7E8594] mt-1.5">
                      Sample Visa card · ending in 4242
                    </p>
                  )}
                </div>

                {/* 3 & 4. Expiration and CVV row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Expiration */}
                  <div>
                    <label htmlFor="expir_date" className="block text-xs font-bold text-[#10131E] mb-2">
                      Expiration (MM/YY) *
                    </label>
                    <div className="relative">
                      <input
                        id="expir_date"
                        type="text"
                        name="expir_date"
                        autoComplete="cc-exp"
                        value={formData.expir_date}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all font-mono ${
                          errors.expir_date
                            ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                            : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                        } focus:outline-none`}
                      />
                      {errors.expir_date && (
                        <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                      )}
                    </div>
                    {errors.expir_date && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">
                        {errors.expir_date}
                      </p>
                    )}
                  </div>

                  {/* CVV */}
                  <div>
                    <label htmlFor="cvvCode" className="block text-xs font-bold text-[#10131E] mb-2">
                      CVV *
                    </label>
                    <div className="relative">
                      <input
                        id="cvvCode"
                        type="password"
                        inputMode="numeric"
                        name="cvvCode"
                        autoComplete="cc-csc"
                        value={formData.cvvCode}
                        onChange={handleChange}
                        placeholder="•••"
                        className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all font-mono ${
                          errors.cvvCode
                            ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                            : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                        } focus:outline-none`}
                      />
                      {errors.cvvCode && (
                        <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                      )}
                    </div>
                    {errors.cvvCode ? (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">
                        {errors.cvvCode}
                      </p>
                    ) : (
                      <p className="text-xs text-[#7E8594] mt-1.5">
                        3 digits on the back of your card.
                      </p>
                    )}
                  </div>
                </div>

                {/* Security Note */}
                <div className="pt-4 flex items-start gap-2.5 text-xs text-[#5D6475] leading-relaxed">
                  <FiShield className="w-4 h-4 text-[#5D6475] shrink-0 mt-0.5" />
                  <span>
                    Card details are shown for this concept checkout only. We don't collect or store payment information here.
                  </span>
                </div>

                {/* Actions Row */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                  <button
                    type="submit"
                    className="bg-[#C3F85C] hover:bg-[#B3EA4F] text-[#10131E] font-bold text-sm px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10131E]"
                  >
                    <span>Continue to shipping</span>
                    <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <Link
                    to="/purchase/viewOrder"
                    className="text-xs sm:text-sm text-[#5D6475] hover:text-[#10131E] font-medium transition-colors text-center sm:text-left"
                  >
                    ← Back to cart
                  </Link>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
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