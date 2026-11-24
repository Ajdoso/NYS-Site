'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage, LanguageSwitcher } from '@/lib/context/LanguageContext';
import { BrandSwitcher } from '../shared/BrandSwitcher';
import { Search, ShoppingBag, Menu, X, ChevronDown, Zap, User, ArrowRight } from 'lucide-react';

export const ProHeader: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#25272A] transition-colors text-white">
      {/* Announcement Bar */}
      <div className="bg-[#0F0F10] border-b border-[#25272A] py-2 px-4 text-center text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center justify-between">
        <div className="hidden lg:flex items-center space-x-2 text-[#CCFF00] text-[10px]">
          <Zap className="w-3 h-3 fill-current" />
          <span>{t('announcement.proSpec')}</span>
        </div>
        <div className="mx-auto flex items-center gap-2">
          <span className="text-zinc-200">{t('announcement.fastDispatch')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher theme="dark" />
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
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-black tracking-[0.15em] uppercase text-zinc-300">
          {/* Shop Mega Menu */}
          <div className="relative group py-6">
            <Link
              href="/proathletic/shop"
              className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"
            >
              {t('nav.gear')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </Link>
            {/* BOXRAW-Style Rich Mega Dropdown */}
            <div className="absolute top-full left-0 w-[580px] bg-[#0F0F10] border border-[#25272A] shadow-2xl p-6 hidden group-hover:grid grid-cols-2 gap-6 transition-all z-50 rounded-sm">
              <div className="space-y-3">
                <p className="text-[10px] text-[#CCFF00] tracking-[0.2em] font-mono uppercase pb-1 border-b border-[#25272A] font-bold">
                  {t('nav.categories')}
                </p>
                <div className="space-y-2 text-xs font-semibold">
                  <Link href="/proathletic/shop?category=compression" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                    {t('categories.compression')}
                  </Link>
                  <Link href="/proathletic/shop?category=performance-hoodies" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                    {t('categories.performanceHoodies')}
                  </Link>
                  <Link href="/proathletic/shop?category=training-tops" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                    {t('categories.trainingTops')}
                  </Link>
                  <Link href="/proathletic/shop?category=shorts-tights" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                    {t('categories.shortsTights')}
                  </Link>
                  <Link href="/proathletic/shop?category=gear" className="block text-zinc-400 hover:text-[#CCFF00] hover:translate-x-1 transition-all">
                    {t('categories.gymGear')}
                  </Link>
                </div>
              </div>

              {/* Visual Card inside Mega Menu */}
              <Link
                href="/proathletic/collections/pro-series-zero"
                className="relative aspect-[4/3] rounded-sm overflow-hidden group/tile flex flex-col justify-end p-4 shadow-md bg-[#18191C] border border-[#25272A]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/tile:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[9px] font-bold text-[#CCFF00] uppercase tracking-widest font-mono">
                    {t('nav.newDrop')}
                  </span>
                  <h4 className="text-sm font-black uppercase tracking-wide">PRO-SERIES ZERO</h4>
                  <span className="text-[10px] text-white/90 underline inline-flex items-center gap-1 mt-1 font-mono">
                    {t('home.exploreCollection')} →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Collections Mega Menu */}
          <div className="relative group py-6">
            <Link
              href="/proathletic/collections/pro-series-zero"
              className="hover:text-[#CCFF00] transition-colors flex items-center gap-1"
            >
              {t('nav.collections')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-[580px] bg-[#0F0F10] border border-[#25272A] shadow-2xl p-6 hidden group-hover:grid grid-cols-2 gap-6 transition-all z-50 rounded-sm">
              <div className="space-y-3">
                <p className="text-[10px] text-[#CCFF00] tracking-[0.2em] font-mono uppercase pb-1 border-b border-[#25272A] font-bold">
                  {t('home.performanceCapsules')}
                </p>
                <div className="space-y-3">
                  <Link href="/proathletic/collections/pro-series-zero" className="block group/item">
                    <p className="text-white group-hover/item:text-[#CCFF00] font-bold text-xs">Pro-Series Zero</p>
                    <p className="text-[10px] text-zinc-400 normal-case tracking-normal">Graduated 4-Way Compression</p>
                  </Link>
                  <Link href="/proathletic/collections/neon-impact" className="block group/item">
                    <p className="text-white group-hover/item:text-[#CCFF00] font-bold text-xs">Neon Impact Capsule</p>
                    <p className="text-[10px] text-zinc-400 normal-case tracking-normal">High-Voltage Night Training</p>
                  </Link>
                  <Link href="/proathletic/collections/iron-lab" className="block group/item">
                    <p className="text-white group-hover/item:text-[#CCFF00] font-bold text-xs">Iron Lab Division</p>
                    <p className="text-[10px] text-zinc-400 normal-case tracking-normal">Heavy Duty Bar-Tacked Strength</p>
                  </Link>
                </div>
              </div>

              <Link
                href="/proathletic/collections/neon-impact"
                className="relative aspect-[4/3] rounded-sm overflow-hidden group/tile flex flex-col justify-end p-4 shadow-md bg-[#18191C] border border-[#25272A]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/tile:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[9px] font-bold text-[#CCFF00] uppercase tracking-widest font-mono">
                    High Voltage
                  </span>
                  <h4 className="text-sm font-black uppercase tracking-wide">NEON IMPACT</h4>
                  <span className="text-[10px] text-white/90 underline inline-flex items-center gap-1 mt-1 font-mono">
                    {t('home.exploreCollection')} →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <Link href="/proathletic/about" className="hover:text-[#CCFF00] transition-colors">
            {t('nav.fabricTech')}
          </Link>

          <Link href="/proathletic/contact" className="hover:text-[#CCFF00] transition-colors">
            {t('nav.hqSupport')}
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
        <div className="flex items-center space-x-4 sm:space-x-5">
          <div className="sm:hidden">
            <LanguageSwitcher theme="dark" />
          </div>

          <div className="hidden sm:block">
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
                  placeholder={t('nav.search')}
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
            title={t('nav.admin')}
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
              <span className="absolute -top-1 -right-1 bg-[#CCFF00] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F10] border-b border-[#25272A] px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#25272A]">
            <LanguageSwitcher theme="dark" />
            <BrandSwitcher activeBrand="proathletic" />
          </div>

          <div className="space-y-3 font-bold tracking-widest uppercase text-xs text-white font-mono">
            <Link
              href="/proathletic/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              {t('nav.gear')}
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
              {t('nav.fabricTech')}
            </Link>
            <Link
              href="/proathletic/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#25272A] hover:text-[#CCFF00]"
            >
              {t('nav.hqSupport')}
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#CCFF00]"
            >
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
