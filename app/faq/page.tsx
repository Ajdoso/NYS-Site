import React from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How does the brand separation between TYN and PROATHLETIC work?',
      a: 'TYN and PROATHLETIC are two independent fashion entities operating under a unified e-commerce platform. TYN focuses on modern Kazakh heritage streetwear and luxury 500 GSM loopback cotton, while PROATHLETIC specializes in technical high-compression athletic apparel. You can shop both brands in a single session with a unified shopping bag and seamless checkout.',
    },
    {
      q: 'What are the delivery times within Kazakhstan?',
      a: 'Almaty & Astana orders are delivered within 24-48 hours via express courier. Regional cities (Shymkent, Karaganda, Aktobe, Atyrau, etc.) arrive within 2-4 business days via KazPost or CDEK.',
    },
    {
      q: 'How do I know my size in TYN streetwear?',
      a: 'All TYN garments are intentionally designed with an oversized, modern drop-shoulder drape. If you prefer an exact tailored fit, order one size down. Every product page contains our detailed Sizing Guide with chest and length measurements.',
    },
    {
      q: 'What payment options do you support?',
      a: 'We accept Kaspi Pay / Kaspi Red, Visa, MasterCard, and Cash/Kaspi on courier delivery across all major Kazakhstan cities.',
    },
    {
      q: 'What is PROATHLETIC’s Lifetime Seam Guarantee?',
      a: 'All PROATHLETIC compression and training garments feature reinforced flatlock stitching. If a seam fails during athletic use, we will inspect, repair, or replace the item free of charge.',
    },
  ];

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
            <HelpCircle className="w-6 h-6 text-[#C49A45]" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Customer Support</span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-wider">
            Frequently Asked Questions (FAQ)
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-white border border-zinc-200 rounded-sm shadow-sm space-y-2">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">
                {faq.q}
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
