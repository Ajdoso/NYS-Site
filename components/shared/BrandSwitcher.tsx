'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BrandSwitcher: React.FC<{ activeBrand: 'tyn' | 'proathletic' }> = ({ activeBrand }) => {
  const pathname = usePathname();

  // If currently on tyn/shop -> switch to proathletic/shop
  const targetUrl = activeBrand === 'tyn'
    ? pathname.replace(/^\/tyn/, '/proathletic') || '/proathletic'
    : pathname.replace(/^\/proathletic/, '/tyn') || '/tyn';

  return (
    <div className="inline-flex items-center p-0.5 rounded-full border border-current/20 bg-black/10 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase">
      <Link
        href="/tyn"
        className={`px-3 py-1 rounded-full transition-all duration-300 ${
          activeBrand === 'tyn'
            ? 'bg-[#0D4352] text-[#F7F5F0] shadow-sm'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        TYN
      </Link>
      <Link
        href="/proathletic"
        className={`px-3 py-1 rounded-full transition-all duration-300 ${
          activeBrand === 'proathletic'
            ? 'bg-[#CCFF00] text-black shadow-sm font-black'
            : 'text-zinc-400 hover:text-white'
        }`}
      >
        PROATHLETIC
      </Link>
    </div>
  );
};
