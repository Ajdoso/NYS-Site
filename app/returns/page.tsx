import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, ShieldCheck } from 'lucide-react';

export default function ReturnsPage() {
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
            <RotateCcw className="w-6 h-6 text-[#C49A45]" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Client Service</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-wider">
            Returns, Exchanges & Warranty Policy
          </h1>
        </div>

        <div className="space-y-6 text-xs text-zinc-700 leading-relaxed">
          <div className="p-6 bg-white border border-zinc-200 rounded-sm space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
              14-Day Free Exchange Guarantee
            </h2>
            <p>
              We want you to feel confident in the drape and weight of our garments. If a size does not fit as expected, you may exchange any unworn, unwashed item with tags attached within 14 days of receipt.
            </p>
          </div>

          <div className="p-6 bg-white border border-zinc-200 rounded-sm space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
              How to Initiate a Return or Exchange
            </h2>
            <p>
              1. Contact our customer concierge via Telegram (<strong>@tyn_concierge</strong>) or WhatsApp (<strong>+7 (701) 555-0192</strong>) with your Order Number (e.g. ORD-2026-XXXX).
            </p>
            <p>
              2. Our courier will arrive at your door in Almaty or Astana to collect the package and deliver the replacement size.
            </p>
            <p>
              3. For regional orders, drop the parcel at any KazPost branch using our prepaid return waybill.
            </p>
          </div>

          <div className="p-6 bg-white border border-zinc-200 rounded-sm space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-900">
              Refund Processing
            </h2>
            <p>
              Refunds are processed back to the original payment method (Kaspi Bank card or Visa/MasterCard) within 1-3 business days following receipt and inspection at our Almaty warehouse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
