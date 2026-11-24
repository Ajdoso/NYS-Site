'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { KazakhDivider, KoshkarMuyiz } from './KazakhOrnament';
import { useLanguage, LanguageSwitcher } from '@/lib/context/LanguageContext';
import { ArrowRight, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';

export const TynFooter: React.FC = () => {
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
    <footer className="bg-[#0A1F26] text-[#F7F5F0] pt-12 pb-8 border-t border-[#C49A45]/30">
      <KazakhDivider accentColor="#C49A45" primaryColor="#C49A45" label="Қазақ Рухы мен Заманауи Сән" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Mission Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <KoshkarMuyiz className="w-8 h-8 text-[#C49A45]" color="#C49A45" />
            <div>
              <span className="text-2xl font-black tracking-[0.25em] text-[#F7F5F0] font-serif uppercase">
                TYN
              </span>
              <p className="text-[9px] text-[#C49A45] tracking-[0.3em] font-semibold uppercase">
                KAZAKH HERITAGE × STREETWEAR
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
            {t('footer.missionTyn')}
          </p>
          <div className="pt-2 text-xs text-[#C49A45]">
            <p className="font-semibold">{t('footer.flagshipShowrooms')}:</p>
            <p className="text-zinc-400 mt-1">{t('footer.almatyLocation')}</p>
          </div>
        </div>

        {/* Shop Navigation */}
        <div className="space-y-3">
          <p className="text-xs font-bold tracking-widest text-[#C49A45] uppercase">{t('nav.collections')}</p>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li>
              <Link href="/tyn/collections/steppe-horizon" className="hover:text-white transition-colors">
                Steppe Horizon (Дала)
              </Link>
            </li>
            <li>
              <Link href="/tyn/collections/nomadic-essentials" className="hover:text-white transition-colors">
                Nomadic Essentials
              </Link>
            </li>
            <li>
              <Link href="/tyn/collections/altay-gold" className="hover:text-white transition-colors">
                Altay Gold Archive
              </Link>
            </li>
            <li>
              <Link href="/tyn/shop" className="hover:text-white transition-colors">
                {t('nav.shopAll')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Care & Policies */}
        <div className="space-y-3">
          <p className="text-xs font-bold tracking-widest text-[#C49A45] uppercase">Client Care</p>
          <ul className="space-y-2 text-xs text-zinc-300">
            <li>
              <Link href="/tyn/about" className="hover:text-white transition-colors">
                {t('nav.ourHeritage')}
              </Link>
            </li>
            <li>
              <Link href="/tyn/contact" className="hover:text-white transition-colors">
                {t('nav.contact')}
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition-colors">
                Shipping & Pick-Up
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition-colors">
                Returns & 14-Day Exchanges
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-[#C49A45] hover:underline font-bold">
                {t('nav.admin')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-3">
          <p className="text-xs font-bold tracking-widest text-[#C49A45] uppercase">{t('footer.joinCircle')}</p>
          <p className="text-xs text-zinc-400">
            {t('footer.subscribeDesc')}
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded flex items-center space-x-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('footer.subscribedMsg')}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border border-[#C49A45]/40 rounded-sm overflow-hidden bg-black/20">
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-transparent text-white placeholder-zinc-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 bg-[#C49A45] text-[#0A1F26] hover:bg-[#E0C078] transition-colors"
                  aria-label="Subscribe"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-800 text-[11px] text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 TYN Streetwear Kazakhstan. {t('footer.rightsReserved')}</p>
        <div className="flex items-center space-x-6">
          <Link href="/shipping" className="hover:text-white">{t('footer.privacy')}</Link>
          <Link href="/returns" className="hover:text-white">{t('footer.terms')}</Link>
          <Link href="/proathletic" className="text-[#C49A45] hover:text-white font-bold">
            PROATHLETIC Sportswear →
          </Link>
        </div>
      </div>
    </footer>
  );
};
