import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Gauge, Flame, Check } from 'lucide-react';

export default function ProAboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#050505] text-white">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F10] border border-[#25272A] rounded-full font-mono">
          <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
            FABRIC LAB & SCIENCE
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
          ENGINEERED FOR PEAK OUTPUT
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
          PROATHLETIC was founded by strength coaches and biomechanists who were sick of overpriced gym wear that rips at the crotch and holds sweat. We develop technical textiles tested by world-class competitors.
        </p>
      </div>

      {/* Grid of technical lab features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-4">
          <div className="flex items-center space-x-3 text-[#CCFF00]">
            <Gauge className="w-6 h-6" />
            <h3 className="text-base font-black uppercase tracking-wider font-mono">
              01 / HYPER-TORQUE COMPRESSION
            </h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Standard compression apparel squeezes uniformly, constricting circulation. PROATHLETIC uses graduated zone compression that channels blood return to the heart, delaying muscular fatigue and eliminating dead leg syndrome.
          </p>
          <ul className="text-xs text-zinc-300 space-y-1 font-mono pt-2">
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00]" /> 78% Recycled Polyamide, 22% Elastane</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00]" /> 240 GSM Graduated Micro-weave</li>
          </ul>
        </div>

        <div className="p-8 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-4">
          <div className="flex items-center space-x-3 text-[#CCFF00]">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-base font-black uppercase tracking-wider font-mono">
              02 / LIFETIME SEAM INTEGRITY
            </h3>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every seam is reinforced with German coats gramax bonded thread and flatlock interlock stitching. If you bust a seam during heavy deadlifts, cleans, or bouldering, we repair or replace it free for life.
          </p>
          <ul className="text-xs text-zinc-300 space-y-1 font-mono pt-2">
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00]" /> Bar-tacked stress points</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00]" /> Zero chafing flatlock technology</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          href="/proathletic/shop"
          className="px-8 py-4 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-mono font-black tracking-widest uppercase transition-all shadow-pro-glow inline-block"
        >
          VIEW THE PERFORMANCE CATALOG
        </Link>
      </div>
    </div>
  );
}
