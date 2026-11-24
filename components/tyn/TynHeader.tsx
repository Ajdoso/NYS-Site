'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage, LanguageSwitcher } from '@/lib/context/LanguageContext';
import { BrandSwitcher } from '../shared/BrandSwitcher';
import { KoshkarMuyiz } from './KazakhOrnament';
import { Search, ShoppingBag, Menu, X, ChevronDown, User, ArrowRight } from 'lucide-react';

export const TynHeader: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#0D4352]/10 transition-colors">
      {/* Announcement Bar */}
      <div className="bg-[#0D4352] text-[#F7F5F0] py-2 px-4 text-center text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase flex items-center justify-between">
        <div className="hidden lg:block text-[#C49A45] text-[10px] font-serif">
          {t('announcement.worldwide')}
        </div>
        <div className="mx-auto flex items-center gap-2">
          <span>{t('announcement.freeShipping')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher theme="dark" />
          <BrandSwitcher activeBrand="tyn" />
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#0D4352] hover:text-[#C49A45] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold tracking-[0.15em] uppercase text-[#0D4352]">
          {/* Shop Mega Menu */}
          <div className="relative group py-6">
            <Link
              href="/tyn/shop"
              className="hover:text-[#C49A45] transition-colors flex items-center gap-1"
            >
              {t('nav.shopAll')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </Link>
            {/* BOXRAW-Style Rich Mega Dropdown */}
            <div className="absolute top-full left-0 w-[580px] bg-[#F7F5F0] border border-[#0D4352]/15 shadow-2xl p-6 hidden group-hover:grid grid-cols-2 gap-6 transition-all z-50 rounded-sm">
              <div className="space-y-3">
                <p className="text-[10px] text-[#C49A45] tracking-[0.2em] font-serif uppercase pb-1 border-b border-[#0D4352]/10 font-bold">
                  {t('nav.categories')}
                </p>
                <div className="space-y-2 text-xs font-semibold">
                  <Link href="/tyn/shop?category=hoodies" className="block text-zinc-700 hover:text-[#0D4352] hover:translate-x-1 transition-all">
                    {t('categories.hoodies')}
                  </Link>
                  <Link href="/tyn/shop?category=outerwear" className="block text-zinc-700 hover:text-[#0D4352] hover:translate-x-1 transition-all">
                    {t('categories.outerwear')}
                  </Link>
                  <Link href="/tyn/shop?category=tees" className="block text-zinc-700 hover:text-[#0D4352] hover:translate-x-1 transition-all">
                    {t('categories.tees')}
                  </Link>
                  <Link href="/tyn/shop?category=pants" className="block text-zinc-700 hover:text-[#0D4352] hover:translate-x-1 transition-all">
                    {t('categories.pants')}
                  </Link>
                  <Link href="/tyn/shop?category=accessories" className="block text-zinc-700 hover:text-[#0D4352] hover:translate-x-1 transition-all">
                    {t('categories.accessories')}
                  </Link>
                </div>
              </div>

              {/* Visual Card inside Mega Menu */}
              <Link
                href="/tyn/collections/steppe-horizon"
                className="relative aspect-[4/3] rounded-sm overflow-hidden group/tile flex flex-col justify-end p-4 shadow-md bg-[#EDE7DC]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/tile:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[9px] font-bold text-[#C49A45] uppercase tracking-widest font-serif">
                    {t('nav.newDrop')}
                  </span>
                  <h4 className="text-sm font-black uppercase font-serif tracking-wide">Steppe Horizon</h4>
                  <span className="text-[10px] text-white/90 underline inline-flex items-center gap-1 mt-1">
                    {t('home.exploreCollection')} →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Collections Mega Menu */}
          <div className="relative group py-6">
            <Link
              href="/tyn/collections/steppe-horizon"
              className="hover:text-[#C49A45] transition-colors flex items-center gap-1"
            >
              {t('nav.collections')} <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-[580px] bg-[#F7F5F0] border border-[#0D4352]/15 shadow-2xl p-6 hidden group-hover:grid grid-cols-2 gap-6 transition-all z-50 rounded-sm">
              <div className="space-y-3">
                <p className="text-[10px] text-[#C49A45] tracking-[0.2em] font-serif uppercase pb-1 border-b border-[#0D4352]/10 font-bold">
                  {t('nav.collections')}
                </p>
                <div className="space-y-3">
                  <Link href="/tyn/collections/steppe-horizon" className="block group/item">
                    <p className="text-zinc-900 group-hover/item:text-[#0D4352] font-bold text-xs">Steppe Horizon</p>
                    <p className="text-[10px] text-zinc-500 normal-case tracking-normal">Дала Көкжиегі — 500 GSM Fleece</p>
                  </Link>
                  <Link href="/tyn/collections/nomadic-essentials" className="block group/item">
                    <p className="text-zinc-900 group-hover/item:text-[#0D4352] font-bold text-xs">Nomadic Essentials</p>
                    <p className="text-[10px] text-zinc-500 normal-case tracking-normal">Everyday Minimalist Cuts</p>
                  </Link>
                  <Link href="/tyn/collections/altay-gold" className="block group/item">
                    <p className="text-zinc-900 group-hover/item:text-[#0D4352] font-bold text-xs">Altay Gold Archive</p>
                    <p className="text-[10px] text-zinc-500 normal-case tracking-normal">Gold Thread Embroidery</p>
                  </Link>
                </div>
              </div>

              <Link
                href="/tyn/collections/nomadic-essentials"
                className="relative aspect-[4/3] rounded-sm overflow-hidden group/tile flex flex-col justify-end p-4 shadow-md bg-[#EDE7DC]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/tile:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F26] via-[#0A1F26]/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[9px] font-bold text-[#C49A45] uppercase tracking-widest font-serif">
                    Core Capsule
                  </span>
                  <h4 className="text-sm font-black uppercase font-serif tracking-wide">Nomadic Essentials</h4>
                  <span className="text-[10px] text-white/90 underline inline-flex items-center gap-1 mt-1">
                    {t('home.exploreCollection')} →
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <Link href="/tyn/about" className="hover:text-[#C49A45] transition-colors">
            {t('nav.ourHeritage')}
          </Link>

          <Link href="/tyn/contact" className="hover:text-[#C49A45] transition-colors">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Center Brand Identity */}
        <div className="flex flex-col items-center">
          <Link href="/tyn" className="group flex items-center space-x-2">
            <KoshkarMuyiz className="w-7 h-7 text-[#0D4352] group-hover:text-[#C49A45] transition-colors" color="#0D4352" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tracking-[0.25em] text-[#0D4352] uppercase font-serif leading-none">
                TYN
              </span>
              <span className="text-[8px] font-bold tracking-[0.3em] text-[#C49A45] uppercase mt-0.5">
                KAZAKHSTAN
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          <div className="sm:hidden">
            <LanguageSwitcher theme="light" />
          </div>

          <div className="hidden sm:block">
            <BrandSwitcher activeBrand="tyn" />
          </div>

          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/tyn/shop?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-[#0D4352]/30 px-3 py-1.5 shadow-md w-60 z-50 rounded-sm"
              >
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-transparent outline-none text-zinc-800 placeholder-zinc-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-zinc-400 hover:text-zinc-800 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-[#0D4352] hover:text-[#C49A45] transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Admin / Account Link */}
          <Link
            href="/admin"
            className="p-1.5 text-[#0D4352] hover:text-[#C49A45] transition-colors"
            title={t('nav.admin')}
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1.5 text-[#0D4352] hover:text-[#C49A45] transition-colors"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C49A45] text-[#0D4352] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F0] border-b border-[#0D4352]/20 px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0D4352]/10">
            <LanguageSwitcher theme="light" />
            <BrandSwitcher activeBrand="tyn" />
          </div>

          <div className="space-y-3 font-bold tracking-widest uppercase text-xs text-[#0D4352]">
            <Link
              href="/tyn/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#0D4352]/10"
            >
              {t('nav.shopAll')}
            </Link>
            <Link
              href="/tyn/collections/steppe-horizon"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#0D4352]/10"
            >
              Steppe Horizon
            </Link>
            <Link
              href="/tyn/collections/nomadic-essentials"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#0D4352]/10"
            >
              Nomadic Essentials
            </Link>
            <Link
              href="/tyn/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#0D4352]/10"
            >
              {t('nav.ourHeritage')}
            </Link>
            <Link
              href="/tyn/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-[#0D4352]/10"
            >
              {t('nav.contact')}
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#C49A45]"
            >
              {t('nav.admin')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
