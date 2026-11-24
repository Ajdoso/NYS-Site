'use client';

import React, { useState, useEffect } from 'react';
import { Product, BrandId, Category, Collection } from '@/types/ecommerce';
import {
  getAllProductsAdmin,
  getCategories,
  getCollections,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/data/store';
import { formatPrice } from '@/lib/utils/format';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Upload,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState<'all' | BrandId>('all');

  // Modal State (Create / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    brandSlug: 'tyn' as BrandId,
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    regularPrice: 35000,
    salePrice: 0,
    categoryId: '',
    collectionSlug: '',
    imageUrl1: '',
    imageUrl2: '',
    colorsString: 'Steppe Turquoise:#0D4352, Warm Sand:#EDE7DC',
    sizesString: 'S, M, L, XL',
    stockQuantity: 25,
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    isPublished: true,
  });

  const loadData = async () => {
    setLoading(true);
    const [p, c, col] = await Promise.all([
      getAllProductsAdmin(),
      getCategories(),
      getCollections(),
    ]);
    setProducts(p);
    setCategories(c);
    setCollections(col);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      brandSlug: 'tyn',
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      regularPrice: 38000,
      salePrice: 0,
      categoryId: categories.find((c) => c.brandSlug === 'tyn')?.id || '',
      collectionSlug: 'steppe-horizon',
      imageUrl1: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      imageUrl2: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      colorsString: 'Steppe Turquoise:#0D4352, Warm Sand:#EDE7DC',
      sizesString: 'S, M, L, XL',
      stockQuantity: 20,
      isFeatured: true,
      isBestseller: false,
      isNewArrival: true,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      brandSlug: product.brandSlug,
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription,
      description: product.description,
      regularPrice: product.regularPrice,
      salePrice: product.salePrice || 0,
      categoryId: product.categoryId,
      collectionSlug: product.collectionSlug || '',
      imageUrl1: product.images[0]?.imageUrl || '',
      imageUrl2: product.images[1]?.imageUrl || '',
      colorsString: product.colors.map((c) => `${c.name}:${c.hex}`).join(', '),
      sizesString: product.sizes.join(', '),
      stockQuantity: product.variants[0]?.stockQuantity || 15,
      isFeatured: product.isFeatured,
      isBestseller: product.isBestseller,
      isNewArrival: product.isNewArrival,
      isPublished: product.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this product?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  const handleTogglePublish = async (product: Product) => {
    await updateProduct(product.id, { isPublished: !product.isPublished });
    loadData();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse colors
    const colors = formData.colorsString
      .split(',')
      .map((c) => {
        const [name, hex] = c.split(':').map((s) => s.trim());
        return { name: name || 'Standard', hex: hex || '#000000' };
      })
      .filter((c) => c.name);

    // Parse sizes
    const sizes = formData.sizesString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Generate variants
    const variants = [];
    for (const color of colors) {
      for (const size of sizes) {
        variants.push({
          id: `v-${Date.now()}-${color.name}-${size}`,
          productId: editingProduct?.id || '',
          sku: `${formData.brandSlug.toUpperCase()}-${formData.slug.substring(0, 3).toUpperCase()}-${color.name.substring(0, 3).toUpperCase()}-${size}`,
          colorName: color.name,
          colorCode: color.hex,
          size,
          stockQuantity: formData.stockQuantity,
        });
      }
    }

    const images = [
      {
        id: `img-1-${Date.now()}`,
        productId: editingProduct?.id || '',
        imageUrl: formData.imageUrl1,
        displayOrder: 1,
        isPrimary: true,
      },
    ];
    if (formData.imageUrl2) {
      images.push({
        id: `img-2-${Date.now()}`,
        productId: editingProduct?.id || '',
        imageUrl: formData.imageUrl2,
        displayOrder: 2,
        isPrimary: false,
      });
    }

    if (editingProduct) {
      // Update
      await updateProduct(editingProduct.id, {
        brandSlug: formData.brandSlug,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        shortDescription: formData.shortDescription,
        description: formData.description,
        regularPrice: Number(formData.regularPrice),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        categoryId: formData.categoryId,
        collectionSlug: formData.collectionSlug,
        colors,
        sizes,
        images,
        variants,
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isNewArrival: formData.isNewArrival,
        isPublished: formData.isPublished,
      });
    } else {
      // Create
      await createProduct({
        brandSlug: formData.brandSlug,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        shortDescription: formData.shortDescription,
        description: formData.description,
        regularPrice: Number(formData.regularPrice),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        categoryId: formData.categoryId,
        collectionSlug: formData.collectionSlug,
        colors,
        sizes,
        images,
        variants,
        isFeatured: formData.isFeatured,
        isBestseller: formData.isBestseller,
        isNewArrival: formData.isNewArrival,
        isPublished: formData.isPublished,
      });
    }

    setIsModalOpen(false);
    loadData();
  };

  const filteredProducts = products.filter((p) => {
    if (brandFilter !== 'all' && p.brandSlug !== brandFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">
            Product Catalog Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create, edit, price, and manage variant inventories for TYN and PROATHLETIC.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#C49A45] hover:bg-[#E0C078] text-black text-xs font-black uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add New Garment
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-zinc-950 p-4 border border-zinc-800 rounded-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Filter Brand:</span>
          <button
            onClick={() => setBrandFilter('all')}
            className={`px-3 py-1 text-xs font-bold rounded-sm uppercase ${
              brandFilter === 'all' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Brands
          </button>
          <button
            onClick={() => setBrandFilter('tyn')}
            className={`px-3 py-1 text-xs font-bold rounded-sm uppercase ${
              brandFilter === 'tyn' ? 'bg-[#0D4352] text-[#F7F5F0]' : 'text-zinc-400 hover:text-white'
            }`}
          >
            TYN
          </button>
          <button
            onClick={() => setBrandFilter('proathletic')}
            className={`px-3 py-1 text-xs font-bold rounded-sm uppercase ${
              brandFilter === 'proathletic' ? 'bg-[#CCFF00] text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            PROATHLETIC
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 rounded-sm outline-none focus:border-zinc-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 uppercase tracking-wider bg-zinc-900/50">
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Regular Price</th>
                <th className="py-3 px-4">Sale Price</th>
                <th className="py-3 px-4">Sizes & Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              {filteredProducts.map((p) => {
                const totalStock = p.variants.reduce((acc, v) => acc + v.stockQuantity, 0);

                return (
                  <tr key={p.id} className="hover:bg-zinc-900/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-zinc-800 rounded-sm overflow-hidden shrink-0 border border-zinc-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.images[0]?.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">slug: {p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          p.brandSlug === 'tyn'
                            ? 'bg-[#0D4352] text-[#F7F5F0]'
                            : 'bg-black text-[#CCFF00] border border-[#CCFF00]/40'
                        }`}
                      >
                        {p.brandSlug.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-white">
                      {formatPrice(p.regularPrice)}
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      {p.salePrice ? (
                        <span className="text-emerald-400 font-bold">{formatPrice(p.salePrice)}</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{totalStock} units</p>
                      <p className="text-[10px] text-zinc-500">{p.sizes.join(', ')}</p>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          p.isPublished
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {p.isPublished ? (
                          <>
                            <Eye className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 rounded transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl my-8 bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-sm shadow-2xl text-zinc-100 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-black uppercase tracking-wider text-white">
                {editingProduct ? 'Edit Garment' : 'Create New Garment'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Target Brand *</label>
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
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Koshkar-Muyiz Heavy Hoodie"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Regular Price (₸) *</label>
                  <input
                    type="number"
                    required
                    value={formData.regularPrice}
                    onChange={(e) => setFormData({ ...formData, regularPrice: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Sale Price (₸) (Optional)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  placeholder="500 GSM loopback fleece with embroidered Kazakh horn ornament..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase font-bold mb-1">Full Description & Heritage Story *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Primary Image URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.imageUrl1}
                    onChange={(e) => setFormData({ ...formData, imageUrl1: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Secondary Hover Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.imageUrl2}
                    onChange={(e) => setFormData({ ...formData, imageUrl2: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Available Sizes (comma sep)</label>
                  <input
                    type="text"
                    value={formData.sizesString}
                    onChange={(e) => setFormData({ ...formData, sizesString: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Stock Per Variant</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase font-bold mb-1">Collection</label>
                  <select
                    value={formData.collectionSlug}
                    onChange={(e) => setFormData({ ...formData, collectionSlug: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-sm text-white outline-none"
                  >
                    <option value="">None / Standard</option>
                    {collections
                      .filter((c) => c.brandSlug === formData.brandSlug)
                      .map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-3 border-t border-zinc-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                  <span>Active & Published</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-zinc-700 hover:bg-zinc-800 text-white rounded-sm font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#C49A45] hover:bg-[#E0C078] text-black font-black uppercase rounded-sm shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
