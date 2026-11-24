import {
  Brand,
  BrandId,
  Category,
  Collection,
  Product,
  Banner,
  StoreSettings,
  Order,
} from '@/types/ecommerce';
import {
  INITIAL_BRANDS,
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_BANNERS,
  INITIAL_SETTINGS,
} from './seed';
import { createClient } from '../supabase/client';

// In-memory runtime state that persists across client navigation
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryCollections: Collection[] = [...INITIAL_COLLECTIONS];
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryBanners: Banner[] = [...INITIAL_BANNERS];
let memorySettings: StoreSettings = { ...INITIAL_SETTINGS };
let memoryOrders: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ORD-2026-8942',
    customerName: 'Arman Zhumabayev',
    customerEmail: 'arman.kz@example.com',
    customerPhone: '+7 (701) 555-0192',
    shippingAddress: {
      recipientName: 'Arman Zhumabayev',
      phone: '+7 (701) 555-0192',
      email: 'arman.kz@example.com',
      streetAddress: 'Dostyk Ave 180, Apt 42',
      city: 'Almaty',
      postalCode: '050000',
      country: 'Kazakhstan',
    },
    subtotal: 76000,
    shippingFee: 0,
    discountAmount: 0,
    totalAmount: 76000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Kaspi Pay / Visa',
    trackingNumber: 'KZ-POST-991204',
    createdAt: '2026-01-20T14:32:00Z',
    items: [
      {
        id: 'item-1',
        orderId: 'ord-1001',
        productId: 'prod-tyn-1',
        brandSlug: 'tyn',
        productName: 'Koshkar-Muyiz Heavyweight Hoodie',
        variantDetails: { color: 'Steppe Turquoise', size: 'L', sku: 'TYN-KMH-TRQ-L' },
        unitPrice: 42000,
        quantity: 1,
        totalPrice: 42000,
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'item-2',
        orderId: 'ord-1001',
        productId: 'prod-pro-1',
        brandSlug: 'proathletic',
        productName: 'V-PRO Compression Long Sleeve Top',
        variantDetails: { color: 'Carbon Black / Lime', size: 'L', sku: 'PRO-VPC-BLK-L' },
        unitPrice: 34000,
        quantity: 1,
        totalPrice: 34000,
        imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

// Helper to check for Supabase
const getSupabase = () => {
  if (typeof window !== 'undefined') {
    return createClient();
  }
  return null;
};

// ==========================================
// STORE DATA API
// ==========================================

export async function getBrands(): Promise<Brand[]> {
  return INITIAL_BRANDS;
}

export async function getBrandBySlug(slug: BrandId): Promise<Brand | undefined> {
  return INITIAL_BRANDS.find((b) => b.slug === slug);
}

export async function getCategories(brandSlug?: BrandId): Promise<Category[]> {
  if (brandSlug) {
    return memoryCategories.filter((c) => c.brandSlug === brandSlug);
  }
  return memoryCategories;
}

export async function getCollections(brandSlug?: BrandId): Promise<Collection[]> {
  if (brandSlug) {
    return memoryCollections.filter((c) => c.brandSlug === brandSlug);
  }
  return memoryCollections;
}

export async function getCollectionBySlug(brandSlug: BrandId, slug: string): Promise<Collection | undefined> {
  return memoryCollections.find((c) => c.brandSlug === brandSlug && c.slug === slug);
}

export async function getProducts(options?: {
  brandSlug?: BrandId;
  categorySlug?: string;
  collectionSlug?: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  query?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'bestselling';
}): Promise<Product[]> {
  let list = [...memoryProducts].filter((p) => p.isPublished);

  if (options?.brandSlug) {
    list = list.filter((p) => p.brandSlug === options.brandSlug);
  }

  if (options?.categorySlug) {
    const category = memoryCategories.find((c) => c.slug === options.categorySlug);
    if (category) {
      list = list.filter((p) => p.categoryId === category.id);
    }
  }

  if (options?.collectionSlug) {
    list = list.filter((p) => p.collectionSlug === options.collectionSlug);
  }

  if (options?.featured) {
    list = list.filter((p) => p.isFeatured);
  }

  if (options?.bestseller) {
    list = list.filter((p) => p.isBestseller);
  }

  if (options?.newArrival) {
    list = list.filter((p) => p.isNewArrival);
  }

  if (options?.query) {
    const q = options.query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase().includes(q)
    );
  }

  if (options?.sortBy) {
    if (options.sortBy === 'price-asc') {
      list.sort((a, b) => (a.salePrice || a.regularPrice) - (b.salePrice || b.regularPrice));
    } else if (options.sortBy === 'price-desc') {
      list.sort((a, b) => (b.salePrice || b.regularPrice) - (a.salePrice || a.regularPrice));
    } else if (options.sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (options.sortBy === 'bestselling') {
      list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
  }

  return list;
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  return [...memoryProducts];
}

export async function getProductBySlug(brandSlug: BrandId, slug: string): Promise<Product | undefined> {
  return memoryProducts.find((p) => p.brandSlug === brandSlug && p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return memoryProducts.find((p) => p.id === id);
}

export async function getBanners(brandSlug?: BrandId, position?: Banner['position']): Promise<Banner[]> {
  let list = memoryBanners.filter((b) => b.isActive);
  if (brandSlug) {
    list = list.filter((b) => b.brandSlug === brandSlug);
  }
  if (position) {
    list = list.filter((b) => b.position === position);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getAllBannersAdmin(): Promise<Banner[]> {
  return [...memoryBanners];
}

export async function getStoreSettings(): Promise<StoreSettings> {
  return { ...memorySettings };
}

export async function updateStoreSettings(newSettings: Partial<StoreSettings>): Promise<StoreSettings> {
  memorySettings = { ...memorySettings, ...newSettings };
  return memorySettings;
}

// ==========================================
// ADMIN MUTATIONS
// ==========================================

export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  memoryProducts.unshift(newProduct);

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('products').insert({
        brand_id: product.brandSlug === 'tyn' ? 'b1-tyn' : 'b2-proathletic',
        name: product.name,
        slug: product.slug,
        short_description: product.shortDescription,
        description: product.description,
        regular_price: product.regularPrice,
        sale_price: product.salePrice,
        is_featured: product.isFeatured,
        is_bestseller: product.isBestseller,
        is_new_arrival: product.isNewArrival,
        is_published: product.isPublished,
      });
    } catch (err) {
      console.warn('Supabase product sync error (using local memory):', err);
    }
  }

  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
  const index = memoryProducts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  memoryProducts[index] = { ...memoryProducts[index], ...updates };
  return memoryProducts[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const initialLength = memoryProducts.length;
  memoryProducts = memoryProducts.filter((p) => p.id !== id);
  return memoryProducts.length < initialLength;
}

export async function createCollection(collection: Omit<Collection, 'id'>): Promise<Collection> {
  const newCol: Collection = {
    ...collection,
    id: `col-${Date.now()}`,
  };
  memoryCollections.push(newCol);
  return newCol;
}

export async function updateCollection(id: string, updates: Partial<Collection>): Promise<Collection | undefined> {
  const index = memoryCollections.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  memoryCollections[index] = { ...memoryCollections[index], ...updates };
  return memoryCollections[index];
}

export async function deleteCollection(id: string): Promise<boolean> {
  const initialLength = memoryCollections.length;
  memoryCollections = memoryCollections.filter((c) => c.id !== id);
  return memoryCollections.length < initialLength;
}

export async function createBanner(banner: Omit<Banner, 'id'>): Promise<Banner> {
  const newBanner: Banner = {
    ...banner,
    id: `ban-${Date.now()}`,
  };
  memoryBanners.push(newBanner);
  return newBanner;
}

export async function updateBanner(id: string, updates: Partial<Banner>): Promise<Banner | undefined> {
  const index = memoryBanners.findIndex((b) => b.id === id);
  if (index === -1) return undefined;
  memoryBanners[index] = { ...memoryBanners[index], ...updates };
  return memoryBanners[index];
}

export async function deleteBanner(id: string): Promise<boolean> {
  const initial = memoryBanners.length;
  memoryBanners = memoryBanners.filter((b) => b.id !== id);
  return memoryBanners.length < initial;
}

// ==========================================
// ORDERS & CHECKOUT
// ==========================================

export async function getOrders(): Promise<Order[]> {
  return [...memoryOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return memoryOrders.find((o) => o.id === id || o.orderNumber === id);
}

export async function createOrder(orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Promise<Order> {
  const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder: Order = {
    ...orderInput,
    id: `ord-${Date.now()}`,
    orderNumber,
    createdAt: new Date().toISOString(),
  };

  // Deduct inventory from products
  for (const item of newOrder.items) {
    const prod = memoryProducts.find((p) => p.id === item.productId);
    if (prod && prod.variants) {
      const variant = prod.variants.find(
        (v) =>
          v.colorName.toLowerCase() === item.variantDetails.color.toLowerCase() &&
          v.size.toLowerCase() === item.variantDetails.size.toLowerCase()
      );
      if (variant) {
        variant.stockQuantity = Math.max(0, variant.stockQuantity - item.quantity);
      }
    }
  }

  memoryOrders.unshift(newOrder);

  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('orders').insert({
        order_number: newOrder.orderNumber,
        customer_name: newOrder.customerName,
        customer_email: newOrder.customerEmail,
        customer_phone: newOrder.customerPhone,
        shipping_address: newOrder.shippingAddress,
        subtotal: newOrder.subtotal,
        shipping_fee: newOrder.shippingFee,
        discount_amount: newOrder.discountAmount,
        total_amount: newOrder.totalAmount,
        status: newOrder.status,
        payment_status: newOrder.paymentStatus,
        payment_method: newOrder.paymentMethod,
      });
    } catch (err) {
      console.warn('Supabase order insert (falling back to memory):', err);
    }
  }

  return newOrder;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  paymentStatus?: Order['paymentStatus'],
  trackingNumber?: string
): Promise<Order | undefined> {
  const order = memoryOrders.find((o) => o.id === orderId);
  if (!order) return undefined;

  order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;

  return order;
}

// ==========================================
// DASHBOARD METRICS
// ==========================================

export async function getAdminMetrics() {
  const totalOrders = memoryOrders.length;
  const totalRevenue = memoryOrders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.totalAmount : 0), 0);
  const totalProducts = memoryProducts.length;

  let lowStockCount = 0;
  for (const p of memoryProducts) {
    const totalStock = p.variants.reduce((sum, v) => sum + v.stockQuantity, 0);
    if (totalStock <= 15) {
      lowStockCount++;
    }
  }

  return {
    totalOrders,
    totalRevenue,
    totalProducts,
    lowStockCount,
    recentOrders: memoryOrders.slice(0, 5),
  };
}
