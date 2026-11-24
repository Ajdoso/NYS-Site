'use client';

import React from 'react';
import Link from 'next/link';
import { Category, BrandId } from '@/types/ecommerce';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';

interface CategoryCardProps {
  category: Category;
  brandSlug: BrandId;
  forceMode?: 'image' | 'text';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  brandSlug,
  forceMode,
}) => {
  const isTyn = brandSlug === 'tyn';
  const mode = forceMode || category.displayMode || (category.imageUrl ? 'image' : 'text');
  const href = `/${brandSlug}/shop?category=${category.slug}`;

  // ==========================================
  // OPTION B: TEXT-BASED CATEGORY
  // ==========================================
  if (mode === 'text' && !category.imageUrl) {
    if (isTyn) {
      return (
        <Link
          href={href}
          className="group relative aspect-[3/4] p-6 flex flex-col justify-between bg-[#F7F5F0] border border-[#0D4352]/20 hover:border-[#C49A45] rounded-sm transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
        >
          {/* Subtle Steppe Watermark */}
          <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-15 transition-opacity">
            <KoshkarMuyiz className="w-48 h-48 text-[#0D4352]" color="#0D4352" />
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-serif font-bold tracking-[0.25em] text-[#C49A45] uppercase">
              TYN Steppe Category
            </span>
            <span className="block text-[11px] text-zinc-500 font-serif">
              Drop 01 Edition
            </span>
          </div>

          <div className="space-y-2 z-10">
            <h3 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-wider text-[#0D4352] group-hover:text-[#C49A45] transition-colors leading-tight">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed font-light">
                {category.description}
              </p>
            )}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-serif font-bold tracking-widest text-[#0D4352] group-hover:translate-x-1.5 transition-transform uppercase pt-2">
              Explore Division <ArrowRight className="w-3.5 h-3.5 text-[#C49A45]" />
            </span>
          </div>
        </Link>
      );
    }

    // PROATHLETIC Text Mode
    return (
      <Link
        href={href}
        className="group relative aspect-[3/4] p-6 flex flex-col justify-between bg-[#0F0F10] border border-[#25272A] hover:border-[#CCFF00] rounded-sm transition-all duration-300 shadow-sm hover:shadow-pro-glow overflow-hidden font-mono"
      >
        <div className="space-y-1">
          <span className="text-[9px] font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
            DIVISION SPEC
          </span>
          <span className="block text-[10px] text-zinc-500">
            PRO-SERIES ZERO
          </span>
        </div>

        <div className="space-y-2 z-10">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors leading-tight font-sans">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-zinc-300 group-hover:text-white group-hover:translate-x-1.5 transition-transform uppercase pt-2">
            Access Gear <ArrowRight className="w-3.5 h-3.5 text-[#CCFF00]" />
          </span>
        </div>
      </Link>
    );
  }

  // ==========================================
  // PLACEHOLDER: "YOUR PHOTO CAN BE HERE"
  // (When mode is image but no image URL is assigned yet)
  // ==========================================
  if (!category.imageUrl) {
    if (isTyn) {
      return (
        <Link
          href={href}
          className="group relative aspect-[3/4] p-5 flex flex-col justify-between bg-[#EDE7DC]/70 border-2 border-dashed border-[#0D4352]/25 hover:border-[#C49A45] rounded-sm transition-all duration-300 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <span className="text-[9px] font-serif font-bold tracking-[0.2em] text-[#C49A45] uppercase">
              TYN ARCHIVE
            </span>
            <div className="w-8 h-8 rounded-full bg-[#0D4352]/10 flex items-center justify-center text-[#0D4352]">
              <ImageIcon className="w-4 h-4 text-[#C49A45]" />
            </div>
          </div>

          <div className="text-center py-4 space-y-1">
            <span className="text-[10px] font-serif tracking-[0.25em] text-zinc-500 uppercase block">
              Editorial Placement
            </span>
            <p className="text-xs font-black font-serif uppercase tracking-widest text-[#0D4352] bg-white/70 px-3 py-1.5 border border-[#0D4352]/15 shadow-sm inline-block">
              YOUR PHOTO CAN BE HERE
            </p>
            <span className="text-[9px] text-zinc-500 block pt-1">
              Upload via Admin Panel
            </span>
          </div>

          <div className="space-y-1 z-10 pt-2 border-t border-[#0D4352]/10">
            <h3 className="text-base sm:text-lg font-black font-serif uppercase tracking-wider text-[#0D4352] group-hover:text-[#C49A45] transition-colors">
              {category.name}
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-serif font-bold tracking-widest text-zinc-700 uppercase group-hover:translate-x-1 transition-transform">
              Shop Category <ArrowRight className="w-3 h-3 text-[#C49A45]" />
            </span>
          </div>
        </Link>
      );
    }

    // PROATHLETIC Placeholder
    return (
      <Link
        href={href}
        className="group relative aspect-[3/4] p-5 flex flex-col justify-between bg-[#0F0F10] border-2 border-dashed border-[#25272A] hover:border-[#CCFF00] rounded-sm transition-all duration-300 shadow-sm font-mono"
      >
        <div className="flex justify-between items-start">
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#CCFF00] uppercase">
            GEAR MEDIA SLOT
          </span>
          <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-[#25272A] flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-[#CCFF00]" />
          </div>
        </div>

        <div className="text-center py-4 space-y-1">
          <span className="text-[9px] tracking-widest text-zinc-500 uppercase block">
            Media Slot Pending
          </span>
          <p className="text-xs font-black uppercase tracking-widest text-black bg-[#CCFF00] px-3 py-1.5 shadow-pro-glow inline-block">
            YOUR PHOTO CAN BE HERE
          </p>
          <span className="text-[9px] text-zinc-400 block pt-1">
            Replace in Admin &gt; Categories
          </span>
        </div>

        <div className="space-y-1 z-10 pt-2 border-t border-[#25272A]">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white group-hover:text-[#CCFF00] transition-colors font-sans">
            {category.name}
          </h3>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-zinc-400 group-hover:text-white uppercase group-hover:translate-x-1 transition-transform">
            View Gear <ArrowRight className="w-3 h-3 text-[#CCFF00]" />
          </span>
        </div>
      </Link>
    );
  }

  // ==========================================
  // OPTION A: FULL-BLEED IMAGE CATEGORY
  // ==========================================
  return (
    <Link
      href={href}
      className={`group relative aspect-[3/4] overflow-hidden rounded-sm flex flex-col justify-end p-5 shadow-sm transition-all duration-300 ${
        isTyn
          ? 'bg-[#EDE7DC] border border-[#0D4352]/10 hover:border-[#C49A45]'
          : 'bg-[#0F0F10] border border-[#25272A] hover:border-[#CCFF00]'
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${category.imageUrl}')` }}
      />

      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 ${
          isTyn
            ? 'bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/30 to-transparent'
            : 'bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 space-y-1 text-white">
        <span
          className={`text-[9px] font-bold tracking-widest uppercase ${
            isTyn ? 'font-serif text-[#C49A45]' : 'font-mono text-[#CCFF00]'
          }`}
        >
          {isTyn ? 'TYN STREETWEAR' : 'PRO DIVISION'}
        </span>
        <h3
          className={`text-base sm:text-lg font-black uppercase tracking-wide transition-colors ${
            isTyn ? 'font-serif group-hover:text-[#C49A45]' : 'group-hover:text-[#CCFF00]'
          }`}
        >
          {category.name}
        </h3>
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-white/80 group-hover:translate-x-1 transition-transform ${
            isTyn ? 'font-serif' : 'font-mono'
          }`}
        >
          Shop <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </div>
    </Link>
  );
};
