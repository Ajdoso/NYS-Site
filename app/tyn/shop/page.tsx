import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/data/store';
import { TynProductCard } from '@/components/tyn/TynProductCard';
import { KazakhDivider } from '@/components/tyn/KazakhOrnament';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
  searchParams: {
    category?: string;
    sort?: string;
    q?: string;
  };
}

export default async function TynShopPage({ searchParams }: Props) {
  const categories = await getCategories('tyn');
  const products = await getProducts({
    brandSlug: 'tyn',
    categorySlug: searchParams.category,
    query: searchParams.q,
    sortBy: searchParams.sort as any,
  });

  const activeCategory = categories.find((c) => c.slug === searchParams.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-[#0D4352]/15 pb-6">
        <div className="flex items-center space-x-2 text-[11px] text-zinc-500 uppercase tracking-widest font-serif">
          <Link href="/tyn" className="hover:text-[#0D4352]">Home</Link>
          <span>/</span>
          <span className="text-[#0D4352] font-bold">Shop All</span>
          {activeCategory && (
            <>
              <span>/</span>
              <span className="text-[#C49A45] font-bold">{activeCategory.name}</span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-wider text-[#0D4352] mt-3">
          {activeCategory ? activeCategory.name : 'TYN Streetwear Collection'}
        </h1>
        <p className="text-xs text-zinc-600 mt-1 max-w-2xl">
          {activeCategory?.description || 'Authentic Kazakh ornamentation, 500 GSM loopback cotton, and drop-shoulder silhouettes designed for contemporary nomads.'}
        </p>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 bg-[#EDE7DC]/70 border border-[#0D4352]/10 rounded-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold uppercase tracking-wider">
          <Link
            href="/tyn/shop"
            className={`px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
              !searchParams.category
                ? 'bg-[#0D4352] text-[#F7F5F0]'
                : 'text-zinc-700 hover:text-[#0D4352] hover:bg-white/60'
            }`}
          >
            All Items
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/tyn/shop?category=${cat.slug}${searchParams.sort ? `&sort=${searchParams.sort}` : ''}`}
              className={`px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap ${
                searchParams.category === cat.slug
                  ? 'bg-[#0D4352] text-[#F7F5F0]'
                  : 'text-zinc-700 hover:text-[#0D4352] hover:bg-white/60'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Count and Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
          <span className="text-zinc-500 font-serif">
            Showing <strong className="text-[#0D4352]">{products.length}</strong> styles
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
              className="bg-transparent border border-[#0D4352]/20 px-2 py-1 text-xs font-medium text-zinc-800 outline-none rounded-sm cursor-pointer"
            >
              <option value="newest">Sort: Newest Drops</option>
              <option value="bestselling">Sort: Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </form>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {products.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white/50 border border-dashed border-[#0D4352]/20 rounded-sm">
          <p className="text-sm font-bold tracking-widest text-[#0D4352] uppercase font-serif">
            No products found matching your filter
          </p>
          <p className="text-xs text-zinc-500">
            Try resetting your search query or category filters.
          </p>
          <Link
            href="/tyn/shop"
            className="inline-block px-6 py-2.5 bg-[#0D4352] text-[#F7F5F0] text-xs font-bold uppercase tracking-widest hover:bg-[#C49A45] hover:text-[#0D4352] transition-colors"
          >
            Clear All Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <TynProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <KazakhDivider label="Қазақстанның Заманауи Сәні" />
    </div>
  );
}
