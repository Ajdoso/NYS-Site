import React from 'react';
import Link from 'next/link';
import { KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function RootLandingPage() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#050505] text-white overflow-hidden">
      {/* ================= LEFT SIDE: TYN ================= */}
      <div className="relative flex-1 group overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-[50vh] lg:min-h-screen">
        {/* Background Image with Zoom & Dark Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/80 to-transparent" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <KoshkarMuyiz className="w-8 h-8 text-[#C49A45]" color="#C49A45" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#C49A45]">
              Kazakh Heritage
            </span>
          </div>
          <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 bg-[#0D4352]/70 border border-[#C49A45]/30 rounded text-[#F7F5F0]">
            ALMATY • ASTANA
          </span>
        </div>

        {/* Brand Headline & Entry */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[0.15em] font-serif text-[#F7F5F0] uppercase leading-none">
            TYN
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light tracking-wide leading-relaxed">
            Authentic Kazakh ornamentation re-engineered into heavyweight modern streetwear. Central Asian soul meets contemporary tailoring.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tyn"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C49A45] hover:bg-[#E0C078] text-[#0A1F26] text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-xl"
            >
              Enter TYN Store <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tyn/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#C49A45]/50 hover:bg-[#0D4352] text-white text-xs font-bold tracking-widest uppercase transition-colors"
            >
              View Drops
            </Link>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 text-[11px] text-zinc-400 tracking-widest uppercase flex items-center justify-between border-t border-[#C49A45]/20 pt-4">
          <span>Дала Көкжиегі — Drop 01</span>
          <span className="text-[#C49A45]">100% Organic Steppe Cotton</span>
        </div>
      </div>

      {/* ================= RIGHT SIDE: PROATHLETIC ================= */}
      <div className="relative flex-1 group overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-[50vh] lg:min-h-screen">
        {/* Background Image with Zoom & Dark Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-40 group-hover:opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-6 bg-[#CCFF00] skew-x-[-20deg]" />
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#CCFF00]">
              Performance Lab
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 bg-[#17181A] border border-[#25272A] text-zinc-300">
            PRO ATHLETE GEAR
          </span>
        </div>

        {/* Brand Headline & Entry */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none font-sans">
            PRO<span className="text-[#CCFF00]">ATHLETIC</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light tracking-wide leading-relaxed">
            High-torque training wear built for speed, torque, and extreme physical output. No compromises. Zero distraction.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/proathletic"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-xl"
            >
              Enter PROATHLETIC <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/proathletic/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#25272A] hover:border-[#CCFF00] text-white text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Shop Gear
            </Link>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="relative z-10 text-[11px] text-zinc-400 font-mono tracking-widest uppercase flex items-center justify-between border-t border-[#25272A] pt-4">
          <div className="flex items-center space-x-2 text-[#CCFF00]">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>High Voltage Compression</span>
          </div>
          <span>Seam Durability Guarantee</span>
        </div>
      </div>
    </main>
  );
}
