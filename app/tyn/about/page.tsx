import React from 'react';
import Link from 'next/link';
import { KazakhDivider, KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';
import { Sparkles, Compass, Shield } from 'lucide-react';

export default function TynAboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#EDE7DC] border border-[#0D4352]/20 rounded-full">
          <KoshkarMuyiz className="w-4 h-4 text-[#0D4352]" color="#0D4352" />
          <span className="text-[11px] font-serif font-bold tracking-[0.25em] text-[#C49A45] uppercase">
            Біздің Мұрамыз • Our Heritage
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-wider text-[#0D4352]">
          The Soul of the Modern Nomad
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
          TYN was born from a fundamental question: Why should Central Asian streetwear imitate western aesthetics when our own steppe civilization possesses centuries of monumental geometry?
        </p>
      </div>

      {/* Editorial Image & Mission */}
      <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden shadow-xl border border-[#0D4352]/10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F26] via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-serif tracking-widest uppercase flex items-center justify-between">
          <span>ALTAY TO CASPIAN</span>
          <span>100% ORGANIC HEAVYWEIGHT FLEECE</span>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-[#EDE7DC] border border-[#0D4352]/15 rounded-sm space-y-3">
          <Sparkles className="w-6 h-6 text-[#C49A45]" />
          <h3 className="text-sm font-black font-serif uppercase tracking-wider text-[#0D4352]">
            Authentic Ою-өрнек
          </h3>
          <p className="text-xs text-zinc-700 leading-relaxed">
            We don’t use decorative clip-art. Every ornament we sew—from the Koshkar-Muyiz to the Tumar talisman—is researched and placed with respect for nomadic cosmology and strength.
          </p>
        </div>

        <div className="p-6 bg-[#EDE7DC] border border-[#0D4352]/15 rounded-sm space-y-3">
          <Compass className="w-6 h-6 text-[#0D4352]" />
          <h3 className="text-sm font-black font-serif uppercase tracking-wider text-[#0D4352]">
            500 GSM Architecture
          </h3>
          <p className="text-xs text-zinc-700 leading-relaxed">
            Our hoodies and jackets are structured armor. The heavy loopback French terry drapes with razor-sharp modern lines that never sag, pill, or lose their sculpted silhouette.
          </p>
        </div>

        <div className="p-6 bg-[#EDE7DC] border border-[#0D4352]/15 rounded-sm space-y-3">
          <Shield className="w-6 h-6 text-[#C49A45]" />
          <h3 className="text-sm font-black font-serif uppercase tracking-wider text-[#0D4352]">
            Kazakh Craftsmanship
          </h3>
          <p className="text-xs text-zinc-700 leading-relaxed">
            Designed in Almaty and manufactured with sustainable long-staple cotton. We support local master embroiderers and Central Asian textile heritage.
          </p>
        </div>
      </div>

      <KazakhDivider label="Өткен мен Келешек" />

      <div className="text-center pt-4">
        <Link
          href="/tyn/shop"
          className="px-8 py-4 bg-[#0D4352] hover:bg-[#C49A45] hover:text-[#0D4352] text-[#F7F5F0] text-xs font-black tracking-widest uppercase transition-colors inline-block"
        >
          Explore TYN Streetwear
        </Link>
      </div>
    </div>
  );
}
