'use client';

import React, { useState, useEffect } from 'react';
import { Collection, BrandId } from '@/types/ecommerce';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from '@/lib/data/store';
import { Layers, Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<Collection | null>(null);

  const [formData, setFormData] = useState({
    brandSlug: 'tyn' as BrandId,
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    heroImageUrl: '',
    badge: 'NEW CAPSULE',
    isFeatured: true,
  });

  const loadData = async () => {
    const data = await getCollections();
    setCollections(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingCol(null);
    setFormData({
      brandSlug: 'tyn',
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      heroImageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
      badge: 'NEW CAPSULE',
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (col: Collection) => {
    setEditingCol(col);
    setFormData({
      brandSlug: col.brandSlug,
      title: col.title,
      slug: col.slug,
      subtitle: col.subtitle || '',
      description: col.description || '',
      heroImageUrl: col.heroImageUrl,
      badge: col.badge || '',
      isFeatured: col.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this collection?')) {
      await deleteCollection(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCol) {
      await updateCollection(editingCol.id, {
        brandSlug: formData.brandSlug,
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        subtitle: formData.subtitle,
        description: formData.description,
        heroImageUrl: formData.heroImageUrl,
        badge: formData.badge,
        isFeatured: formData.isFeatured,
      });
    } else {
      await createCollection({
        brandSlug: formData.brandSlug,
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        subtitle: formData.subtitle,
        description: formData.description,
        heroImageUrl: formData.heroImageUrl,
        badge: formData.badge,
        isFeatured: formData.isFeatured,
        displayOrder: collections.length + 1,
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
            Collection & Drop Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Curate seasonal drops, capsule campaigns, and editorial lookbooks.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#C49A45] hover:bg-[#E0C078] text-black text-xs font-black uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/9] w-full bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={col.heroImageUrl}
                alt={col.title}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                  col.brandSlug === 'tyn'
                    ? 'bg-[#0D4352] text-[#F7F5F0]'
                    : 'bg-black text-[#CCFF00]'
                }`}
              >
                {col.brandSlug.toUpperCase()}
              </span>
              {col.badge && (
                <span className="absolute top-3 right-3 bg-[#C49A45] text-black text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {col.badge}
                </span>
              )}
            </div>

            <div className="p-4 space-y-2 flex-1">
              <p className="text-[10px] text-zinc-500 font-mono">slug: {col.slug}</p>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</h3>
              <p className="text-xs text-zinc-400 line-clamp-2">{col.description}</p>
            </div>

            <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <a
                href={`/${col.brandSlug}/collections/${col.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#C49A45] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                View on Store <ExternalLink className="w-3 h-3" />
              </a>

              <div className="space-x-2">
                <button
                  onClick={() => handleOpenEdit(col)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(col.id)}
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
                {editingCol ? 'Edit Collection' : 'Create Collection'}
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
                <label className="block text-zinc-400 mb-1 font-bold">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STEPPE HORIZON"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Дала Көкжиегі — Drop 01"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Hero Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.heroImageUrl}
                  onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-bold">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
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
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
