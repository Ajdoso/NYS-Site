'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';
import { SizeGuideModal } from '@/components/shared/SizeGuideModal';
import { TynProductCard } from './TynProductCard';
import { KazakhCornerOrnament, KazakhDivider, KoshkarMuyiz } from './KazakhOrnament';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const TynProductDetail: React.FC<{
  product: Product;
  relatedProducts: Product[];
}> = ({ product, relatedProducts }) => {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#0D4352' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');

  // Find active variant for stock validation
  const currentVariant = product.variants.find(
    (v) =>
      v.colorName.toLowerCase() === selectedColor.name.toLowerCase() &&
      v.size.toLowerCase() === selectedSize.toLowerCase()
  ) || product.variants[0];

  const currentStock = currentVariant ? currentVariant.stockQuantity : 10;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      variantId: currentVariant?.id,
      brandSlug: 'tyn',
      productName: product.name,
      productSlug: product.slug,
      color: selectedColor.name,
      colorCode: selectedColor.hex,
      size: selectedSize,
      price: product.salePrice || product.regularPrice,
      quantity,
      imageUrl: product.images[selectedImageIndex]?.imageUrl || product.images[0]?.imageUrl,
      maxStock: currentStock,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        brand="tyn"
      />

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-[11px] text-zinc-500 uppercase tracking-widest font-serif">
        <Link href="/tyn" className="hover:text-[#0D4352]">Home</Link>
        <span>/</span>
        <Link href="/tyn/shop" className="hover:text-[#0D4352]">Shop</Link>
        <span>/</span>
        <span className="text-[#0D4352] font-bold line-clamp-1">{product.name}</span>
      </div>

      {/* Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Gallery (Thumbnails + Main View) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[3/4] w-20 sm:w-full overflow-hidden rounded-sm border-2 transition-all ${
                  selectedImageIndex === idx
                    ? 'border-[#0D4352] ring-2 ring-[#C49A45]/50'
                    : 'border-transparent hover:border-zinc-300 opacity-70 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imageUrl}
                  alt={img.altText || product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Hero Image */}
          <div className="relative flex-1 aspect-[3/4] bg-[#EDE7DC] rounded-sm overflow-hidden border border-[#0D4352]/10 shadow-lg">
            <KazakhCornerOrnament position="top-left" className="absolute top-2 left-2 w-6 h-6 text-[#C49A45] opacity-75 z-10" />
            <KazakhCornerOrnament position="top-right" className="absolute top-2 right-2 w-6 h-6 text-[#C49A45] opacity-75 z-10" />
            <KazakhCornerOrnament position="bottom-left" className="absolute bottom-2 left-2 w-6 h-6 text-[#C49A45] opacity-75 z-10" />
            <KazakhCornerOrnament position="bottom-right" className="absolute bottom-2 right-2 w-6 h-6 text-[#C49A45] opacity-75 z-10" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[selectedImageIndex]?.imageUrl || product.images[0]?.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {product.salePrice && (
              <span className="absolute top-4 left-4 bg-red-800 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 shadow-md z-10">
                SPECIAL PRICE
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Buy Box & Storytelling */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <KoshkarMuyiz className="w-5 h-5 text-[#C49A45]" color="#C49A45" />
              <span className="text-[10px] font-serif font-bold tracking-[0.25em] text-[#C49A45] uppercase">
                {product.categoryName || 'Almaty Atelier Edition'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif uppercase tracking-wider text-[#0D4352] mt-2">
              {product.name}
            </h1>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#0D4352]/15">
            <span className="text-2xl font-black text-[#0D4352]">
              {formatPrice(product.salePrice || product.regularPrice)}
            </span>
            {product.salePrice && (
              <span className="text-base text-zinc-400 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
            <span className="ml-auto text-xs font-serif text-[#C49A45] font-semibold">
              Tax included • Free Shipping &gt; 35 000 ₸
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0D4352] uppercase tracking-wider">Color:</span>
              <span className="text-zinc-600">{selectedColor.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor.name === color.name
                      ? 'border-[#0D4352] ring-2 ring-[#C49A45]'
                      : 'border-zinc-300 hover:border-zinc-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <Check className={`w-3.5 h-3.5 ${color.hex === '#F7F5F0' || color.hex === '#EDE7DC' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0D4352] uppercase tracking-wider">Size:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[#C49A45] hover:underline inline-flex items-center gap-1 font-serif font-bold uppercase"
              >
                <Ruler className="w-3.5 h-3.5" /> Sizing Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 text-xs font-bold uppercase tracking-wider border rounded-sm transition-all ${
                    selectedSize === size
                      ? 'bg-[#0D4352] text-[#F7F5F0] border-[#0D4352] shadow-sm'
                      : 'bg-white/60 hover:bg-white text-zinc-800 border-[#0D4352]/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status Indicator */}
          <div className="text-xs flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isOutOfStock ? 'bg-red-500' : currentStock <= 5 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'
              }`}
            />
            <span className="font-medium text-zinc-700">
              {isOutOfStock
                ? 'Out of stock in selected size/color'
                : currentStock <= 5
                ? `Only ${currentStock} left in stock — order soon!`
                : `In Stock (${currentStock} available in Almaty warehouse)`}
            </span>
          </div>

          {/* Quantity & Add to Bag CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-4">
              <div className="flex items-center border border-[#0D4352]/30 bg-white rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-zinc-600 hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#0D4352]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="p-3 text-zinc-600 hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 bg-[#0D4352] hover:bg-[#C49A45] hover:text-[#0D4352] text-[#F7F5F0] text-xs font-black tracking-[0.2em] uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO BAG'}
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#0D4352]/10 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-serif">
            <div className="p-2 bg-white/40 border border-[#0D4352]/10 rounded-sm">
              <Truck className="w-4 h-4 mx-auto mb-1 text-[#C49A45]" />
              <span>Kazakhstan Express</span>
            </div>
            <div className="p-2 bg-white/40 border border-[#0D4352]/10 rounded-sm">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-[#0D4352]" />
              <span>500 GSM Quality</span>
            </div>
            <div className="p-2 bg-white/40 border border-[#0D4352]/10 rounded-sm">
              <RotateCcw className="w-4 h-4 mx-auto mb-1 text-[#C49A45]" />
              <span>14-Day Exchanges</span>
            </div>
          </div>

          {/* Expandable Tabs */}
          <div className="space-y-2 pt-4">
            <div className="border border-[#0D4352]/15 bg-white/60 rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'details' ? ('' as any) : 'details')}
                className="w-full p-3 text-left text-xs font-bold uppercase tracking-wider text-[#0D4352] flex items-center justify-between"
              >
                <span>Garment Architecture & Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'details' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'details' && (
                <div className="p-3 pt-0 text-xs text-zinc-600 space-y-2 border-t border-[#0D4352]/10">
                  <p>{product.description}</p>
                  {product.features && (
                    <ul className="list-disc pl-4 space-y-1 text-[11px] pt-1">
                      {product.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="border border-[#0D4352]/15 bg-white/60 rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'materials' ? ('' as any) : 'materials')}
                className="w-full p-3 text-left text-xs font-bold uppercase tracking-wider text-[#0D4352] flex items-center justify-between"
              >
                <span>Materials & Care Instructions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'materials' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'materials' && (
                <div className="p-3 pt-0 text-xs text-zinc-600 space-y-1 border-t border-[#0D4352]/10">
                  <p><strong>Composition:</strong> {product.materials}</p>
                  <p><strong>Care:</strong> {product.careInstructions}</p>
                </div>
              )}
            </div>

            <div className="border border-[#0D4352]/15 bg-white/60 rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'shipping' ? ('' as any) : 'shipping')}
                className="w-full p-3 text-left text-xs font-bold uppercase tracking-wider text-[#0D4352] flex items-center justify-between"
              >
                <span>Delivery & Kazakhstan Pick-Up</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeTab === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'shipping' && (
                <div className="p-3 pt-0 text-xs text-zinc-600 space-y-1 border-t border-[#0D4352]/10">
                  <p>• <strong>Almaty & Astana:</strong> Next-day courier delivery available.</p>
                  <p>• <strong>Regional Kazakhstan:</strong> 2-4 business days via KazPost / CDEK.</p>
                  <p>• <strong>Showroom Pick-up:</strong> Dostyk Ave 180, Almaty (10:00 - 21:00 daily).</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#0D4352]/15 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black font-serif uppercase tracking-wider text-[#0D4352]">
              Complete The Steppe Aesthetic
            </h3>
            <Link
              href="/tyn/shop"
              className="text-xs font-bold uppercase tracking-widest text-[#0D4352] hover:text-[#C49A45]"
            >
              Shop All Streetwear →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <TynProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <KazakhDivider label="Ұлы Дала Өрнектері" />
    </div>
  );
};
