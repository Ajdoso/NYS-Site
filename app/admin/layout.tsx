import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const metadata = {
  title: 'Admin Control Center | TYN × PROATHLETIC',
  description: 'Manage storefronts, product catalogs, variant inventory, customer orders and campaigns for TYN and PROATHLETIC.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Top Brand Tag */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-black tracking-widest text-[#C49A45] font-serif">TYN</span>
                <span className="text-zinc-500 font-bold">×</span>
                <span className="text-sm font-black tracking-wider text-[#CCFF00]">PRO</span>
              </div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">
                Admin Control Room
              </p>
            </div>
            <span className="p-1 rounded bg-emerald-950 text-emerald-400 text-[9px] font-bold uppercase tracking-wider border border-emerald-800">
              Live
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-zinc-400" />
              <span>Overview & Analytics</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <Package className="w-4 h-4 text-[#C49A45]" />
              <span>Products & Inventory</span>
            </Link>

            <Link
              href="/admin/collections"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <Layers className="w-4 h-4 text-[#CCFF00]" />
              <span>Collections & Drops</span>
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Categories & Media</span>
            </Link>

            <Link
              href="/admin/partners"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Athletes & Champions</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>Customer Orders</span>
            </Link>

            <Link
              href="/admin/banners"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-sky-400" />
              <span>Hero & Campaigns</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              <span>Store Settings</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Storefront Links */}
        <div className="p-4 border-t border-zinc-800 space-y-2 text-xs">
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
            Quick Storefront Jump
          </p>
          <div className="flex gap-2">
            <Link
              href="/tyn"
              target="_blank"
              className="flex-1 px-2.5 py-1.5 bg-[#0D4352] hover:bg-[#165B6E] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-1"
            >
              TYN <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="/proathletic"
              target="_blank"
              className="flex-1 px-2.5 py-1.5 bg-black hover:bg-zinc-800 border border-[#CCFF00]/40 text-[#CCFF00] text-[10px] font-bold uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-1"
            >
              PRO <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-zinc-900">
        {children}
      </main>
    </div>
  );
}
