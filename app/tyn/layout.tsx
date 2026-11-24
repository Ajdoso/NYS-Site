import React from 'react';
import { TynHeader } from '@/components/tyn/TynHeader';
import { TynFooter } from '@/components/tyn/TynFooter';

export const metadata = {
  title: 'TYN — Kazakh Heritage × Modern Streetwear',
  description: 'Authentic Kazakh ornaments re-engineered for contemporary urban culture. Oversized heavyweight hoodies, bomber jackets, and nomadic streetwear in Almaty & Astana.',
};

export default function TynLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tyn-theme min-h-screen flex flex-col bg-[#F7F5F0] text-[#1E282D]">
      <TynHeader />
      <main className="flex-1">{children}</main>
      <TynFooter />
    </div>
  );
}
