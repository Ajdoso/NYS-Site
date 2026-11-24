'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { formatPrice } from '@/lib/utils/format';
import { createOrder } from '@/lib/data/store';
import { Order } from '@/types/ecommerce';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Package,
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, freeShippingThreshold, clearCart } = useCart();
  const { t } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: 'Almaty',
    streetAddress: '',
    apartmentSuite: '',
    postalCode: '050000',
    shippingMethod: 'standard', // 'standard' | 'express_vip'
    paymentMethod: 'kaspi', // 'kaspi' | 'card' | 'cod'
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const baseShippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 2500;
  const shippingFee = formData.shippingMethod === 'express_vip' ? baseShippingFee + 1500 : baseShippingFee;
  const totalAmount = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        customerName: `${formData.firstName} ${formData.lastName}`.trim() || 'Valued Customer',
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: {
          recipientName: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          email: formData.email,
          streetAddress: formData.streetAddress,
          apartmentSuite: formData.apartmentSuite,
          city: formData.city,
          postalCode: formData.postalCode,
          country: 'Kazakhstan',
        },
        subtotal,
        shippingFee,
        discountAmount: 0,
        totalAmount,
        status: 'processing',
        paymentStatus: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
        paymentMethod:
          formData.paymentMethod === 'kaspi'
            ? 'Kaspi Pay (Kazakhstan)'
            : formData.paymentMethod === 'card'
            ? 'Visa / MasterCard 3D-Secure'
            : 'Cash on Courier Delivery',
        trackingNumber: `KZ-${Math.floor(100000 + Math.random() * 900000)}`,
        notes: formData.notes,
        items: cart.map((item, idx) => ({
          id: `item-${Date.now()}-${idx}`,
          orderId: '',
          productId: item.productId,
          brandSlug: item.brandSlug,
          productName: item.productName,
          variantDetails: {
            color: item.color,
            size: item.size,
          },
          unitPrice: item.price,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
          imageUrl: item.imageUrl,
        })),
      });

      setCompletedOrder(order);
      clearCart();
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order completed -> show professional Order Confirmation Receipt
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-zinc-100 py-16 px-4 sm:px-6 lg:px-8 text-zinc-900">
        <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-sm shadow-xl p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t('checkout.orderConfirmed')}
            </span>
            <h1 className="text-3xl font-black uppercase tracking-wider text-zinc-900">
              {t('checkout.thankYou')}
            </h1>
            <p className="text-xs text-zinc-500">
              {t('checkout.orderNumber')}: <strong className="text-zinc-900 font-mono text-sm">{completedOrder.orderNumber}</strong>
            </p>
          </div>

          {/* Delivery & Tracking card */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">{t('checkout.trackingCode')}:</span>
              <span className="font-mono font-bold text-zinc-900">{completedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Delivery Address:</span>
              <span className="font-semibold text-zinc-800 text-right">
                {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.streetAddress}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Payment Status:</span>
              <span className="font-bold text-emerald-700 uppercase">{completedOrder.paymentStatus}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Payment Method:</span>
              <span className="font-medium text-zinc-800">{completedOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 border-b pb-2">
              Purchased Items ({completedOrder.items.length})
            </h3>
            <div className="divide-y divide-zinc-100 max-h-60 overflow-y-auto">
              {completedOrder.items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-zinc-500">{item.quantity}×</span>
                    <div>
                      <p className="font-bold text-zinc-900">{item.productName}</p>
                      <p className="text-[11px] text-zinc-500">
                        {item.variantDetails.color} • {item.variantDetails.size}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-zinc-900">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-zinc-200 text-xs space-y-1.5">
            <div className="flex justify-between text-zinc-500">
              <span>Subtotal:</span>
              <span>{formatPrice(completedOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Shipping Fee:</span>
              <span>{completedOrder.shippingFee === 0 ? 'FREE' : formatPrice(completedOrder.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-zinc-900 pt-2 border-t border-zinc-200">
              <span>{t('checkout.total')}:</span>
              <span>{formatPrice(completedOrder.totalAmount)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/"
              className="flex-1 py-3 text-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              {t('checkout.returnToStore')}
            </Link>
            <Link
              href="/admin"
              className="flex-1 py-3 text-center border border-zinc-300 hover:bg-zinc-100 text-zinc-800 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              View in Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Form
  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 sm:px-6 lg:px-8 text-zinc-900">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-black uppercase tracking-wider">
              {t('checkout.title')} • TYN × PROATHLETIC
            </h1>
          </div>
          <Link
            href="/cart"
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Bag
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center bg-white border border-zinc-200 rounded-sm p-8 max-w-md mx-auto space-y-4">
            <p className="text-sm font-bold text-zinc-800 uppercase">{t('cart.emptyTitle')}</p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-zinc-900 text-white text-xs font-bold uppercase"
            >
              {t('cart.continueShopping')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Contact, Shipping, Payment */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Customer Contact */}
              <div className="bg-white border border-zinc-200 rounded-sm p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-zinc-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                    {t('checkout.step1')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.firstName')} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Arman"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.lastName')} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Zhumabayev"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.email')} *</label>
                    <input
                      type="email"
                      required
                      placeholder="arman.kz@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.phone')} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (701) 555-0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address in Kazakhstan */}
              <div className="bg-white border border-zinc-200 rounded-sm p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-zinc-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                    {t('checkout.step2')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.city')} *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900 bg-white"
                    >
                      <option value="Almaty">Almaty</option>
                      <option value="Astana">Astana</option>
                      <option value="Shymkent">Shymkent</option>
                      <option value="Karaganda">Karaganda</option>
                      <option value="Aktobe">Aktobe</option>
                      <option value="Atyrau">Atyrau</option>
                      <option value="Aktau">Aktau</option>
                      <option value="Pavlodar">Pavlodar</option>
                      <option value="Ust-Kamenogorsk">Ust-Kamenogorsk</option>
                      <option value="Taraz">Taraz</option>
                      <option value="Other Regional City">Other Regional Settlement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.postalCode')} *</label>
                    <input
                      type="text"
                      required
                      placeholder="050000"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.streetAddress')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dostyk Avenue 180"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">{t('checkout.apartment')}</label>
                  <input
                    type="text"
                    placeholder="Apt 42, Floor 4, Intercom 42K"
                    value={formData.apartmentSuite}
                    onChange={(e) => setFormData({ ...formData, apartmentSuite: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-zinc-900"
                  />
                </div>

                {/* Shipping Method Options */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    {t('checkout.shippingMethod')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3 border rounded-sm flex items-start gap-3 cursor-pointer text-xs transition-colors ${
                        formData.shippingMethod === 'standard'
                          ? 'border-zinc-900 bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="font-bold text-zinc-900">{t('checkout.standardDelivery')}</p>
                        <p className="text-[11px] text-zinc-500">
                          {baseShippingFee === 0 ? 'FREE (Orders > 35 000 ₸)' : '2 500 ₸ door-to-door'}
                        </p>
                      </div>
                    </label>

                    <label
                      className={`p-3 border rounded-sm flex items-start gap-3 cursor-pointer text-xs transition-colors ${
                        formData.shippingMethod === 'express_vip'
                          ? 'border-zinc-900 bg-zinc-50'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={formData.shippingMethod === 'express_vip'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'express_vip' })}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="font-bold text-zinc-900">{t('checkout.vipDelivery')}</p>
                        <p className="text-[11px] text-zinc-500">
                          +{formatPrice(1500)} (Almaty & Astana metro)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white border border-zinc-200 rounded-sm p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-zinc-100 pb-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                    {t('checkout.step3')}
                  </h2>
                </div>

                <div className="space-y-3">
                  <label
                    className={`p-3.5 border rounded-sm flex items-center justify-between cursor-pointer text-xs transition-colors ${
                      formData.paymentMethod === 'kaspi'
                        ? 'border-red-600 bg-red-50/40 ring-1 ring-red-600'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'kaspi'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'kaspi' })}
                      />
                      <div>
                        <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                          {t('checkout.kaspiPay')}
                        </p>
                        <p className="text-[11px] text-zinc-500">Instant verification for Kazakhstan residents</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-100 px-2 py-0.5 rounded">
                      RECOMMENDED
                    </span>
                  </label>

                  <label
                    className={`p-3.5 border rounded-sm flex items-center justify-between cursor-pointer text-xs transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      />
                      <div>
                        <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-zinc-700" />
                          {t('checkout.card')}
                        </p>
                        <p className="text-[11px] text-zinc-500">Secure 3D-Secure 256-bit bank encrypted</p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 border rounded-sm flex items-center justify-between cursor-pointer text-xs transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      />
                      <div>
                        <p className="font-bold text-zinc-900">{t('checkout.cod')}</p>
                        <p className="text-[11px] text-zinc-500">Inspect the garments before paying the courier</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Place Order Button */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-zinc-200 rounded-sm p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3 flex items-center justify-between">
                  <span>{t('checkout.orderSummary')} ({cart.length})</span>
                  <Link href="/cart" className="text-xs text-zinc-500 hover:underline normal-case">
                    Edit Bag
                  </Link>
                </h2>

                <div className="divide-y divide-zinc-100 max-h-80 overflow-y-auto space-y-3 pt-1">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-3 flex gap-3 items-center">
                      <div className="w-14 h-16 bg-zinc-100 rounded-sm overflow-hidden shrink-0 border border-zinc-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-xs">
                        <p className="font-bold text-zinc-900 line-clamp-1">{item.productName}</p>
                        <p className="text-[11px] text-zinc-500">
                          Qty: {item.quantity} • {item.color} • {item.size}
                        </p>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-zinc-100 rounded inline-block mt-0.5">
                          {item.brandSlug.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-zinc-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-200 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>{t('cart.subtotal')}:</span>
                    <span className="font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>{t('cart.shipping')}:</span>
                    <span className="font-bold text-zinc-900">
                      {shippingFee === 0 ? t('cart.free') : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>{t('checkout.total')}:</span>
                    <span className="text-zinc-900">{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-black tracking-widest uppercase transition-colors shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    t('checkout.processing')
                  ) : (
                    <>
                      {t('checkout.placeOrder')} • {formatPrice(totalAmount)} <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-zinc-400">
                  By clicking complete order, you confirm acceptance of our delivery terms.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
