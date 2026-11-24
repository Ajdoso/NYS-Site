import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/data/store';
import { ProProductCard } from '@/components/proathletic/ProProductCard';
import { SlidersHorizontal, Zap } from 'lucide-react';

interface Props {
  searchParams: {
    category?: string;
    sort?: string;
    q?: string;
  };
}

export default async function ProShopPage({ searchParams }: Props) {
  const categories = await getCategories('proathletic');
  const products = await getProducts({
    brandSlug: 'proathletic',
    categorySlug: searchParams.category,
    query: searchParams.q,
    sortBy: searchParams.sort as any,
  });

  const activeCategory = categories.find((c) => c.slug === searchParams.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#050505] text-white">
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-[#25272A] pb-6">
        <div className="flex items-center space-x-2 text-[11px] text-zinc-400 font-mono uppercase tracking-widest">
          <Link href="/proathletic" className="hover:text-[#CCFF00]">LAB HQ</Link>
          <span>/</span>
          <span className="text-white font-bold">ALL GEAR</span>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-[#CCFF00] font-bold">{activeCategory.name}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-3">
          {activeCategory ? activeCategory.name : 'PROATHLETIC GEAR DIVISION'}
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
          {activeCategory?.description || 'High-velocity compression, thermal scuba fleece, and tactical training gear designed for athletes seeking peak human performance.'}
        </p>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 bg-[#0F0F10] border border-[#25272A] rounded-sm font-mono">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold uppercase tracking-wider">
          <Link
            href="/proathletic/shop"
            className={`px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
              !searchParams.category
                ? 'bg-[#CCFF00] text-black font-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            ALL SPECIFICATIONS
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/proathletic/shop?category=${cat.slug}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
              className={`px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
                searchParams.category === cat.slug
                  ? 'bg-[#CCFF00] text-black font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Count and Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
          <span className="text-zinc-400 font-mono">
            OPERATIONAL STYLES: <strong className="text-[#CCFF00]">{products.length}</strong>
          </span>

          <form method="GET" className="flex items-center gap-2">
            {searchParams.category && (
              <input type="hidden" name="category" value={searchParams.category} />
            )}
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
            <select
              name="sort"
              defaultValue={searchParams.sort || 'newest'}
              onChange={(e) => e.target.form?.submit()}
              className="bg-[#17181A] border border-[#25272A] px-2 py-1 text-xs font-mono text-white outline-none rounded-sm cursor-pointer"
            >
              <option value="newest">SORT: LATEST DROP</option>
              <option value="bestselling">SORT: TOP ATHLETE</option>
              <option value="price-asc">PRICE: ASCENDING</option>
              <option value="price-desc">PRICE: DESCENDING</option>
            </select>
          </form>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {products.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-[#0F0F10] border border-dashed border-[#25272A] rounded-sm">
          <p className="text-sm font-black tracking-widest text-[#CCFF00] uppercase font-mono">
            NO ATHLETIC SPECIFICATIONS LOCATED
          </p>
          <p className="text-xs text-zinc-500">
            Reset search parameters to inspect active inventory.
          </p>
          <Link
            href="/proathletic/shop"
            className="inline-block px-6 py-2.5 bg-[#CCFF00] text-black text-xs font-black uppercase tracking-widest hover:bg-[#B8E600] transition-colors"
          >
            RESET ALL FILTERS
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
  );
}
