'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Zap, Check } from 'lucide-react';

export const ProProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const primaryImage = product.images[0]?.imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1]?.imageUrl || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedColor = product.colors[selectedColorIndex] || { name: 'Carbon Black', hex: '#050505' };
    const variant = product.variants.find(
      (v) => v.colorName === selectedColor.name && v.size === size
    );

    addToCart({
      productId: product.id,
      variantId: variant?.id,
      brandSlug: 'proathletic',
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

    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1500);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#0F0F10] border border-[#25272A] hover:border-[#CCFF00]/60 transition-all duration-300 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 font-mono">
        {product.isNewArrival && (
          <span className="bg-[#CCFF00] text-black text-[9px] font-black tracking-widest uppercase px-2 py-0.5 shadow-md">
            {t('nav.newDrop')}
          </span>
        )}
        {product.isBestseller && (
          <span className="bg-[#FF5500] text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 shadow-md flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-current" /> {t('nav.bestseller')}
          </span>
        )}
        {product.salePrice && (
          <span className="bg-white text-black text-[9px] font-black tracking-widest uppercase px-2 py-0.5">
            {t('nav.sale')}
          </span>
        )}
      </div>

      {/* Product Image with Technical Transition & Quick Add Bar */}
      <div className="relative aspect-[3/4] w-full bg-[#18191C] overflow-hidden">
        <Link href={`/proathletic/products/${product.slug}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* BOXRAW-Style Quick Size Bar on Hover */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-black/95 border-t border-[#25272A] p-2.5 transition-all duration-300 z-20 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#CCFF00] uppercase text-center mb-1.5">
            {t('product.rapidAdd')}
          </p>
          <div className="flex justify-center items-center gap-1.5 font-mono">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => handleQuickAdd(e, size)}
                className={`px-2 py-1 text-[10px] font-bold tracking-wider rounded-sm transition-all border ${
                  addedSize === size
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                    : 'bg-zinc-900 hover:bg-[#CCFF00] hover:text-black text-white border-[#25272A]'
                }`}
              >
                {addedSize === size ? <Check className="w-3 h-3 inline" /> : size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Color swatches */}
          <div className="flex items-center space-x-1.5 mb-2">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                className={`w-3.5 h-3.5 rounded-sm border transition-all ${
                  selectedColorIndex === idx ? 'border-[#CCFF00] scale-110 ring-1 ring-[#CCFF00]' : 'border-zinc-700'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-zinc-400 font-mono ml-1">
              {product.colors[selectedColorIndex]?.name}
            </span>
          </div>

          <Link href={`/proathletic/products/${product.slug}`} className="block">
            <h3 className="text-xs font-black text-white tracking-wider uppercase line-clamp-1 hover:text-[#CCFF00] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5 font-mono">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Performance Grade */}
        <div className="mt-3 pt-2 border-t border-[#25272A] flex items-baseline justify-between font-mono">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-[#CCFF00]">
              {formatPrice(product.salePrice || product.regularPrice)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-zinc-500 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
            GRADE-A
          </span>
        </div>
      </div>
    </div>
  );
};
