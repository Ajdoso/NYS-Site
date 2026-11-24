'use client';

import React, { useState } from 'react';
import { Zap, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function ProContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-[#050505] text-white">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F10] border border-[#25272A] rounded-full font-mono">
          <Zap className="w-4 h-4 text-[#CCFF00] fill-current" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#CCFF00] uppercase">
            DISTRIBUTION HQ & SUPPORT
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
          CONNECT WITH THE LAB
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-400">
          Direct lines to customer logistics, athlete sponsorship management, and wholesale gym accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* HQ Details */}
        <div className="space-y-6">
          <div className="p-6 bg-[#0F0F10] border border-[#25272A] rounded-sm space-y-4">
            <h3 className="text-base font-black uppercase tracking-wider text-white font-mono">
              ALMATY LOGISTICS HUB & PRO SHOP
            </h3>
            <div className="space-y-2 text-xs text-zinc-400 font-mono">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                <span>Ryskulov Avenue 143/1, Athletic Park Hub, Almaty</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>+7 (727) 900-5544</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>24/7 Order Dispatch Operations</span>
              </p>
            </div>
          </div>

          <div className="p-4 border-l-4 border-[#CCFF00] bg-[#0F0F10] text-xs text-zinc-400 space-y-1 font-mono">
            <p className="font-bold text-white">Athlete Sponsorship & Combat Roster:</p>
            <p>athletes@proathletic-gear.kz • Telegram: @proathletic_roster</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 bg-[#0F0F10] border border-[#25272A] rounded-sm">
          <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4 font-mono">
            DISPATCH INQUIRY TICKET
          </h3>

          {submitted ? (
            <div className="py-12 text-center space-y-3 font-mono">
              <CheckCircle2 className="w-12 h-12 text-[#CCFF00] mx-auto" />
              <h4 className="text-base font-bold text-white uppercase">Ticket Dispatched</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Logged into the system. An operations manager will reply within 90 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Athlete / Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daniyar Yeleussinov"
                  className="w-full px-3 py-2 text-xs bg-[#17181A] border border-[#25272A] rounded-sm outline-none focus:border-[#CCFF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (777) 000-00-00"
                  className="w-full px-3 py-2 text-xs bg-[#17181A] border border-[#25272A] rounded-sm outline-none focus:border-[#CCFF00] text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Division Ticket Type
                </label>
                <select className="w-full px-3 py-2 text-xs bg-[#17181A] border border-[#25272A] rounded-sm outline-none focus:border-[#CCFF00] text-white">
                  <option>Gear Order Logistics</option>
                  <option>Lifetime Warranty Inspection</option>
                  <option>Athlete Sponsorship Proposal</option>
                  <option>Bulk Gym Equipment & Uniforms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Technical Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Specify sizes, items or inquiry details..."
                  className="w-full px-3 py-2 text-xs bg-[#17181A] border border-[#25272A] rounded-sm outline-none focus:border-[#CCFF00] text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#CCFF00] hover:bg-[#B8E600] text-black text-xs font-black tracking-widest uppercase transition-colors shadow-pro-glow"
              >
                TRANSMIT TICKET
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
