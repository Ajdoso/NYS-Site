import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getProducts } from '@/lib/data/store';
import { ProProductCard } from '@/components/proathletic/ProProductCard';
import { ArrowLeft, Zap } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProCollectionPage({ params }: Props) {
  const collection = await getCollectionBySlug('proathletic', params.slug);
  if (!collection) {
    notFound();
  }

  const products = await getProducts({
    brandSlug: 'proathletic',
    collectionSlug: params.slug,
  });

  return (
    <div className="space-y-12 bg-[#050505] text-white">
      {/* Cinematic Hero */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] border-b border-[#25272A]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${collection.heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 py-16">
          <Link
            href="/proathletic/shop"
            className="inline-flex items-center gap-1.5 text-xs text-[#CCFF00] hover:underline uppercase tracking-widest font-mono mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Divisions
          </Link>

          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
              {collection.subtitle || 'PROATHLETIC DIVISION'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight">
            {collection.title}
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#25272A] pb-4 font-mono">
          <span className="text-xs font-bold text-white uppercase tracking-widest">
            {products.length} SPECIFICATIONS ACTIVE
          </span>
          <span className="text-[11px] text-[#CCFF00] uppercase tracking-wider">
            PERFORMANCE VERIFIED
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center bg-[#0F0F10] border border-dashed border-[#25272A] rounded-sm">
            <p className="text-sm font-bold text-white uppercase font-mono">
              Next batch currently undergoing laboratory testing
            </p>
            <Link
              href="/proathletic/shop"
              className="mt-3 inline-block text-xs text-[#CCFF00] underline font-bold"
            >
              Browse other performance gear
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
