'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { formatPrice } from '@/lib/utils/format';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();
  const { t } = useLanguage();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-zinc-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-zinc-800" />
              <h2 className="text-base font-bold tracking-wider uppercase">{t('cart.title')} ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* BOXRAW-Style Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-zinc-100 border-b border-zinc-200 text-xs">
            {amountUntilFreeShipping === 0 ? (
              <p className="text-emerald-700 font-semibold flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                {t('cart.qualifiedFreeShipping')}
              </p>
            ) : (
              <p className="text-zinc-700">
                {t('cart.addMoreForFreeShipping', { amount: formatPrice(amountUntilFreeShipping) })}
              </p>
            )}
            <div className="w-full bg-zinc-300 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-zinc-800 uppercase tracking-wider mb-1">
                  {t('cart.emptyTitle')}
                </h3>
                <p className="text-sm text-zinc-500 max-w-xs mb-6">
                  {t('cart.emptySubtitle')}
                </p>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <Link
                    href="/tyn/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 bg-[#0D4352] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#C49A45] hover:text-[#0D4352] transition-colors text-center"
                  >
                    Explore TYN Streetwear
                  </Link>
                  <Link
                    href="/proathletic/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 px-4 bg-zinc-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-[#CCFF00] hover:text-black transition-colors text-center"
                  >
                    Explore PROATHLETIC Gear
                  </Link>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-zinc-100 group relative transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-zinc-100 shrink-0 overflow-hidden rounded-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                            item.brandSlug === 'tyn'
                              ? 'bg-[#0D4352]/10 text-[#0D4352]'
                              : 'bg-zinc-900 text-[#CCFF00]'
                          }`}
                        >
                          {item.brandSlug.toUpperCase()}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-zinc-900 mt-1 line-clamp-1">
                        {item.productName}
                      </h4>

                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {item.color} • {t('product.size')} {item.size}
                      </p>
                    </div>

                    {/* Quantity & Subtotal */}
                    <div className="flex items-center justify-between mt-2 pt-2">
                      <div className="flex items-center border border-zinc-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-zinc-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-100 text-zinc-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-zinc-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 bg-zinc-50 border-t border-zinc-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">{t('cart.subtotal')}</span>
                <span className="text-base font-extrabold text-zinc-900">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                {t('product.taxIncluded')}. Express courier delivery available across Kazakhstan.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors shadow-md"
                >
                  {t('cart.checkout')} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 underline underline-offset-4"
                >
                  {t('cart.viewBag')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
