export type BrandId = 'tyn' | 'proathletic';

export interface Brand {
  id: string;
  slug: BrandId;
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  brandSlug: BrandId;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayMode?: 'image' | 'text';
  displayOrder: number;
}

export interface Collection {
  id: string;
  brandSlug: BrandId;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  heroImageUrl: string;
  isFeatured: boolean;
  displayOrder: number;
  badge?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  colorName: string;
  colorCode: string; // hex code
  size: string; // 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' or one-size
  priceOverride?: number;
  stockQuantity: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
  displayOrder: number;
  isPrimary: boolean;
  colorVariant?: string;
}

export interface Product {
  id: string;
  brandSlug: BrandId;
  categoryId: string;
  categoryName?: string;
  collectionSlug?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  features?: string[];
  materials?: string;
  careInstructions?: string;
  regularPrice: number; // in KZT (Kazakhstani Tenge)
  salePrice?: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isPublished: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  createdAt: string;
}

export interface CartItem {
  id: string; // composite key: variantId or productId + color + size
  productId: string;
  variantId?: string;
  brandSlug: BrandId;
  productName: string;
  productSlug: string;
  color: string;
  colorCode?: string;
  size: string;
  price: number;
  quantity: number;
  imageUrl: string;
  maxStock: number;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  email: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  regionState?: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  trackingNumber?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  brandSlug: BrandId;
  productName: string;
  variantDetails: {
    color: string;
    size: string;
    sku?: string;
  };
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface Banner {
  id: string;
  brandSlug: BrandId;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  position: 'hero' | 'promo_top' | 'promo_mid' | 'promo_bottom' | 'announcement' | 'partner';
  displayOrder: number;
  isActive: boolean;
}

export interface Partner {
  id: string;
  brandSlug: BrandId;
  name: string;
  role: string;
  imageUrl: string;
  videoUrl?: string;
  quote?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  currencySymbol: string;
  contactEmail: string;
  supportPhone: string;
  instagramHandle: string;
  telegramHandle: string;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  tynHeadline: string;
  proHeadline: string;
}
