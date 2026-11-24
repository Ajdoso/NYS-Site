import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getProducts } from '@/lib/data/store';
import { TynProductCard } from '@/components/tyn/TynProductCard';
import { KazakhDivider, KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export default async function TynCollectionPage({ params }: Props) {
  const collection = await getCollectionBySlug('tyn', params.slug);
  if (!collection) {
    notFound();
  }

  const products = await getProducts({
    brandSlug: 'tyn',
    collectionSlug: params.slug,
  });

  return (
    <div className="space-y-12">
      {/* Cinematic Hero */}
      <div className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A1F26] text-[#F7F5F0]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${collection.heroImageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 py-16">
          <Link
            href="/tyn/shop"
            className="inline-flex items-center gap-1.5 text-xs text-[#C49A45] hover:underline uppercase tracking-widest font-serif mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Collections
          </Link>

          <div className="flex items-center justify-center space-x-2">
            <KoshkarMuyiz className="w-5 h-5 text-[#C49A45]" color="#C49A45" />
            <span className="text-xs font-serif font-bold tracking-[0.25em] text-[#C49A45] uppercase">
              {collection.subtitle || 'TYN Capsule Edition'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-serif uppercase tracking-wider leading-tight">
            {collection.title}
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#0D4352]/15 pb-4">
          <span className="text-xs font-bold text-[#0D4352] uppercase tracking-widest font-serif">
            {products.length} Garments in Collection
          </span>
          <span className="text-[11px] text-[#C49A45] font-serif uppercase tracking-wider">
            Almaty Atelier Edition
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center bg-white/50 border border-dashed border-[#0D4352]/20 rounded-sm">
            <p className="text-sm font-bold text-[#0D4352] font-serif uppercase">
              More garments arriving soon in this collection
            </p>
            <Link
              href="/tyn/shop"
              className="mt-3 inline-block text-xs text-[#C49A45] underline font-bold"
            >
              Browse other TYN streetwear
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <TynProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <KazakhDivider label="Шексіз Даланың Екпіні" />
    </div>
  );
}
