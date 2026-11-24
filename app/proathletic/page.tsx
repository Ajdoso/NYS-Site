import React from 'react';
import Link from 'next/link';
import { getProducts, getCollections, getBanners } from '@/lib/data/store';
import { ProProductCard } from '@/components/proathletic/ProProductCard';
import { ArrowRight, Zap, ShieldCheck, Flame, Gauge } from 'lucide-react';

export default async function ProHomePage() {
  const [products, collections, banners] = await Promise.all([
    getProducts({ brandSlug: 'proathletic' }),
    getCollections('proathletic'),
    getBanners('proathletic'),
  ]);

  const heroBanner = banners.find((b) => b.position === 'hero') || banners[0];
  const midBanner = banners.find((b) => b.position === 'promo_mid');
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#050505] text-white">
      {/* ================= 1. HIGH-VOLTAGE ATHLETIC HERO ================= */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-100 hover:scale-105 opacity-50"
          style={{
            backgroundImage: `url('${heroBanner?.imageUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85'}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 border border-[#25272A] bg-[#0F0F10]/90 backdrop-blur-md rounded-full font-mono">
            <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
              PRO-SERIES ZERO • RECOVERY GRADE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase font-sans leading-none">
            {heroBanner?.title || 'ZERO DISTRACTION'}
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 font-light tracking-wide leading-relaxed">
            {heroBanner?.subtitle || 'Engineered for relentless training, extreme durability, and peak human performance. 4-way compression fabric that locks your musculature in place.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={heroBanner?.ctaUrl || '/proathletic/collections/pro-series-zero'}
              className="w-full sm:w-auto px-8 py-4 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-pro-glow inline-flex items-center justify-center gap-2"
            >
              {heroBanner?.ctaText || 'SHOP PRO-SERIES'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/proathletic/shop"
              className="w-full sm:w-auto px-8 py-4 border border-[#25272A] hover:border-[#CCFF00] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center justify-center"
            >
              View All Gear
            </Link>
          </div>
        </div>

        {/* Bottom Tech Indicators */}
        <div className="absolute bottom-6 inset-x-0 max-w-7xl mx-auto px-6 flex items-center justify-between text-[10px] tracking-widest text-zinc-400 font-mono uppercase">
          <span>ALMATY SPORTS LAB</span>
          <span className="hidden sm:inline text-[#CCFF00]">MILITARY-GRADE AERO TEXTILE</span>
          <span>GRADE-A RECOVERY</span>
        </div>
      </section>

      {/* ================= 2. TECHNICAL SPECIFICATIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-3">
            <Gauge className="w-6 h-6 text-[#CCFF00]" />
            <h3 className="text-sm font-black uppercase tracking-wider">Graduated Compression</h3>
            <p className="text-xs text-zinc-400">
              Targeted pressure vectors stabilize muscular oscillation and accelerate lactic clearance.
            </p>
          </div>

          <div className="p-6 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-3">
            <Zap className="w-6 h-6 text-[#CCFF00] fill-current" />
            <h3 className="text-sm font-black uppercase tracking-wider">Aero-Mesh Heat Dumps</h3>
            <p className="text-xs text-zinc-400">
              Laser-perforated spine and underarm zones eliminate moisture buildup during max output.
            </p>
          </div>

          <div className="p-6 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#CCFF00]" />
            <h3 className="text-sm font-black uppercase tracking-wider">Reinforced Flatlock Seams</h3>
            <p className="text-xs text-zinc-400">
              Zero chafing against skin. Tested to resist 800+ hours of bar friction and squat stretches.
            </p>
          </div>

          <div className="p-6 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-3">
            <Flame className="w-6 h-6 text-[#FF5500]" />
            <h3 className="text-sm font-black uppercase tracking-wider">Thermal Scuba Fleece</h3>
            <p className="text-xs text-zinc-400">
              Multi-layer aerodynamic insulation protects your core in sub-zero outdoor conditioning.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. PERFORMANCE DIVISIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#25272A] pb-4">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
              DIVISIONS
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide mt-1">
              Performance Capsules
            </h2>
          </div>
          <Link
            href="/proathletic/shop"
            className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] hover:underline uppercase inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            All Divisions <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/proathletic/collections/${col.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-[#0F0F10] border border-[#25272A] hover:border-[#CCFF00] transition-colors flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${col.heroImageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

              {/* Badge */}
              {col.badge && (
                <span className="absolute top-4 left-4 bg-[#CCFF00] text-black text-[9px] font-mono font-black tracking-widest uppercase px-2.5 py-1 z-10 shadow-md">
                  {col.badge}
                </span>
              )}

              {/* Content */}
              <div className="relative z-10 text-white space-y-2">
                <p className="text-[10px] text-[#CCFF00] font-mono tracking-widest uppercase">
                  {col.subtitle}
                </p>
                <h3 className="text-xl font-black uppercase tracking-wider group-hover:text-[#CCFF00] transition-colors">
                  {col.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all">
                  Inspect Gear <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= 4. NEW PERFORMANCE DROPS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#25272A] pb-4">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
              LATEST RELEASES
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide mt-1">
              New Performance Gear
            </h2>
          </div>
          <Link
            href="/proathletic/shop"
            className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] hover:underline uppercase inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            Catalog ({products.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= 5. HIGH-VOLTAGE CAMPAIGN BANNER ================= */}
      {midBanner && (
        <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#0A0A0A] border-y border-[#25272A]">
          <div
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40 hover:opacity-50 transition-opacity"
            style={{ backgroundImage: `url('${midBanner.imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start max-w-2xl text-white space-y-4">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-black bg-[#CCFF00] uppercase px-2 py-0.5">
              SPECIAL RELEASE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              {midBanner.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {midBanner.subtitle}
            </p>
            <Link
              href={midBanner.ctaUrl || '/proathletic/shop'}
              className="mt-4 px-8 py-3.5 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-black tracking-widest uppercase transition-all shadow-pro-glow inline-flex items-center gap-2"
            >
              {midBanner.ctaText || 'INSPECT COLLECTION'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ================= 6. TOP ATHLETE PICKS ================= */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#25272A] pb-4">
            <div>
              <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#FF5500] uppercase">
                ATHLETE VALIDATED
              </p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide mt-1">
                Top Athlete Picks
              </h2>
            </div>
            <Link
              href="/proathletic/shop"
              className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] hover:underline uppercase inline-flex items-center gap-1 mt-2 sm:mt-0"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product) => (
              <ProProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
