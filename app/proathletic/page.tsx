import React from 'react';
import Link from 'next/link';
import { getProducts, getCollections, getBanners, getCategories, getPartners } from '@/lib/data/store';
import { ProProductCard } from '@/components/proathletic/ProProductCard';
import { HeroSection } from '@/components/shared/HeroSection';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { PartnersSection } from '@/components/shared/PartnersSection';
import { ArrowRight, Zap, ShieldCheck, Flame, Gauge } from 'lucide-react';

export default async function ProHomePage() {
  const [products, collections, banners, categories, partners] = await Promise.all([
    getProducts({ brandSlug: 'proathletic' }),
    getCollections('proathletic'),
    getBanners('proathletic'),
    getCategories('proathletic'),
    getPartners('proathletic'),
  ]);

  const heroBanner = banners.find((b) => b.position === 'hero') || banners[0];
  const midBanner = banners.find((b) => b.position === 'promo_mid');
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <div className="space-y-16 sm:space-y-24 bg-[#050505] text-white">
      {/* ================= 1. HIGH-VOLTAGE ATHLETIC HERO (VIDEO/IMAGE) ================= */}
      <HeroSection
        banner={heroBanner}
        brandSlug="proathletic"
        defaultTitle="ZERO DISTRACTION"
        defaultSubtitle="High performance athletic apparel engineered for relentless training and maximum physical output. 4-way compression fabric that locks your musculature in place."
        defaultCtaText="SHOP PRO-SERIES"
        defaultCtaUrl="/proathletic/collections/pro-series-zero"
        secondaryCtaText="View All Gear"
        secondaryCtaUrl="/proathletic/shop"
      />

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

      {/* ================= 2.5 BOXRAW-STYLE CATEGORY GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#25272A] pb-4">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
              CATEGORIES
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide mt-1">
              Shop Gear By Division
            </h2>
          </div>
          <Link
            href="/proathletic/shop"
            className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] hover:underline uppercase inline-flex items-center gap-1"
          >
            All Gear <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} brandSlug="proathletic" />
          ))}
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

      {/* ================= 5. HIGH-VOLTAGE CAMPAIGN BANNER (VIDEO/IMAGE) ================= */}
      {midBanner && (
        <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#0A0A0A] border-y border-[#25272A]">
          {midBanner.videoUrl ? (
            <video
              src={midBanner.videoUrl}
              poster={midBanner.imageUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40 hover:opacity-50 transition-opacity"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40 hover:opacity-50 transition-opacity"
              style={{ backgroundImage: `url('${midBanner.imageUrl}')` }}
            />
          )}
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

      {/* ================= 6.5 PARTNERS & CHAMPIONS SECTION ================= */}
      <PartnersSection partners={partners} brandSlug="proathletic" />

      {/* ================= 7. PRO DIVISION IN ACTION LOOKBOOK ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#25272A] pb-4">
          <div>
            <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
              ATHLETE SESSIONS
            </p>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide mt-1">
              Pro Athletic In Action
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-widest">
            #PROATHLETICLAB
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              src: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
              caption: 'Olympic Weightlifting Unit • Almaty',
            },
            {
              src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
              caption: 'High-Altitude Conditioning Zone',
            },
            {
              src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
              caption: 'Graduated Compression Max Pull',
            },
            {
              src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
              caption: 'Sub-Zero Field Conditioning',
            },
          ].map((item, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-sm bg-[#0F0F10] border border-[#25272A]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/70 transition-colors flex items-end p-4">
                <span className="text-[11px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8. ATHLETE VIP ACCESS BLOCK ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative overflow-hidden bg-[#0F0F10] text-white p-8 sm:p-14 border border-[#25272A] rounded-sm text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-sm bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#CCFF00] fill-current" />
            </div>
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#CCFF00] uppercase">
              Athletes Dispatch Roster
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              Join The Pro Division
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Get immediate drop alerts for performance capsules, engineering wear-test invitations, and exclusive seasonal team releases.
            </p>
          </div>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2" onSubmit={undefined}>
            <input
              type="email"
              placeholder="ATHLETE@DOMAIN.COM"
              className="flex-1 px-4 py-3 bg-[#18191C] border border-[#25272A] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#CCFF00] font-mono uppercase"
            />
            <button
              type="button"
              className="px-6 py-3 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-mono font-black tracking-widest uppercase transition-all shadow-pro-glow whitespace-nowrap"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
