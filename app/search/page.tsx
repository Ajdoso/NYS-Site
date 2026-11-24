import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/data/store';
import { TynProductCard } from '@/components/tyn/TynProductCard';
import { ProProductCard } from '@/components/proathletic/ProProductCard';
import { Search, ArrowLeft } from 'lucide-react';

interface Props {
  searchParams: {
    q?: string;
    brand?: 'all' | 'tyn' | 'proathletic';
  };
}

export default async function SearchResultsPage({ searchParams }: Props) {
  const query = searchParams.q || '';
  const brand = searchParams.brand || 'all';

  const products = await getProducts({
    brandSlug: brand !== 'all' ? brand : undefined,
    query: query,
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-6">
          <Link
            href="/"
            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest inline-flex items-center gap-1 mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Store
          </Link>
          <div className="flex items-center gap-3">
            <Search className="w-7 h-7 text-zinc-800" />
            <h1 className="text-3xl font-black uppercase tracking-wider">
              {query ? `Search: "${query}"` : 'Search Entire Catalog'}
            </h1>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Found <strong className="text-zinc-900">{products.length}</strong> matching styles across TYN and PROATHLETIC.
          </p>
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase">
          <Link
            href={`/search?q=${encodeURIComponent(query)}&brand=all`}
            className={`px-4 py-2 rounded-sm transition-colors ${
              brand === 'all' ? 'bg-zinc-900 text-white' : 'bg-white border text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            All Brands
          </Link>
          <Link
            href={`/search?q=${encodeURIComponent(query)}&brand=tyn`}
            className={`px-4 py-2 rounded-sm transition-colors ${
              brand === 'tyn' ? 'bg-[#0D4352] text-white' : 'bg-white border text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            TYN Streetwear
          </Link>
          <Link
            href={`/search?q=${encodeURIComponent(query)}&brand=proathletic`}
            className={`px-4 py-2 rounded-sm transition-colors ${
              brand === 'proathletic' ? 'bg-black text-[#CCFF00]' : 'bg-white border text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            PROATHLETIC Gear
          </Link>
        </div>

        {/* Results Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center bg-white border border-dashed border-zinc-300 rounded-sm space-y-4">
            <p className="text-sm font-bold uppercase tracking-wider text-zinc-700">
              No matching products found
            </p>
            <p className="text-xs text-zinc-500">
              Try searching for &quot;hoodie&quot;, &quot;jacket&quot;, &quot;compression&quot;, &quot;duffel&quot;, or &quot;cargo&quot;.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800"
            >
              Browse All Brands
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) =>
              p.brandSlug === 'tyn' ? (
                <TynProductCard key={p.id} product={p} />
              ) : (
                <ProProductCard key={p.id} product={p} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
