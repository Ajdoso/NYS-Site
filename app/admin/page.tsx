import React from 'react';
import Link from 'next/link';
import { getAdminMetrics } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils/format';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default async function AdminDashboardOverviewPage() {
  const metrics = await getAdminMetrics();

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
            Operational Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time multi-brand performance metrics for TYN & PROATHLETIC.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products?action=new"
            className="px-4 py-2 bg-[#C49A45] hover:bg-[#E0C078] text-black text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            + New Product
          </Link>
          <Link
            href="/admin/banners"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
          >
            Campaigns
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            <span>Total Sales Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">{formatPrice(metrics.totalRevenue)}</p>
          <p className="text-[11px] text-emerald-400 font-semibold">+18.4% this month across Almaty & Astana</p>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            <span>Total Orders Placed</span>
            <ShoppingBag className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-white">{metrics.totalOrders}</p>
          <p className="text-[11px] text-zinc-400">Kaspi Pay, Visa & COD processed</p>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            <span>Active Catalog SKUs</span>
            <Package className="w-4 h-4 text-[#C49A45]" />
          </div>
          <p className="text-2xl font-black text-white">{metrics.totalProducts}</p>
          <p className="text-[11px] text-zinc-400">Distributed across TYN & PROATHLETIC</p>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 uppercase tracking-wider font-semibold">
            <span>Low Stock Variants</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{metrics.lowStockCount}</p>
          <p className="text-[11px] text-zinc-400">&lt;= 15 units remaining in warehouse</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Recent Customer Orders ({metrics.recentOrders.length})
          </h2>
          <Link
            href="/admin/orders"
            className="text-xs text-[#C49A45] hover:underline uppercase tracking-wider font-bold inline-flex items-center gap-1"
          >
            Manage All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {metrics.recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-white">{ord.customerName}</p>
                    <p className="text-[11px] text-zinc-400">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{ord.shippingAddress.city}</td>
                  <td className="py-3 px-4 font-bold text-white">{formatPrice(ord.totalAmount)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        ord.paymentStatus === 'paid'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Inspect
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
