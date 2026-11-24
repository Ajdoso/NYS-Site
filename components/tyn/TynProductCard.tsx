'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';
import { KazakhCornerOrnament } from './KazakhOrnament';
import { Plus } from 'lucide-react';

export const TynProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);

  const primaryImage = product.images[0]?.imageUrl || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1]?.imageUrl || primaryImage;

  const handleQuickAdd = (size: string) => {
    const selectedColor = product.colors[selectedColorIndex] || { name: 'Standard', hex: '#0D4352' };
    const variant = product.variants.find(
      (v) => v.colorName === selectedColor.name && v.size === size
    );

    addToCart({
      productId: product.id,
      variantId: variant?.id,
      brandSlug: 'tyn',
      productName: product.name,
      productSlug: product.slug,
      color: selectedColor.name,
      colorCode: selectedColor.hex,
      size,
      price: product.salePrice || product.regularPrice,
      quantity: 1,
      imageUrl: primaryImage,
      maxStock: variant?.stockQuantity || 10,
    });
    setQuickSizeOpen(false);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#F7F5F0] border border-[#0D4352]/10 hover:border-[#0D4352]/30 transition-all duration-300 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeOpen(false);
      }}
    >
      {/* Decorative Kazakh corner accents */}
      <KazakhCornerOrnament position="top-left" className="absolute top-1 left-1 w-4 h-4 text-[#C49A45] opacity-50 z-10" />
      <KazakhCornerOrnament position="top-right" className="absolute top-1 right-1 w-4 h-4 text-[#C49A45] opacity-50 z-10" />

      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        {product.isNewArrival && (
          <span className="bg-[#0D4352] text-[#F7F5F0] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-sm">
            NEW DROP
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-[#C49A45] text-[#0D4352] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-sm">
            BESTSELLER
          </span>
        )}
        {product.salePrice && (
          <span className="bg-red-800 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-sm">
            SALE
          </span>
        )}
      </div>

      {/* Product Image with Hover Transition */}
      <div className="relative aspect-[3/4] w-full bg-[#EDE7DC] overflow-hidden">
        <Link href={`/tyn/products/${product.slug}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Add Overlay on Image */}
        <div className="absolute bottom-3 inset-x-3 z-20">
          {quickSizeOpen ? (
            <div className="bg-[#F7F5F0] p-2 border border-[#0D4352]/20 shadow-xl rounded-sm">
              <p className="text-[9px] font-bold tracking-widest text-[#0D4352] uppercase mb-1.5 text-center">
                Select Size
              </p>
              <div className="flex flex-wrap gap-1 justify-center">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="px-2 py-1 text-[10px] font-bold border border-[#0D4352]/30 hover:bg-[#0D4352] hover:text-[#F7F5F0] transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setQuickSizeOpen(true)}
              className="w-full py-2 bg-[#0D4352]/90 hover:bg-[#0D4352] text-[#F7F5F0] text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-1 shadow-md backdrop-blur-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Quick Add
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Color options */}
          <div className="flex items-center space-x-1.5 mb-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx ? 'border-[#0D4352] scale-110 ring-1 ring-[#0D4352]' : 'border-zinc-300'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-zinc-500 ml-1">
              {product.colors[selectedColorIndex]?.name}
            </span>
          </div>

          <Link href={`/tyn/products/${product.slug}`} className="block">
            <h3 className="text-xs font-bold text-[#0D4352] tracking-wider uppercase line-clamp-1 hover:text-[#C49A45] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2 border-t border-[#0D4352]/10 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#0D4352]">
              {formatPrice(product.salePrice || product.regularPrice)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-zinc-400 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-serif tracking-widest text-[#C49A45]">
            KZ-EDITION
          </span>
        </div>
      </div>
    </div>
  );
};
