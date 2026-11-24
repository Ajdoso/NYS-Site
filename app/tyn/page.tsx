import React from 'react';
import Link from 'next/link';
import { getProducts, getCollections, getBanners, getCategories, getPartners } from '@/lib/data/store';
import { TynProductCard } from '@/components/tyn/TynProductCard';
import { KazakhDivider, KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';
import { HeroSection } from '@/components/shared/HeroSection';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { PartnersSection } from '@/components/shared/PartnersSection';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';

export default async function TynHomePage() {
  const [products, collections, banners, categories, partners] = await Promise.all([
    getProducts({ brandSlug: 'tyn' }),
    getCollections('tyn'),
    getBanners('tyn'),
    getCategories('tyn'),
    getPartners('tyn'),
  ]);

  const heroBanner = banners.find((b) => b.position === 'hero') || banners[0];
  const midBanner = banners.find((b) => b.position === 'promo_mid');
  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ================= 1. LARGE EDITORIAL HERO SECTION (VIDEO/IMAGE) ================= */}
      <HeroSection
        banner={heroBanner}
        brandSlug="tyn"
        defaultTitle="THE STEPPE HORIZON"
        defaultSubtitle="Kazakh national heritage re-engineered into heavyweight modern streetwear. 500 GSM loopback cotton with ancestral geometric embroidery."
        defaultCtaText="EXPLORE COLLECTION"
        defaultCtaUrl="/tyn/collections/steppe-horizon"
        secondaryCtaText="Shop All Streetwear"
        secondaryCtaUrl="/tyn/shop"
      />

      {/* ================= 2. BRAND PHILOSOPHY / CULTURAL IDENTITY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-[#EDE7DC] p-8 sm:p-12 border border-[#0D4352]/10 rounded-sm">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <KoshkarMuyiz className="w-6 h-6 text-[#0D4352]" color="#0D4352" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#C49A45] uppercase">
                Philosophy & Soul
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D4352] font-serif uppercase tracking-wide">
              Kazakh Heritage × Modern Streetwear
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
              We do not copy western fashion templates, nor do we create generic tourist souvenirs. TYN transforms the monumental geometric motifs of the Great Steppe into heavyweight garments designed for contemporary global streets. Every curve of the horn ornament carries millennia of nomad dignity.
            </p>
          </div>

          <div className="flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[#0D4352]/15 pt-6 lg:pt-0 lg:pl-8">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-[#C49A45] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4352]">500 GSM Heavyweight</h4>
                <p className="text-[11px] text-zinc-600">Pure combed long-staple organic cotton.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Compass className="w-5 h-5 text-[#0D4352] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4352]">Ancestral Petroglyphs</h4>
                <p className="text-[11px] text-zinc-600">Recreated in high-density gold & tone embroidery.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-[#C49A45] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4352]">Almaty Atelier Tailoring</h4>
                <p className="text-[11px] text-zinc-600">Preshrunk and engineered to outlast trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. BOXRAW-STYLE CATEGORY GRID (OPTION A / B / PLACEHOLDER) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#0D4352]/15 pb-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C49A45] uppercase font-serif">
              Curated Wardrobe
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D4352] font-serif uppercase tracking-wide mt-1">
              Shop By Category
            </h2>
          </div>
          <Link
            href="/tyn/shop"
            className="text-xs font-bold tracking-widest text-[#0D4352] hover:text-[#C49A45] uppercase inline-flex items-center gap-1"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} brandSlug="tyn" />
          ))}
        </div>
      </section>

      {/* ================= 3. FEATURED COLLECTIONS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#0D4352]/15 pb-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C49A45] uppercase font-serif">
              Seasonal Releases
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D4352] font-serif uppercase tracking-wide mt-1">
              Featured Collections
            </h2>
          </div>
          <Link
            href="/tyn/shop"
            className="text-xs font-bold tracking-widest text-[#0D4352] hover:text-[#C49A45] uppercase inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            Explore All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/tyn/collections/${col.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-[#EDE7DC] shadow-md flex flex-col justify-end p-6 border border-[#0D4352]/10"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${col.heroImageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/30 to-transparent" />

              {/* Badge */}
              {col.badge && (
                <span className="absolute top-4 left-4 bg-[#C49A45] text-[#0A1F26] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 z-10 shadow-sm">
                  {col.badge}
                </span>
              )}

              {/* Content */}
              <div className="relative z-10 text-[#F7F5F0] space-y-2">
                <p className="text-[10px] text-[#C49A45] tracking-[0.2em] font-serif uppercase">
                  {col.subtitle}
                </p>
                <h3 className="text-xl font-black font-serif uppercase tracking-wider group-hover:text-[#C49A45] transition-colors">
                  {col.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest uppercase text-white/90 group-hover:translate-x-1 transition-transform">
                  Shop Collection <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= 4. NEW ARRIVALS GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#0D4352]/15 pb-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C49A45] uppercase font-serif">
              Fresh From The Steppe
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D4352] font-serif uppercase tracking-wide mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/tyn/shop"
            className="text-xs font-bold tracking-widest text-[#0D4352] hover:text-[#C49A45] uppercase inline-flex items-center gap-1 mt-2 sm:mt-0"
          >
            View Full Catalog ({products.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <TynProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================= 5. EDITORIAL CAMPAIGN BANNER (VIDEO/IMAGE) ================= */}
      {midBanner && (
        <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-[#0A1F26]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1F26] via-[#0A1F26]/70 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start max-w-2xl text-[#F7F5F0] space-y-4">
            <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-[#C49A45] uppercase px-2 py-0.5 border border-[#C49A45]/40 bg-[#0D4352]/70">
              EDITORIAL CAMPAIGN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-wider leading-tight">
              {midBanner.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              {midBanner.subtitle}
            </p>
            <Link
              href={midBanner.ctaUrl || '/tyn/shop'}
              className="mt-4 px-8 py-3.5 bg-[#C49A45] hover:bg-[#E0C078] text-[#0A1F26] text-xs font-black tracking-widest uppercase transition-all shadow-lg inline-flex items-center gap-2"
            >
              {midBanner.ctaText || 'EXPLORE CAPSULE'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ================= 6. BESTSELLERS ================= */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#0D4352]/15 pb-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#C49A45] uppercase font-serif">
                Steppe Favorites
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0D4352] font-serif uppercase tracking-wide mt-1">
                Bestselling Streetwear
              </h2>
            </div>
            <Link
              href="/tyn/shop"
              className="text-xs font-bold tracking-widest text-[#0D4352] hover:text-[#C49A45] uppercase inline-flex items-center gap-1 mt-2 sm:mt-0"
            >
              See All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((product) => (
              <TynProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ================= 6.5 PARTNERS & AMBASSADORS SECTION ================= */}
      <PartnersSection partners={partners} brandSlug="tyn" />

      {/* ================= 7. STEPPE ARCHIVE / EDITORIAL LOOKBOOK ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-[#0D4352]/15 pb-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-[#C49A45] uppercase font-serif">
              Visual Narrative
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D4352] font-serif uppercase tracking-wide mt-1">
              Steppe Archive Lookbook
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 font-bold uppercase tracking-widest">
            #TYNCOMMUNITY
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
              caption: 'Almaty Atelier • Drop 01',
            },
            {
              src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
              caption: 'Charyn Canyon Session',
            },
            {
              src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
              caption: 'Ancestral Geometry 500 GSM',
            },
            {
              src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
              caption: 'Astana Boulevard Silhouette',
            },
          ].map((item, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-sm bg-[#EDE7DC]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0A1F26]/0 group-hover:bg-[#0A1F26]/60 transition-colors flex items-end p-4">
                <span className="text-[11px] font-serif text-[#F7F5F0] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 8. STEPPE CIRCLE VIP INVITATION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#0A1F26] text-[#F7F5F0] p-8 sm:p-14 border border-[#C49A45]/30 rounded-sm text-center space-y-6">
          <div className="flex justify-center">
            <KoshkarMuyiz className="w-8 h-8 text-[#C49A45]" color="#C49A45" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#C49A45] uppercase font-serif">
              Exclusive Steppe Guild
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif uppercase tracking-wider">
              Join The Steppe Circle
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Receive private preview access to limited numbered drops, ceremonial lookbooks, and invitation-only atelier events in Almaty and Astana.
            </p>
          </div>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2" onSubmit={undefined}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-[#0D4352]/60 border border-[#C49A45]/40 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-[#C49A45] font-serif"
            />
            <button
              type="button"
              className="px-6 py-3 bg-[#C49A45] hover:bg-[#E0C078] text-[#0A1F26] text-xs font-black tracking-widest uppercase transition-all whitespace-nowrap"
            >
              Request Access
            </button>
          </form>
        </div>
      </section>

      {/* Ornamental Section Divider */}
      <KazakhDivider label="Мұра мен Болашақ" />
    </div>
  );
}
