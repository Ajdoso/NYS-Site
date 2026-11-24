'use client';

import React, { useState } from 'react';
import { Partner, BrandId } from '@/types/ecommerce';
import { Play, Shield, Award, Quote } from 'lucide-react';
import { KoshkarMuyiz } from '@/components/tyn/KazakhOrnament';

interface PartnersSectionProps {
  partners: Partner[];
  brandSlug: BrandId;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners,
  brandSlug,
}) => {
  const isTyn = brandSlug === 'tyn';
  const [activePartnerIndex, setActivePartnerIndex] = useState(0);
  const activePartner = partners[activePartnerIndex] || partners[0];

  if (!partners || partners.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between border-b pb-4 ${
          isTyn ? 'border-[#0D4352]/15' : 'border-[#25272A]'
        }`}
      >
        <div>
          <p
            className={`text-[10px] font-bold tracking-[0.25em] uppercase ${
              isTyn ? 'font-serif text-[#C49A45]' : 'font-mono text-[#CCFF00]'
            }`}
          >
            {isTyn ? 'STEPPE BROTHERHOOD & CHAMPIONS' : 'PRO ATHLETE ROSTER'}
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-black uppercase tracking-wide mt-1 ${
              isTyn ? 'font-serif text-[#0D4352]' : 'text-white'
            }`}
          >
            {isTyn ? 'Ambassadors of the Great Steppe' : 'Champions Who Wear The Gear'}
          </h2>
        </div>
        <span
          className={`text-xs uppercase tracking-widest ${
            isTyn ? 'font-serif text-zinc-500' : 'font-mono text-zinc-400'
          }`}
        >
          {isTyn ? 'HONOR • RESILIENCE • DIGNITY' : 'TESTED IN WARRIOR COMBAT'}
        </span>
      </div>

      {/* Main Spotlight & Video/Photo Card */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-sm border ${
          isTyn
            ? 'bg-[#EDE7DC] border-[#0D4352]/15 text-[#0A1F26]'
            : 'bg-[#0F0F10] border-[#25272A] text-white'
        }`}
      >
        {/* Left: Active Partner Media Container */}
        <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm bg-black border border-zinc-800 shadow-xl group">
          {activePartner.videoUrl ? (
            <video
              key={activePartner.id}
              src={activePartner.videoUrl}
              poster={activePartner.imageUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${activePartner.imageUrl}')` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
            <div className="text-white space-y-1">
              <span
                className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${
                  isTyn ? 'bg-[#C49A45] text-[#0A1F26]' : 'bg-[#CCFF00] text-black font-mono'
                }`}
              >
                {activePartner.role}
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                {activePartner.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Right: Partner Story, Quote & Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center space-x-2">
            {isTyn ? (
              <KoshkarMuyiz className="w-5 h-5 text-[#C49A45]" color="#C49A45" />
            ) : (
              <Award className="w-5 h-5 text-[#CCFF00]" />
            )}
            <span
              className={`text-xs font-bold tracking-widest uppercase ${
                isTyn ? 'font-serif text-[#C49A45]' : 'font-mono text-[#CCFF00]'
              }`}
            >
              ATHLETE SPOTLIGHT
            </span>
          </div>

          <div className="space-y-3">
            <Quote className={`w-8 h-8 opacity-30 ${isTyn ? 'text-[#0D4352]' : 'text-[#CCFF00]'}`} />
            <blockquote
              className={`text-base sm:text-lg font-medium leading-relaxed italic ${
                isTyn ? 'font-serif text-zinc-800' : 'text-zinc-200'
              }`}
            >
              &ldquo;{activePartner.quote}&rdquo;
            </blockquote>
            <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
              — {activePartner.name} ({activePartner.role})
            </p>
          </div>

          {/* Roster Thumbnails / Selector */}
          <div className="pt-4 border-t border-zinc-500/20 space-y-2">
            <span
              className={`text-[10px] uppercase tracking-wider font-bold block ${
                isTyn ? 'font-serif text-zinc-500' : 'font-mono text-zinc-400'
              }`}
            >
              SELECT ATHLETE / AMBASSADOR:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {partners.map((partner, idx) => (
                <button
                  key={partner.id}
                  onClick={() => setActivePartnerIndex(idx)}
                  className={`p-2 rounded-sm border text-left transition-all ${
                    activePartnerIndex === idx
                      ? isTyn
                        ? 'border-[#0D4352] bg-[#0D4352] text-white shadow-md'
                        : 'border-[#CCFF00] bg-[#CCFF00] text-black font-mono shadow-pro-glow'
                      : isTyn
                      ? 'border-[#0D4352]/20 hover:border-[#0D4352] bg-white/60 text-zinc-800'
                      : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900 text-zinc-300 font-mono'
                  }`}
                >
                  <p className="text-[11px] font-bold line-clamp-1">{partner.name}</p>
                  <p className="text-[9px] opacity-75 line-clamp-1">{partner.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
