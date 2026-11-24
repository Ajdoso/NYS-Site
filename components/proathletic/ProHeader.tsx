'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { BrandSwitcher } from '../shared/BrandSwitcher';
import { Search, ShoppingBag, Menu, X, ChevronDown, Zap, User } from 'lucide-react';

export const ProHeader: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#25272A] transition-colors text-white">
      {/* Announcement Bar */}
      <div className="bg-[#0F0F10] border-b border-[#25272A] py-2 px-4 text-center text-[11px] font-bold tracking-widest uppercase flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2 text-[#CCFF00] text-[10px]">
          <Zap className="w-3 h-3 fill-current" />
          <span>PRO ATHLETE SPECIFICATION</span>
        </div>
        <div className="mx-auto flex items-center gap-2">
          <span className="text-zinc-200">EXPRESS DISPATCH WITHIN 24H • ORDERS OVER 35 000 ₸ SHIP FREE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <BrandSwitcher activeBrand="proathletic" />
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#CCFF00] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-black tracking-widest uppercase text-zinc-300">
          <div className="relative group py-6">
            <Link
              href="/proathletic/shop"
              className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"
            >
              Gear & Apparel <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </Link>
            {/* Mega Dropdown */}
            <div className="absolute top-full left-0 w-64 bg-[#0F0F10] border border-[#25272A] shadow-2xl p-5 hidden group-hover:block transition-all z-50 rounded-sm">
              <p className="text-[10px] text-[#CCFF00] tracking-[0.2em] font-mono uppercase mb-3 pb-1 border-b border-[#25272A]">
                Categories
              </p>
              <div className="space-y-2.5">
                <Link href="/proathletic/shop?category=compression" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                  Compression & Base Layer
                </Link>
                <Link href="/proathletic/shop?category=performance-hoodies" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                  Performance Hoodies
                </Link>
                <Link href="/proathletic/shop?category=training-tops" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                  Training Tops & Tees
                </Link>
                <Link href="/proathletic/shop?category=shorts-tights" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                  Shorts & Tights
                </Link>
                <Link href="/proathletic/shop?category=gear" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                  Gym Gear & Bags
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group py-6">
            <Link
              href="/proathletic/collections/pro-series-zero"
              className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"
            >
              Collections <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-72 bg-[#0F0F10] border border-[#25272A] shadow-2xl p-5 hidden group-hover:block transition-all z-50 rounded-sm">
              <p className="text-[10px] text-[#CCFF00] tracking-[0.2em] font-mono uppercase mb-3 pb-1 border-b border-[#25272A]">
                Performance Divisions
              </p>
              <div className="space-y-3">
                <Link href="/proathletic/collections/pro-series-zero" className="block group/item">
                  <p className="text-white group-hover/item:text-[#CCFF00] font-bold">Pro-Series Zero</p>
                  <p className="text-[10px] text-zinc-400 normal-case tracking-normal">Seamless compression engineering</p>
                </Link>
                <Link href="/proathletic/collections/neon-impact" className="block group/item">
                  <p className="text-white group-hover/item:text-[#CCFF00] font-bold">Neon Impact</p>
                  <p className="text-[10px] text-zinc-400 normal-case tracking-normal">High-voltage athletic sprintwear</p>
                </Link>
                <Link href="/proathletic/collections/iron-lab" className="block group/item">
                  <p className="text-white group-hover/item:text-[#CCFF00] font-bold">Iron Lab Division</p>
                  <p className="text-[10px] text-zinc-400 normal-case tracking-normal">Heavy strength & powerlifting capsule</p>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/proathletic/about" className="hover:text-[#CCFF00] transition-colors">
            Fabric Tech
          </Link>

          <Link href="/proathletic/contact" className="hover:text-[#CCFF00] transition-colors">
            HQ & Support
          </Link>
        </nav>

        {/* Center Brand Identity */}
        <div className="flex flex-col items-center">
          <Link href="/proathletic" className="group flex items-center space-x-2">
            <div className="w-3 h-6 bg-[#CCFF00] skew-x-[-20deg] group-hover:bg-white transition-colors" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tracking-[0.18em] text-white uppercase font-sans leading-none">
                PRO<span className="text-[#CCFF00]">ATHLETIC</span>
              </span>
              <span className="text-[8px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase mt-0.5">
                PERFORMANCE LAB
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-5">
          <div className="sm:hidden">
            <BrandSwitcher activeBrand="proathletic" />
          </div>

          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/proathletic/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-[#0F0F10] border border-[#25272A] px-3 py-1.5 shadow-2xl w-60 z-50 rounded-sm"
              >
                <input
                  type="text"
                  placeholder="Search performance gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none text-white placeholder-zinc-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-zinc-400 hover:text-white ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-white hover:text-[#CCFF00] transition-colors"
                aria-label="Search gear"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Admin / Account Link */}
          <Link
            href="/admin"
            className="p-1.5 text-white hover:text-[#CCFF00] transition-colors"
            title="Admin Dashboard"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 text-white hover:text-[#CCFF00] transition-colors"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#CCFF00] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F10] border-b border-[#25272A] px-6 py-6 space-y-4">
          <div className="space-y-3 font-bold tracking-widest uppercase text-xs text-white">
            <Link
              href="/proathletic/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              Shop All Gear
            </Link>
            <Link
              href="/proathletic/collections/pro-series-zero"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              Pro-Series Zero
            </Link>
            <Link
              href="/proathletic/collections/neon-impact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              Neon Impact Capsule
            </Link>
            <Link
              href="/proathletic/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              Fabric Technology
            </Link>
            <Link
              href="/proathletic/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              HQ & Support
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#CCFF00]"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
