'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/types/ecommerce';
import { getOrders, updateOrderStatus } from '@/lib/data/store';
import { formatPrice } from '@/lib/utils/format';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  X,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const loadData = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    await updateOrderStatus(orderId, newStatus);
    loadData();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleUpdateTracking = async (orderId: string) => {
    if (!trackingInput.trim()) return;
    await updateOrderStatus(orderId, selectedOrder?.status || 'shipped', undefined, trackingInput.trim());
    loadData();
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, trackingNumber: trackingInput.trim() });
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-black uppercase tracking-wider text-white">
          Customer Order Fulfillment
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review placed orders, update delivery status, and assign courier tracking numbers.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-zinc-950 p-4 border border-zinc-800 rounded-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <span className="text-zinc-400 font-semibold uppercase">Status:</span>
          {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-sm uppercase font-bold whitespace-nowrap ${
                statusFilter === st ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order # or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 rounded-sm outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider bg-zinc-900/50">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                  <td className="py-3 px-4 text-zinc-400">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-white">{ord.customerName}</p>
                    <p className="text-[10px] text-zinc-500">{ord.customerPhone}</p>
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
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                      className="bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold uppercase text-white outline-none cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedOrder(ord);
                        setTrackingInput(ord.trackingNumber || '');
                      }}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-sm shadow-2xl text-zinc-100 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#C49A45] uppercase">
                  ORDER SPECIFICATION
                </span>
                <h2 className="text-xl font-mono font-bold uppercase text-white">
                  {selectedOrder.orderNumber}
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-900 rounded-sm text-xs">
              <div>
                <p className="font-bold text-zinc-400 uppercase tracking-wider mb-1">Customer</p>
                <p className="font-semibold text-white">{selectedOrder.customerName}</p>
                <p className="text-zinc-400">{selectedOrder.customerEmail}</p>
                <p className="text-zinc-400">{selectedOrder.customerPhone}</p>
              </div>

              <div>
                <p className="font-bold text-zinc-400 uppercase tracking-wider mb-1">Shipping Destination</p>
                <p className="font-semibold text-white">
                  {selectedOrder.shippingAddress.streetAddress}
                  {selectedOrder.shippingAddress.apartmentSuite && `, ${selectedOrder.shippingAddress.apartmentSuite}`}
                </p>
                <p className="text-zinc-400">
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}
                </p>
                <p className="text-zinc-400">{selectedOrder.shippingAddress.country}</p>
              </div>
            </div>

            {/* Tracking Code Updater */}
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-sm space-y-2 text-xs">
              <label className="block font-bold text-zinc-400 uppercase tracking-wider">
                Assigned Kazakhstan Courier Tracking Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. KZ-998812-EXPRESS"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-700 px-3 py-1.5 rounded-sm text-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => handleUpdateTracking(selectedOrder.id)}
                  className="px-4 py-1.5 bg-[#CCFF00] hover:bg-[#B8E600] text-black font-bold uppercase rounded-sm"
                >
                  Save Code
                </button>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-zinc-400 uppercase tracking-wider">
                Items In This Order ({selectedOrder.items.length})
              </h3>
              <div className="divide-y divide-zinc-800 max-h-56 overflow-y-auto">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{item.productName}</p>
                      <p className="text-[11px] text-zinc-400">
                        Brand: {item.brandSlug.toUpperCase()} • {item.variantDetails.color} • Size {item.variantDetails.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400">{item.quantity} × {formatPrice(item.unitPrice)}</p>
                      <p className="font-bold text-white">{formatPrice(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-zinc-800 pt-3 flex justify-between text-sm font-bold text-white">
              <span>Total Paid:</span>
              <span className="text-base text-[#C49A45]">{formatPrice(selectedOrder.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
