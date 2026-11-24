'use client';

import React, { useState } from 'react';
import { KazakhDivider, KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function TynContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#EDE7DC] border border-[#0D4352]/20 rounded-full">
          <KoshkarMuyiz className="w-4 h-4 text-[#0D4352]" color="#0D4352" />
          <span className="text-[11px] font-serif font-bold tracking-[0.25em] text-[#C49A45] uppercase">
            Байланыс • Contact & Showrooms
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif uppercase tracking-wider text-[#0D4352]">
          Visit Our Showrooms
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-600">
          Experience our heavyweight 500 GSM fleece and custom embroidery in person at our flagship locations in Almaty and Astana.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Showrooms & Info */}
        <div className="space-y-8">
          <div className="p-6 bg-[#EDE7DC] border border-[#0D4352]/15 rounded-sm space-y-4">
            <h3 className="text-base font-bold font-serif uppercase tracking-wider text-[#0D4352]">
              Almaty Flagship Showroom
            </h3>
            <div className="space-y-2 text-xs text-zinc-700">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
                <span>Dostyk Avenue 180, Kok Tobe District, Almaty</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C49A45] shrink-0" />
                <span>+7 (727) 345-6789 / WhatsApp: +7 (701) 555-0192</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C49A45] shrink-0" />
                <span>Monday – Sunday: 10:00 – 22:00</span>
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#EDE7DC] border border-[#0D4352]/15 rounded-sm space-y-4">
            <h3 className="text-base font-bold font-serif uppercase tracking-wider text-[#0D4352]">
              Astana Concept Space
            </h3>
            <div className="space-y-2 text-xs text-zinc-700">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
                <span>Mangilik El Avenue 53, Abu Dhabi Plaza, Astana</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C49A45] shrink-0" />
                <span>+7 (7172) 890-1234</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C49A45] shrink-0" />
                <span>Daily: 10:00 – 22:00</span>
              </p>
            </div>
          </div>

          <div className="p-4 border-l-4 border-[#C49A45] bg-white/60 text-xs text-zinc-600 space-y-1">
            <p className="font-bold text-[#0D4352]">Online Order Support & Courier Tracking:</p>
            <p>Email: concierge@tyn-streetwear.kz • Telegram: @tyn_concierge</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 bg-white border border-[#0D4352]/20 rounded-sm shadow-md">
          <h3 className="text-lg font-bold font-serif uppercase tracking-wider text-[#0D4352] mb-4">
            Send an Atelier Inquiry
          </h3>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-[#0D4352] uppercase font-serif">Message Received</h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                Рақмет! Our concierge team will get back to you via WhatsApp or Email within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D4352] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asel Kuanysh"
                  className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-[#0D4352]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D4352] mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (701) 000-00-00"
                  className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-[#0D4352]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D4352] mb-1">
                  Inquiry Topic
                </label>
                <select className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-[#0D4352] bg-white">
                  <option>Order Status & Tracking</option>
                  <option>Custom Sizing or Tailoring</option>
                  <option>Showroom Private Appointment</option>
                  <option>Wholesale / Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0D4352] mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our atelier assist you?"
                  className="w-full px-3 py-2 text-xs border border-zinc-300 rounded-sm outline-none focus:border-[#0D4352]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0D4352] hover:bg-[#C49A45] hover:text-[#0D4352] text-white text-xs font-bold tracking-widest uppercase transition-colors"
              >
                Dispatch Inquiry
              </button>
            </form>
          )}
        </div>
      </div>

      <KazakhDivider label="Біз Әрқашан Байланыстамыз" />
    </div>
  );
}
