import React, { useState } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { FiMail, FiPhone, FiMapPin, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';

const faqs = [
  {
    q: 'What is your cartridge return and exchange policy?',
    a: 'We offer a 30-day money-back guarantee on all cartridges and consoles. If a save battery fails or a pin connector requires adjustment, we cover return shipping.',
  },
  {
    q: 'Are all games tested before shipment?',
    a: 'Yes! Every cartridge is cleaned with isopropyl ultrasonic baths, tested on original hardware, and verified for save-state functionality.',
  },
  {
    q: 'How do you handle shipping protection?',
    a: 'All orders are packed in anti-static bubble wrap and custom-fitted rigid cardboard boxes designed specifically for vintage box and cartridge safety.',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'return', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      <Navbar activePage="contact" />

      <main className="flex-grow">
        <section className="w-full bg-[#10131E] border-b border-white/5 py-16">
          <div className="max-w-[1296px] mx-auto px-6 lg:px-8 text-center max-w-3xl">
            <div className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#C3F85C] mb-3">
              03 / AFTER-SALE SUPPORT
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              We're here to help you restart.
            </h1>
            <p className="text-base text-[#949BA8]">
              Reach out for return inquiries, hardware troubleshooting, or order support. Our support team responds within 24 hours.
            </p>
          </div>
        </section>

        <section className="max-w-[1296px] mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#151926] border border-white/10 rounded-2xl p-7 space-y-6">
                <h3 className="text-lg font-bold text-white">Support Channels</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1D2133] flex items-center justify-center text-[#C3F85C] shrink-0">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#949BA8] uppercase">Email Support</p>
                    <p className="text-sm font-semibold text-white mt-0.5">support@retroreplay.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1D2133] flex items-center justify-center text-[#A78BFA] shrink-0">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#949BA8] uppercase">Hotline (12PM - 8PM EST)</p>
                    <p className="text-sm font-semibold text-white mt-0.5">1-800-RETRO-SAVE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1D2133] flex items-center justify-center text-[#C3F85C] shrink-0">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#949BA8] uppercase">Vault Headquarters</p>
                    <p className="text-sm font-semibold text-white mt-0.5">New York, NY / Chicago, IL</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#151926] border border-white/10 rounded-2xl p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <FiCheckCircle className="w-16 h-16 text-[#C3F85C] mx-auto" />
                  <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-sm text-[#949BA8] max-w-md mx-auto">
                    Thank you for reaching out. A support ticket has been logged and our team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'return', message: '' }); }}
                    className="mt-4 px-6 py-2.5 bg-[#C3F85C] text-[#10131E] font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Send a Support Ticket</h3>
                    <p className="text-xs text-[#949BA8]">Fill out the details below regarding your return or issue.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#949BA8] mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full bg-[#10131E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C3F85C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#949BA8] mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane.doe@example.com"
                        className="w-full bg-[#10131E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C3F85C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#949BA8] mb-2">Subject / Inquiry Type</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#10131E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C3F85C]"
                    >
                      <option value="return">Return / Exchange Request</option>
                      <option value="battery">Save Battery Replacement Help</option>
                      <option value="shipping">Shipping & Tracking Issue</option>
                      <option value="other">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#949BA8] mb-2">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your issue or return details..."
                      className="w-full bg-[#10131E] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C3F85C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#C3F85C] hover:bg-[#b3ea4f] text-[#10131E] font-bold text-sm tracking-wide transition-all cursor-pointer shadow-lg"
                  >
                    Submit Support Ticket
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="w-full bg-[#121622] py-16 border-t border-white/5">
          <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <FiHelpCircle className="text-[#C3F85C]" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#181D2C] border border-white/10 rounded-xl p-6">
                  <h4 className="text-base font-bold text-white mb-2">{faq.q}</h4>
                  <p className="text-xs text-[#949BA8] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}