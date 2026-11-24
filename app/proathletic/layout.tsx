import React from 'react';
import { ProHeader } from '@/components/proathletic/ProHeader';
import { ProFooter } from '@/components/proathletic/ProFooter';

export const metadata = {
  title: 'PROATHLETIC — Precision Performance Apparel',
  description: 'Engineered for relentless training, extreme durability, and peak human performance. Compression tops, technical shorts, and heavy strength gear.',
};

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pro-theme min-h-screen flex flex-col bg-[#050505] text-white">
      <ProHeader />
      <main className="flex-1">{children}</main>
      <ProFooter />
    </div>
  );
}
