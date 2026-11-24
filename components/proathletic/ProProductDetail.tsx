'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';
import { SizeGuideModal } from '@/components/shared/SizeGuideModal';
import { ProProductCard } from './ProProductCard';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Zap,
  Flame,
  Activity,
} from 'lucide-react';

export const ProProductDetail: React.FC<{
  product: Product;
  relatedProducts: Product[];
}> = ({ product, relatedProducts }) => {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Carbon Black', hex: '#050505' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'fabric' | 'dispatch'>('specs');

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
      brandSlug: 'proathletic',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 bg-[#050505] text-white">
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        brand="proathletic"
      />

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-[11px] text-zinc-400 uppercase tracking-widest font-mono">
        <Link href="/proathletic" className="hover:text-[#CCFF00]">LAB HQ</Link>
        <span>/</span>
        <Link href="/proathletic/shop" className="hover:text-[#CCFF00]">GEAR</Link>
        <span>/</span>
        <span className="text-white font-bold line-clamp-1">{product.name}</span>
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
                    ? 'border-[#CCFF00] shadow-pro-glow'
                    : 'border-[#25272A] opacity-60 hover:opacity-100'
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
          <div className="relative flex-1 aspect-[3/4] bg-[#121316] rounded-sm overflow-hidden border border-[#25272A]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[selectedImageIndex]?.imageUrl || product.images[0]?.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {product.salePrice && (
              <span className="absolute top-4 left-4 bg-[#FF5500] text-white text-[10px] font-mono font-black tracking-widest uppercase px-3 py-1 shadow-md z-10">
                PROMO RATE
              </span>
            )}
          </div>
        </div>

        {/* Right: Buy Box & Technical Specs */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
                {product.categoryName || 'Performance Division'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">
              {product.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#25272A] font-mono">
            <span className="text-2xl font-black text-[#CCFF00]">
              {formatPrice(product.salePrice || product.regularPrice)}
            </span>
            {product.salePrice && (
              <span className="text-base text-zinc-500 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
            <span className="ml-auto text-xs text-zinc-400 font-bold">
              FREE SHIPPING &gt; 35 000 ₸
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white uppercase tracking-wider">COLORWAY:</span>
              <span className="text-zinc-400">{selectedColor.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-sm border-2 transition-all flex items-center justify-center ${
                    selectedColor.name === color.name
                      ? 'border-[#CCFF00] ring-2 ring-[#CCFF00]/50'
                      : 'border-zinc-700 hover:border-zinc-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <Check className={`w-3.5 h-3.5 ${color.hex === '#CCFF00' ? 'text-black' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white uppercase tracking-wider">ATHLETE SIZING:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[#CCFF00] hover:underline inline-flex items-center gap-1 font-mono font-bold uppercase"
              >
                <Ruler className="w-3.5 h-3.5" /> FIT SPEC SHEET
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 text-xs font-mono font-bold uppercase tracking-wider border rounded-sm transition-all ${
                    selectedSize === size
                      ? 'bg-[#CCFF00] text-black border-[#CCFF00] shadow-pro-glow'
                      : 'bg-[#121316] hover:bg-[#18191C] text-white border-[#25272A]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status Indicator */}
          <div className="text-xs font-mono flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isOutOfStock ? 'bg-red-500' : currentStock <= 5 ? 'bg-orange-500 animate-pulse' : 'bg-[#CCFF00]'
              }`}
            />
            <span className="font-medium text-zinc-300">
              {isOutOfStock
                ? 'Out of stock in selected size/color'
                : currentStock <= 5
                ? `CRITICAL STOCK: Only ${currentStock} units left!`
                : `IN STOCK (${currentStock} units ready for immediate dispatch)`}
            </span>
          </div>

          {/* Quantity & Rapid Add CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-4">
              <div className="flex items-center border border-[#25272A] bg-[#121316] rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-mono font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="p-3 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-mono font-black tracking-[0.2em] uppercase transition-all duration-200 shadow-pro-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock ? 'OUT OF STOCK' : 'RAPID ADD TO BAG'}
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#25272A] text-center text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
            <div className="p-2 bg-[#0F0F10] border border-[#25272A] rounded-sm">
              <Truck className="w-4 h-4 mx-auto mb-1 text-[#CCFF00]" />
              <span>24h Dispatch</span>
            </div>
            <div className="p-2 bg-[#0F0F10] border border-[#25272A] rounded-sm">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-white" />
              <span>Lifetime Seams</span>
            </div>
            <div className="p-2 bg-[#0F0F10] border border-[#25272A] rounded-sm">
              <Activity className="w-4 h-4 mx-auto mb-1 text-[#FF5500]" />
              <span>Pro Validated</span>
            </div>
          </div>

          {/* Technical Specs Expandable Accordions */}
          <div className="space-y-2 pt-4">
            <div className="border border-[#25272A] bg-[#0F0F10] rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'specs' ? ('' as any) : 'specs')}
                className="w-full p-3 text-left text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center justify-between"
              >
                <span>Engineering & Specifications</span>
                <ChevronDown className={`w-4 h-4 text-[#CCFF00] transition-transform ${activeTab === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'specs' && (
                <div className="p-3 pt-0 text-xs text-zinc-400 space-y-2 border-t border-[#25272A]">
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

            <div className="border border-[#25272A] bg-[#0F0F10] rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'fabric' ? ('' as any) : 'fabric')}
                className="w-full p-3 text-left text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center justify-between"
              >
                <span>Fabric Lab & Maintenance</span>
                <ChevronDown className={`w-4 h-4 text-[#CCFF00] transition-transform ${activeTab === 'fabric' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'fabric' && (
                <div className="p-3 pt-0 text-xs text-zinc-400 space-y-1 border-t border-[#25272A] font-mono">
                  <p><strong>Composition:</strong> {product.materials}</p>
                  <p><strong>Care:</strong> {product.careInstructions}</p>
                </div>
              )}
            </div>

            <div className="border border-[#25272A] bg-[#0F0F10] rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === 'dispatch' ? ('' as any) : 'dispatch')}
                className="w-full p-3 text-left text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center justify-between"
              >
                <span>Courier Logistics</span>
                <ChevronDown className={`w-4 h-4 text-[#CCFF00] transition-transform ${activeTab === 'dispatch' ? 'rotate-180' : ''}`} />
              </button>
              {activeTab === 'dispatch' && (
                <div className="p-3 pt-0 text-xs text-zinc-400 space-y-1 border-t border-[#25272A] font-mono">
                  <p>• <strong>Almaty Metro:</strong> Same-day dispatch on orders placed before 14:00.</p>
                  <p>• <strong>Astana & Regional:</strong> 1-3 business days express door-to-door courier.</p>
                  <p>• <strong>Returns:</strong> 30 days hassle-free athlete exchanges.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Performance Gear */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#25272A] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight text-white">
              RECOMMENDED ATHLETE TRAINING KITS
            </h3>
            <Link
              href="/proathletic/shop"
              className="text-xs font-mono font-bold uppercase tracking-widest text-[#CCFF00] hover:underline"
            >
              ALL GEAR →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
