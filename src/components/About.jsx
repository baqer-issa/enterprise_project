import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { LuTarget, LuCompass, LuAward } from 'react-icons/lu';

const executives = [
  {
    name: 'Alex Theis',
    title: 'Co-Founder',
    bio: 'Overseeing full-stack architecture and system integration for rare retro hardware authentication.',
    badge: 'CSE Senior / OSU',
  },
  {
    name: 'Baqer Almaarfawi',
    title: 'Co-Founder',
    bio: 'Overseeing core backend logic, API routing, and database schema integration for seamless e-commerce transactions.',
    badge: 'CSE Senior / OSU',
  },
  {
    name: 'Osama Abuhilal',
    title: 'Co-Founder',
    bio: 'Overseeing frontend component modularity, client-side state synchronization, and responsive design systems.',
    badge: 'CSE Senior / OSU',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#10131E] text-white flex flex-col font-sans selection:bg-[#C3F85C] selection:text-[#10131E]">
      <Navbar activePage="about" />

      <main className="flex-grow">
        {/* Header Hero */}
        <section className="w-full bg-[#10131E] border-b border-white/5 py-16 sm:py-20">
          <div className="max-w-[1296px] mx-auto px-6 lg:px-8 text-center max-w-3xl">
            <div className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#A78BFA] mb-3">
              02 / ABOUT RETRO REPLAY
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Preserving the Golden Age of Gaming.
            </h1>
            <p className="text-base sm:text-lg text-[#949BA8] leading-relaxed">
              We connect passionate players with 100% verified, bench-tested original cartridges and consoles from the 8-bit, 16-bit, and 32-bit eras.
            </p>
          </div>
        </section>

        {/* Mission, Vision, Strategy */}
        <section className="max-w-[1296px] mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#151926] border border-white/10 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-[#1D2133] flex items-center justify-center text-[#C3F85C] mb-5">
                <LuTarget className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-sm text-[#949BA8] leading-relaxed">
                To deliver authentic, reliable, and collector-grade vintage gaming hardware that performs flawlessly on modern CRT or flat-panel setups.
              </p>
            </div>

            <div className="bg-[#151926] border border-white/10 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-[#1D2133] flex items-center justify-center text-[#A78BFA] mb-5">
                <LuCompass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-sm text-[#949BA8] leading-relaxed">
                To become the most trusted digital vault for retro software preservation, eliminating counterfeit reproductions through rigorous verification.
              </p>
            </div>

            <div className="bg-[#151926] border border-white/10 rounded-2xl p-7">
              <div className="w-12 h-12 rounded-xl bg-[#1D2133] flex items-center justify-center text-[#C3F85C] mb-5">
                <LuAward className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Strategy Statement</h3>
              <p className="text-sm text-[#949BA8] leading-relaxed">
                Combining ultrasonic contact cleaning, fresh CR2025 save-battery replacements, and transparent digital provenance tracking for every order.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Our Executives */}
        <section className="w-full bg-[#121622] py-20 border-t border-b border-white/5">
          <div className="max-w-[1296px] mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-[#C3F85C] mb-2">
                LEADERSHIP & EXPERTISE
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Meet our Co-Founders
              </h2>
              <p className="text-sm text-[#949BA8] mt-2">
                Built by dedicated computer scientists, researchers, and lifelong retro gaming enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {executives.map((exec, idx) => (
                <div key={idx} className="bg-[#181D2C] border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded bg-[#C3F85C]/10 text-[#C3F85C] font-mono text-xs font-bold mb-4">
                      {exec.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">{exec.name}</h3>
                    <p className="text-sm font-semibold text-[#A78BFA] mb-4">{exec.title}</p>
                    <p className="text-sm text-[#949BA8] leading-relaxed">{exec.bio}</p>
                  </div>
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