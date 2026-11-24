'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage, LanguageSwitcher } from '@/lib/context/LanguageContext';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const ProFooter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-16 pb-10 border-t border-[#25272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Mission Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-7 bg-[#CCFF00] skew-x-[-20deg]" />
            <span className="text-2xl font-black tracking-wider uppercase font-sans">
              PRO<span className="text-[#CCFF00]">ATHLETIC</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
            {t('footer.missionPro')}
          </p>
          <div className="flex items-center space-x-4 pt-2 text-xs text-zinc-300">
            <div className="flex items-center space-x-1.5 text-[#CCFF00]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold tracking-wider uppercase text-[10px] font-mono">Lifetime Seam Guarantee</span>
            </div>
            <div className="flex items-center space-x-1.5 text-orange-500">
              <Zap className="w-4 h-4 fill-current" />
              <span className="font-bold tracking-wider uppercase text-[10px] font-mono">Rapid Recovery Tech</span>
            </div>
          </div>
        </div>

        {/* Divisions Navigation */}
        <div className="space-y-3">
          <p className="text-xs font-black tracking-widest text-[#CCFF00] uppercase font-mono">Divisions</p>
          <ul className="space-y-2 text-xs text-zinc-400 font-mono">
            <li>
              <Link href="/proathletic/collections/pro-series-zero" className="hover:text-white transition-colors">
                Pro-Series Zero
              </Link>
            </li>
            <li>
              <Link href="/proathletic/collections/neon-impact" className="hover:text-white transition-colors">
                Neon Impact Series
              </Link>
            </li>
            <li>
              <Link href="/proathletic/collections/iron-lab" className="hover:text-white transition-colors">
                Iron Lab Strength
              </Link>
            </li>
            <li>
              <Link href="/proathletic/shop" className="hover:text-white transition-colors">
                {t('nav.gear')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Warranty */}
        <div className="space-y-3">
          <p className="text-xs font-black tracking-widest text-[#CCFF00] uppercase font-mono">Performance Lab</p>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li>
              <Link href="/proathletic/about" className="hover:text-white transition-colors">
                {t('nav.fabricTech')}
              </Link>
            </li>
            <li>
              <Link href="/proathletic/contact" className="hover:text-white transition-colors">
                {t('nav.hqSupport')}
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors">
                Logistics Policy
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors">
                Warranty & Returns
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-[#CCFF00] hover:underline font-bold font-mono">
                {t('nav.admin')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Athlete Newsletter */}
        <div className="space-y-3">
          <p className="text-xs font-black tracking-widest text-[#CCFF00] uppercase font-mono">Athlete Dispatch</p>
          <p className="text-xs text-zinc-400">
            Join the inner circle for unannounced gear drops and priority release access.
          </p>

          {subscribed ? (
            <div className="p-3 bg-zinc-900 border border-[#CCFF00]/40 rounded flex items-center space-x-2 text-xs text-[#CCFF00] font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>Confirmed. Welcome to the Roster.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2 font-mono">
              <div className="flex border border-[#25272A] focus-within:border-[#CCFF00] rounded-sm overflow-hidden bg-[#0F0F10] transition-colors">
                <input
                  type="email"
                  required
                  placeholder="athlete@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-transparent text-white placeholder-zinc-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 bg-[#CCFF00] text-black hover:bg-[#B8E600] transition-colors font-bold"
                  aria-label="Subscribe to athlete newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          <div className="pt-2">
            <LanguageSwitcher theme="dark" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[#1F2124] text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <p>© 2026 PROATHLETIC SPORTS LAB. {t('footer.rightsReserved')}</p>
        <div className="flex items-center space-x-6">
          <Link href="/shipping" className="hover:text-white">WARRANTY</Link>
          <Link href="/returns" className="hover:text-white">{t('footer.privacy')}</Link>
          <Link href="/tyn" className="text-[#CCFF00] hover:text-white font-bold">
            TYN Kazakh Streetwear →
          </Link>
        </div>
      </div>
    </footer>
  );
};
