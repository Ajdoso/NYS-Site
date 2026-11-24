'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  brand: 'tyn' | 'proathletic';
}> = ({ isOpen, onClose, brand }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`w-full max-w-xl p-6 rounded-sm shadow-2xl relative ${
          brand === 'tyn' ? 'bg-[#F7F5F0] text-[#0D4352]' : 'bg-[#0F0F10] text-white border border-[#25272A]'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-zinc-700 transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 mb-4">
          <Ruler className={`w-5 h-5 ${brand === 'tyn' ? 'text-[#C49A45]' : 'text-[#CCFF00]'}`} />
          <h3 className="text-base font-bold tracking-widest uppercase">
            {brand === 'tyn' ? 'TYN Streetwear Sizing Guide' : 'PROATHLETIC Compression & Fit Guide'}
          </h3>
        </div>

        <p className="text-xs text-zinc-500 mb-6">
          {brand === 'tyn'
            ? 'All TYN pieces are engineered with an oversized, relaxed modern drop-shoulder fit. If you prefer a tailored fit, choose one size down.'
            : 'PROATHLETIC compression tops and shorts provide a firm muscle-support feel. If between sizes, size up for high comfort or size down for max compression.'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${brand === 'tyn' ? 'border-[#0D4352]/20' : 'border-[#25272A]'}`}>
                <th className="py-2.5 px-3 font-bold">Size</th>
                <th className="py-2.5 px-3 font-bold">Chest (cm)</th>
                <th className="py-2.5 px-3 font-bold">Waist (cm)</th>
                <th className="py-2.5 px-3 font-bold">Hips (cm)</th>
                <th className="py-2.5 px-3 font-bold">Height (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/50">
              <tr>
                <td className="py-2.5 px-3 font-bold">S</td>
                <td className="py-2.5 px-3 text-zinc-500">92 - 96</td>
                <td className="py-2.5 px-3 text-zinc-500">76 - 80</td>
                <td className="py-2.5 px-3 text-zinc-500">90 - 94</td>
                <td className="py-2.5 px-3 text-zinc-500">165 - 175</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">M</td>
                <td className="py-2.5 px-3 text-zinc-500">98 - 104</td>
                <td className="py-2.5 px-3 text-zinc-500">82 - 88</td>
                <td className="py-2.5 px-3 text-zinc-500">96 - 102</td>
                <td className="py-2.5 px-3 text-zinc-500">172 - 182</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">L</td>
                <td className="py-2.5 px-3 text-zinc-500">106 - 112</td>
                <td className="py-2.5 px-3 text-zinc-500">90 - 96</td>
                <td className="py-2.5 px-3 text-zinc-500">104 - 110</td>
                <td className="py-2.5 px-3 text-zinc-500">178 - 188</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">XL</td>
                <td className="py-2.5 px-3 text-zinc-500">114 - 120</td>
                <td className="py-2.5 px-3 text-zinc-500">98 - 106</td>
                <td className="py-2.5 px-3 text-zinc-500">112 - 118</td>
                <td className="py-2.5 px-3 text-zinc-500">182 - 195</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">XXL</td>
                <td className="py-2.5 px-3 text-zinc-500">122 - 130</td>
                <td className="py-2.5 px-3 text-zinc-500">108 - 116</td>
                <td className="py-2.5 px-3 text-zinc-500">120 - 126</td>
                <td className="py-2.5 px-3 text-zinc-500">185+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200/40 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Need custom tailoring assistance?</span>
          <span className="font-semibold text-zinc-600">WhatsApp: +7 (701) 555-0192</span>
        </div>
      </div>
    </div>
  );
};
