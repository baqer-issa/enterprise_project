import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="w-full bg-[#E8E1F3] text-[#1F1934] py-16 sm:py-20">
      <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and Tagline */}
          <div className="lg:col-span-6">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono text-[#554A70] block mb-2">
              Don't miss the next save point
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1F1934] leading-[1.1] mb-2.5">
              A little nostalgia in your inbox.
            </h2>
            <p className="text-sm sm:text-base text-[#554A70] font-medium">
              Collection news and stories worth replaying. No spam side quests.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-white/80 rounded-xl border border-[#D5CAE5] text-[#1F1934] font-semibold text-sm">
                Thanks for checking in! Concept preview only — no email was sent or stored.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="bg-white text-[#10131E] placeholder-[#8A839E] px-4 py-3 rounded-lg text-sm flex-grow border border-[#D5CAE5] focus:outline-none focus:ring-2 focus:ring-[#C3F85C] shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-[#C3F85C] hover:bg-[#b3ea4f] text-[#10131E] font-bold text-sm px-7 py-3 rounded-lg transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10131E] cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
            <p className="text-xs text-[#7A7094] mt-2.5">
              Concept signup preview. No email is collected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
