'use client';

import React, { useState, useEffect } from 'react';
import { Banner, BrandId } from '@/types/ecommerce';
import {
  getAllBannersAdmin,
  createBanner,
  updateBanner,
  deleteBanner,
} from '@/lib/data/store';
import { Image as ImageIcon, Plus, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [formData, setFormData] = useState({
    brandSlug: 'tyn' as BrandId,
    title: '',
    subtitle: '',
    ctaText: '',
    ctaUrl: '',
    imageUrl: '',
    videoUrl: '',
    mediaType: 'image' as 'image' | 'video',
    position: 'hero' as Banner['position'],
    isActive: true,
  });

  const loadData = async () => {
    const data = await getAllBannersAdmin();
    setBanners(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      brandSlug: 'tyn',
      title: '',
      subtitle: '',
      ctaText: 'EXPLORE DROP',
      ctaUrl: '/tyn/shop',
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85',
      position: 'hero',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: Banner) => {
    setEditingBanner(b);
    setFormData({
      brandSlug: b.brandSlug,
      title: b.title,
      subtitle: b.subtitle || '',
      ctaText: b.ctaText || '',
      ctaUrl: b.ctaUrl || '',
      imageUrl: b.imageUrl,
      position: b.position,
      isActive: b.isActive,
    });
    setIsModalOpen(true);
  };

  const handleToggleActive = async (b: Banner) => {
    await updateBanner(b.id, { isActive: !b.isActive });
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this banner?')) {
      await deleteBanner(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBanner) {
      await updateBanner(editingBanner.id, {
        brandSlug: formData.brandSlug,
        title: formData.title,
        subtitle: formData.subtitle,
        ctaText: formData.ctaText,
        ctaUrl: formData.ctaUrl,
        imageUrl: formData.imageUrl,
        position: formData.position,
        isActive: formData.isActive,
      });
    } else {
      await createBanner({
        brandSlug: formData.brandSlug,
        title: formData.title,
        subtitle: formData.subtitle,
        ctaText: formData.ctaText,
        ctaUrl: formData.ctaUrl,
        imageUrl: formData.imageUrl,
        position: formData.position,
        displayOrder: banners.length + 1,
        isActive: formData.isActive,
      });
    }

    setIsModalOpen(false);
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">
            Homepage Hero & Campaign Banners
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Update marketing banners, promotional hero visuals and call-to-actions independently for TYN & PROATHLETIC.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#C49A45] hover:bg-[#E0C078] text-black text-xs font-black uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Campaign Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    b.brandSlug === 'tyn'
                      ? 'bg-[#0D4352] text-[#F7F5F0]'
                      : 'bg-black text-[#CCFF00]'
                  }`}
                >
                  {b.brandSlug.toUpperCase()}
                </span>
                <span className="bg-zinc-800 text-zinc-300 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {b.position}
                </span>
              </div>

              <div className="absolute bottom-3 inset-x-3 text-white">
                <h3 className="text-base font-black uppercase tracking-wider">{b.title}</h3>
                <p className="text-[11px] text-zinc-300 line-clamp-1">{b.subtitle}</p>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <button
                onClick={() => handleToggleActive(b)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  b.isActive
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {b.isActive ? (
                  <>
                    <Eye className="w-3 h-3" /> Live on Site
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3" /> Inactive
                  </>
                )}
              </button>

              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 p-6 rounded-sm shadow-2xl text-zinc-100 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold uppercase text-white">
                {editingBanner ? 'Edit Banner' : 'Create Banner'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Brand</label>
                <select
                  value={formData.brandSlug}
                  onChange={(e) => setFormData({ ...formData, brandSlug: e.target.value as any })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                >
                  <option value="tyn">TYN (Kazakh Streetwear)</option>
                  <option value="proathletic">PROATHLETIC (Performance)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                >
                  <option value="hero">Hero Main Showcase</option>
                  <option value="promo_mid">Mid-Page Editorial Campaign</option>
                  <option value="promo_bottom">Bottom Highlight Banner</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1 font-bold">CTA Target Link</label>
                  <input
                    type="text"
                    value={formData.ctaUrl}
                    onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 rounded-sm text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C49A45] hover:bg-[#E0C078] text-black font-black uppercase rounded-sm"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
