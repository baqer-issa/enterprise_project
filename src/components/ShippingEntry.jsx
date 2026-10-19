import { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiArrowUpRight, FiAlertCircle } from 'react-icons/fi';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import CheckoutSteps from './checkout/CheckoutSteps';
import CheckoutOrderSummary from './checkout/CheckoutOrderSummary';
import { OrderContext } from '../OrderContext';

export default function ShippingEntry() {
  const location = useLocation();
  const navigate = useNavigate();
  const { shippingInfo, setShippingInfo } = useContext(OrderContext) || {};

  const existingOrder = location.state?.order || {};

  // Initialize with existing context/state data, or prototype defaults
  const [formData, setFormData] = useState({
    name: existingOrder.name || shippingInfo?.name || 'Jordan Lee',
    email: existingOrder.email || shippingInfo?.email || 'jordan.lee@example.com',
    addressLine1: existingOrder.addressLine1 || shippingInfo?.addressLine1 || '128 Maple Street',
    addressLine2: existingOrder.addressLine2 || shippingInfo?.addressLine2 || 'Apt 4B',
    city: existingOrder.city || shippingInfo?.city || 'Portland',
    state: existingOrder.state || shippingInfo?.state || 'OR',
    zip: existingOrder.zip || shippingInfo?.zip || '97205',
  });

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Validate fields according to prototype rules
  const validate = (data) => {
    const errs = {};

    // 1. Full name
    if (!data.name || !data.name.trim()) {
      errs.name = "Enter the recipient's full name.";
    }

    // 2. Email address
    const emailStr = String(data.email || '').trim();
    if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
      errs.email = 'Enter a valid email address.';
    }

    // 3. Address line 1
    if (!data.addressLine1 || !data.addressLine1.trim()) {
      errs.addressLine1 = 'Enter a street address.';
    }

    // 4. City
    if (!data.city || !data.city.trim()) {
      errs.city = 'Enter a city.';
    }

    // 5. State
    if (!data.state || !data.state.trim()) {
      errs.state = 'Choose a state.';
    }

    // 6. ZIP code: 5 digits
    const cleanedZip = String(data.zip || '').trim();
    if (!/^\d{5}$/.test(cleanedZip)) {
      errs.zip = 'Enter a valid 5-digit ZIP code.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'zip') {
      formattedValue = value.replace(/\D/g, '').slice(0, 5);
    } else if (name === 'state') {
      formattedValue = value.slice(0, 2).toUpperCase();
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
    if (setShippingInfo) {
      setShippingInfo(formData);
    }

    // Combine with existing order state
    const updatedOrder = {
      ...existingOrder,
      ...formData,
    };

    navigate('/purchase/viewOrder', { state: { order: updatedOrder } });
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
              Checkout / Step 03 of 04
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#10131E] leading-tight mb-2">
              Where's the next level?
            </h1>
            <p className="text-sm sm:text-base text-[#5D6475]">
              Tell us where to send your classics. We currently ship within the United States.
            </p>
          </div>

          {/* Checkout Progress Steps */}
          <div className="mb-10 pb-4 border-b border-stone-300/70">
            <CheckoutSteps currentStep={3} />
          </div>

          {/* Two-Column Grid: Form + Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Form Card */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
              <h2 className="text-2xl font-bold text-[#10131E] mb-2">
                Shipping address
              </h2>

              <p className="text-xs text-[#7E8594] mb-6">
                * Required · Country: United States
              </p>

              {/* Error Banner when validation fails */}
              {hasSubmitted && errorCount > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-[#FEEBEB] border border-[#FCA5A5] flex items-start gap-3 text-[#991B1B]">
                  <FiAlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">
                      A few address details need a replay
                    </h3>
                    <p className="text-xs text-[#991B1B] mt-0.5">
                      Check the required name, street, city, state and ZIP fields below.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Full name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-[#10131E] mb-2">
                    Full name *
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all ${
                        errors.name
                          ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                          : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                      } focus:outline-none`}
                    />
                    {errors.name && (
                      <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#10131E] mb-2">
                    Email address *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all ${
                        errors.email
                          ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                          : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                      } focus:outline-none`}
                    />
                    {errors.email && (
                      <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.email ? (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.email}
                    </p>
                  ) : (
                    <p className="text-xs text-[#7E8594] mt-1.5">
                      We'll send the order confirmation here.
                    </p>
                  )}
                </div>

                {/* 3. Address line 1 */}
                <div>
                  <label htmlFor="addressLine1" className="block text-xs font-bold text-[#10131E] mb-2">
                    Address line 1 *
                  </label>
                  <div className="relative">
                    <input
                      id="addressLine1"
                      type="text"
                      name="addressLine1"
                      autoComplete="address-line1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="Enter address line 1"
                      className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all ${
                        errors.addressLine1
                          ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                          : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                      } focus:outline-none`}
                    />
                    {errors.addressLine1 && (
                      <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.addressLine1 && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium">
                      {errors.addressLine1}
                    </p>
                  )}
                </div>

                {/* 4. Address line 2 (optional) */}
                <div>
                  <label htmlFor="addressLine2" className="block text-xs font-bold text-[#10131E] mb-2">
                    Address line 2 (optional)
                  </label>
                  <input
                    id="addressLine2"
                    type="text"
                    name="addressLine2"
                    autoComplete="address-line2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Apt 4B"
                    className="w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white border border-stone-300 focus:ring-2 focus:ring-[#10131E] focus:outline-none"
                  />
                </div>

                {/* 5, 6, 7. City, State, ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* City */}
                  <div className="sm:col-span-6">
                    <label htmlFor="city" className="block text-xs font-bold text-[#10131E] mb-2">
                      City *
                    </label>
                    <div className="relative">
                      <input
                        id="city"
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all ${
                          errors.city
                            ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                            : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                        } focus:outline-none`}
                      />
                      {errors.city && (
                        <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                      )}
                    </div>
                    {errors.city && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div className="sm:col-span-3">
                    <label htmlFor="state" className="block text-xs font-bold text-[#10131E] mb-2">
                      State *
                    </label>
                    <div className="relative">
                      <input
                        id="state"
                        type="text"
                        name="state"
                        autoComplete="address-level1"
                        maxLength="2"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="OR"
                        className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all uppercase ${
                          errors.state
                            ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                            : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                        } focus:outline-none`}
                      />
                      {errors.state && (
                        <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                      )}
                    </div>
                    {errors.state && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* ZIP code */}
                  <div className="sm:col-span-3">
                    <label htmlFor="zip" className="block text-xs font-bold text-[#10131E] mb-2">
                      ZIP code *
                    </label>
                    <div className="relative">
                      <input
                        id="zip"
                        type="text"
                        inputMode="numeric"
                        name="zip"
                        autoComplete="postal-code"
                        maxLength="5"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="97205"
                        className={`w-full px-4 py-3 rounded-lg text-sm text-[#10131E] bg-white transition-all font-mono ${
                          errors.zip
                            ? 'border-2 border-red-500 pr-10 focus:ring-red-500'
                            : 'border border-stone-300 focus:ring-2 focus:ring-[#10131E]'
                        } focus:outline-none`}
                      />
                      {errors.zip && (
                        <FiAlertCircle className="absolute right-3.5 top-3.5 w-5 h-5 text-red-500 pointer-events-none" />
                      )}
                    </div>
                    {errors.zip && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">
                        {errors.zip}
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Method Box */}
                <div>
                  <span className="block text-xs text-[#7E8594] font-medium mb-2">
                    Delivery method
                  </span>
                  <div className="p-4 rounded-xl bg-[#EEF6E3] border border-[#C1DE98] flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full border-4 border-[#10131E] bg-white shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-[#10131E]">
                        Standard shipping · $6.95
                      </div>
                      <div className="text-xs text-[#5D6475] mt-0.5">
                        3–5 business days after dispatch. Estimated arrival Oct 23–27, 2026.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                  <button
                    type="submit"
                    className="bg-[#C3F85C] hover:bg-[#B3EA4F] text-[#10131E] font-bold text-sm px-7 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10131E]"
                  >
                    <span>Review your order</span>
                    <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <Link
                    to="/purchase/paymentEntry"
                    state={{ order: existingOrder }}
                    className="text-xs sm:text-sm text-[#5D6475] hover:text-[#10131E] font-medium transition-colors text-center sm:text-left"
                  >
                    ← Back to payment
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