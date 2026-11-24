# TYN × PROATHLETIC — Multi-Brand E-Commerce Platform

A production-quality multi-brand e-commerce application inspired by the **BOXRAW** luxury sportswear shopping experience, featuring two distinct fashion entities:

1. **TYN (ТЫН)**: Modern Kazakh Heritage × Contemporary Streetwear. Authentic *қазақ ою-өрнегі* (қошқар мүйіз, сыңар мүйіз, тұмар), 500 GSM loopback cotton fleece, deep steppe turquoise (`#0D4352`), gold accents (`#C49A45`), and warm sand tones (`#F7F5F0`).
2. **PROATHLETIC**: High-Performance Athletic Lab. Pitch black foundation (`#050505`), neon lime accents (`#CCFF00`), white contrast, and high-visibility athletic wear.

---

## Architecture & Brand Separation

- **Brand-Independent Stylesheets**:
  - `styles/tyn/tyn.css`
  - `styles/proathletic/proathletic.css`
  - `styles/shared/globals.css`
- **Brand Layouts & Header/Footers**:
  - `components/tyn/TynHeader.tsx`, `components/tyn/TynFooter.tsx`
  - `components/proathletic/ProHeader.tsx`, `components/proathletic/ProFooter.tsx`
- **Kazakh Design System**:
  - `components/tyn/KazakhOrnament.tsx`: Reusable SVG vector ornaments (`KoshkarMuyiz`, `KazakhDivider`, `KazakhCornerOrnament`).
- **Cart Persistence Across Brands**:
  - Global `CartProvider` (`lib/context/CartContext.tsx`) ensures seamless switching between TYN and PROATHLETIC without losing items.
  - Interactive sliding `CartDrawer` with dynamic Free Shipping progress meter (threshold: 35 000 ₸).
- **Universal Multi-Step Checkout**:
  - `app/checkout/page.tsx`: Full customer details, Kazakhstan address fields (Almaty, Astana, Shymkent, Karaganda, etc.), Courier options, Kaspi Pay / 3D-Secure Card / COD, order generation, and animated receipt.
- **Full Admin CMS**:
  - `app/admin/`: Operational metrics, Product CRUD with variant inventory, Collection drops, Customer order fulfillment with tracking code assignment, Hero/Campaign banner management, and Store logistics settings.
- **Supabase Relational Database**:
  - `supabase/migrations/20260101_init.sql`: 16 relational entities, foreign keys, constraints, and Row Level Security (RLS) policies.

---

## Routes Overview

| Route | Brand / Feature | Description |
|---|---|---|
| `/` | Landing Portal | Editorial split-screen brand selector (TYN vs PROATHLETIC) |
| `/tyn` | TYN | Kazakh streetwear homepage (Hero, Philosophy, Drops, New Arrivals, Bestsellers) |
| `/tyn/shop` | TYN | Catalog with category filters, sorting, and quick add |
| `/tyn/collections/[slug]` | TYN | Capsule collections (e.g., Steppe Horizon, Nomadic Essentials, Altay Gold) |
| `/tyn/products/[slug]` | TYN | PDP with multi-image gallery, interactive color/size picker, stock counter, and size guide |
| `/tyn/about` | TYN | Kazakh heritage and nomadic textile philosophy |
| `/tyn/contact` | TYN | Almaty (Dostyk 180) & Astana showrooms, atelier contact form |
| `/proathletic` | PROATHLETIC | High-torque athletic performance homepage |
| `/proathletic/shop` | PROATHLETIC | Performance apparel catalog with filters and technical sorting |
| `/proathletic/collections/[slug]` | PROATHLETIC | Performance divisions (Pro-Series Zero, Neon Impact, Iron Lab) |
| `/proathletic/products/[slug]` | PROATHLETIC | PDP with graduated compression specs, fit guide, and rapid add |
| `/proathletic/about` | PROATHLETIC | Biomechanics, fabric lab, and lifetime seam guarantee |
| `/proathletic/contact` | PROATHLETIC | Distribution HQ & athlete sponsorship roster inquiries |
| `/cart` | Shared | Full shopping bag with item management and free shipping calculator |
| `/checkout` | Shared | Multi-step checkout, Kazakhstan address validation, order placement |
| `/search` | Shared | Universal catalog search with brand filtering |
| `/admin` | Admin CMS | Key performance indicators and operational dashboard |
| `/admin/products` | Admin CMS | Create, edit, delete, pricing, image previews, and stock per variant |
| `/admin/collections` | Admin CMS | Drop and collection management |
| `/admin/orders` | Admin CMS | Status fulfillment updates (shipped, delivered) and tracking assignment |
| `/admin/banners` | Admin CMS | Hero and promotional marketing campaigns |
| `/admin/settings` | Admin CMS | Nationwide shipping thresholds and support hotlines |
| `/faq`, `/shipping`, `/returns` | Shared | Client service and delivery policies |

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to browse the portal.

### 3. Production Build
```bash
npm run build
npm start
```

### 4. Supabase Setup (Optional for Live Cloud Sync)
Create a project at [supabase.com](https://supabase.com), copy the contents of `supabase/migrations/20260101_init.sql` into the SQL Editor, and add your API keys to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
