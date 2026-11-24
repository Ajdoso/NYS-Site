'use client';

import React, { useState, useEffect } from 'react';
import { StoreSettings } from '@/types/ecommerce';
import { getStoreSettings, updateStoreSettings } from '@/lib/data/store';
import { Settings, Save, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getStoreSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await updateStoreSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!settings) {
    return <div className="text-zinc-400 text-xs">Loading store settings...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-black uppercase tracking-wider text-white">
          Store & Logistics Settings
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure nationwide shipping thresholds, support hotlines, and announcement ribbons.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500 rounded-sm flex items-center space-x-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Configuration updated successfully and active across all storefronts.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Logistics & Currency */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
            Pricing & Kazakhstan Delivery Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                Free Shipping Threshold (₸)
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) =>
                  setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none focus:border-[#C49A45]"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                Cart bags above this amount receive automatic free courier delivery.
              </p>
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                Standard Shipping Fee (₸)
              </label>
              <input
                type="number"
                value={settings.defaultShippingFee}
                onChange={(e) =>
                  setSettings({ ...settings, defaultShippingFee: Number(e.target.value) })
                }
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none focus:border-[#C49A45]"
              />
              <p className="text-[10px] text-zinc-500 mt-1">
                Applied to domestic deliveries below the free shipping threshold.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Hotlines */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
            Customer Support & Social Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">Support Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none focus:border-[#C49A45]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">Support Hotline / WhatsApp</label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none focus:border-[#C49A45]"
              />
            </div>
          </div>
        </div>

        {/* Brand Announcements */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
            Storefront Announcement Ribbons
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                TYN Announcement Ribbon
              </label>
              <input
                type="text"
                value={settings.tynHeadline}
                onChange={(e) => setSettings({ ...settings, tynHeadline: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none focus:border-[#C49A45]"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase font-bold mb-1">
                PROATHLETIC Announcement Ribbon
              </label>
              <input
                type="text"
                value={settings.proHeadline}
                onChange={(e) => setSettings({ ...settings, proHeadline: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none focus:border-[#CCFF00]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#C49A45] hover:bg-[#E0C078] text-black font-black uppercase tracking-wider rounded-sm shadow-xl flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
}
