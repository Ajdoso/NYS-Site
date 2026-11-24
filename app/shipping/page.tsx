import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/"
          className="text-xs font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Storefront
        </Link>

        <div className="border-b border-zinc-200 pb-4">
          <div className="flex items-center space-x-2 text-zinc-800 mb-2">
            <Truck className="w-6 h-6 text-[#0D4352]" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Logistics & Courier</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-wider">
            Kazakhstan & International Shipping Policy
          </h1>
        </div>

        <div className="space-y-6 text-xs text-zinc-700 leading-relaxed">
          <div className="p-6 bg-white border border-zinc-200 rounded-sm space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
              1. Domestic Delivery Rates & Free Shipping
            </h2>
            <p>
              • Orders exceeding <strong>35 000 ₸</strong> automatically qualify for <strong>FREE EXPRESS SHIPPING</strong> anywhere in the Republic of Kazakhstan.
            </p>
            <p>
              • For orders under 35 000 ₸, a flat courier fee of <strong>2 500 ₸</strong> applies.
            </p>
          </div>

          <div className="p-6 bg-white border border-zinc-200 rounded-sm space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
              2. Delivery Timelines
            </h2>
            <p>
              • <strong>Almaty Metro:</strong> Next-day delivery (or same-day priority VIP courier for orders placed before 14:00).
            </p>
            <p>
              • <strong>Astana Metro:</strong> 1-2 business days.
            </p>
            <p>
              • <strong>Regional Centers (Shymkent, Karaganda, Aktobe, Atyrau, Pavlodar, etc.):</strong> 2-4 business days.
            </p>
          </div>

          <div className="p-6 bg-white border border-zinc-200 rounded-sm space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
              3. Flagship Showroom Pick-Up
            </h2>
            <p>
              You may also select in-person pick-up at our Almaty Flagship Showroom (Dostyk Ave 180) free of charge. Your order will be prepared and steamed within 2 hours of placement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
