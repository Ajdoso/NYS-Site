'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { formatPrice } from '@/lib/utils/format';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    amountUntilFreeShipping,
  } = useCart();
  const { t } = useLanguage();

  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 2500;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 text-zinc-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-zinc-900" />
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">
              {t('cart.title')} ({cart.length})
            </h1>
          </div>
          <Link
            href="/"
            className="text-xs font-bold text-zinc-600 hover:text-zinc-900 underline uppercase tracking-widest"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center bg-white border border-zinc-200 rounded-sm shadow-sm max-w-lg mx-auto p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-zinc-800 uppercase tracking-wider">
              {t('cart.emptyTitle')}
            </h2>
            <p className="text-xs text-zinc-500">
              {t('cart.emptySubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link
                href="/tyn/shop"
                className="px-6 py-3 bg-[#0D4352] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C49A45] hover:text-[#0D4352] transition-colors"
              >
                Shop TYN Streetwear
              </Link>
              <Link
                href="/proathletic/shop"
                className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-colors"
              >
                Shop PROATHLETIC
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items List */}
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-sm p-6 shadow-sm space-y-6">
              {/* Free Shipping Alert */}
              <div className="p-4 bg-zinc-100 rounded-sm text-xs border border-zinc-200">
                {amountUntilFreeShipping === 0 ? (
                  <p className="text-emerald-700 font-bold flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    {t('cart.qualifiedFreeShipping')}
                  </p>
                ) : (
                  <p className="text-zinc-700">
                    {t('cart.addMoreForFreeShipping', { amount: formatPrice(amountUntilFreeShipping) })}
                  </p>
                )}
              </div>

              {/* Items Table */}
              <div className="divide-y divide-zinc-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-24 bg-zinc-100 rounded-sm overflow-hidden shrink-0 border border-zinc-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                            item.brandSlug === 'tyn'
                              ? 'bg-[#0D4352]/10 text-[#0D4352]'
                              : 'bg-black text-[#CCFF00]'
                          }`}
                        >
                          {item.brandSlug.toUpperCase()}
                        </span>
                        <h3 className="text-sm font-bold text-zinc-900">
                          {item.productName}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          {t('product.color')}: {item.color} • {t('product.size')}: {item.size}
                        </p>
                        <p className="text-xs font-semibold text-zinc-800">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center border border-zinc-300 rounded-sm bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-zinc-600 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-zinc-600 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-zinc-900 block">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] text-red-600 hover:underline inline-flex items-center gap-1 mt-1"
                        >
                          <Trash2 className="w-3 h-3" /> {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-sm p-6 shadow-sm space-y-6 h-fit">
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-3">
                {t('checkout.orderSummary')}
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>{t('cart.shipping')}</span>
                  <span className="font-bold text-zinc-900">
                    {shippingFee === 0 ? t('cart.free') : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>{t('product.taxIncluded')}</span>
                  <span className="font-medium text-zinc-500">KZT</span>
                </div>
                <div className="pt-3 border-t border-zinc-200 flex justify-between text-base font-extrabold text-zinc-900">
                  <span>{t('checkout.total')}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black tracking-widest uppercase transition-colors shadow-md flex items-center justify-center gap-2"
              >
                {t('cart.checkout')} <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="space-y-2 text-[11px] text-zinc-500 pt-2 border-t border-zinc-200">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Secure 256-bit encrypted checkout</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span>Express courier across Almaty, Astana & all KZ regions</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
