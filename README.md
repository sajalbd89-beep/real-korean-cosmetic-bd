# Real Korean Cosmetic BD - E-Commerce Platform

## 🚀 Professional Korean Beauty E-Commerce Site

Full-stack Next.js e-commerce platform for selling authentic Korean cosmetics in Bangladesh. Features include product catalog, shopping cart, admin dashboard, AI skin analysis, and Supabase database integration.

## ✨ Features

### Storefront
- 🏠 Professional homepage with hero section
- 🛒 Product listing with search & filters (category, price sorting)
- 💳 Bangladesh payment methods (bKash, Nagad, Cash on Delivery)
- 🤖 AI-powered skin analysis (placeholder for future integration)
- 📱 Fully responsive design

### Admin Panel
- 📈 Dashboard with revenue & order stats
- 📦 Product management (CRUD operations)
- 📝 Order management with status updates
- 👥 Customer database
- ⚙️ Site settings (text, payment options)
- 🤖 AI configuration panel

### Technical
- ⚡ Next.js 14 App Router
- 💾 Supabase (PostgreSQL) database
- 🎨 Modern CSS with design system
- 🔒 Ready for production deployment

---

## 🛠️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/sajalbd89-beep/real-korean-cosmetic-bd.git
cd real-korean-cosmetic-bd
npm install
```

### 2. Create Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run this SQL:

```sql
-- Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Customers Table
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Settings Table
CREATE TABLE settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  hero_title TEXT,
  hero_subtitle TEXT,
  footer_text TEXT,
  whatsapp_number TEXT,
  payment_bkash BOOLEAN DEFAULT true,
  payment_nagad BOOLEAN DEFAULT true,
  payment_cod BOOLEAN DEFAULT true,
  ai_model TEXT,
  ai_api_key TEXT
);

-- Insert demo products
INSERT INTO products (name, description, category, price, compare_price, image_url, stock, featured) VALUES
('COSRX Snail Mucin Essence', 'Advanced snail secretion essence for hydration', 'Serum', 1850, 2100, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', 25, true),
('Innisfree Green Tea Toner', 'Fresh green tea toner from Jeju Island', 'Toner', 1450, NULL, 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', 30, true),
('Laneige Water Sleeping Mask', 'Overnight hydrating mask', 'Mask', 2200, 2600, 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400', 15, true),
('Etude House SoonJung pH Cleanser', 'Low pH gentle cleanser', 'Cleanser', 1350, NULL, 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400', 40, true);

-- Insert default settings
INSERT INTO settings (id, hero_title, hero_subtitle, footer_text, whatsapp_number) VALUES
(1, 'Authentic Korean Skincare', '100% genuine Korean skincare — directly sourced from certified Seoul distributors.', 'Bringing authentic Korean beauty to Bangladesh since 2024.', '01700-000000');
```

### 3. Configure Environment Variables

1. Go to **Settings > API** in your Supabase project
2. Copy **Project URL** and **anon public** key
3. Create `.env.local` file in project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

---

## 📚 Project Structure

```
real-korean-cosmetic-bd/
├── app/
│   ├── page.jsx              # Homepage
│   ├── layout.jsx            # Root layout with SEO
│   ├── globals.css           # Professional design system
│   ├── products/page.jsx     # Shop with filters
│   └── admin/                # Admin dashboard
├── lib/
│   └── supabase.js           # Database functions
├── package.json
├── next.config.js
└── README.md
```

---

## 🛡️ Admin Panel

Access at: `https://your-site.com/admin`

- 📈 Dashboard: `/admin`
- 📦 Products: `/admin/products`
- 📝 Orders: `/admin/orders`
- 👥 Customers: `/admin/customers`
- ⚙️ Settings: `/admin/settings`
- 🤖 AI: `/admin/ai`

---

## 🔧 Technologies Used

- **Framework**: Next.js 14
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS Modules with Design System
- **Deployment**: Vercel
- **Payment**: bKash, Nagad, COD (Bangladesh)

---

## 📝 To-Do / Future Enhancements

- [ ] Shopping cart with local storage
- [ ] Checkout flow with order creation
- [ ] Email notifications (SendGrid/Resend)
- [ ] Image upload to Supabase Storage
- [ ] OpenAI skin analysis integration
- [ ] Customer authentication
- [ ] Inventory management
- [ ] Order tracking page

---

## 💬 Support

For issues or questions, contact:
- **WhatsApp**: 01700-000000
- **Email**: info@rkcbd.com

---

## 📦 Version 2.0.0

**What's New:**
✅ Complete UI/UX redesign
✅ Supabase database integration
✅ Admin panel with full CRUD
✅ Product search & filtering
✅ Professional design system
✅ Mobile responsive
✅ Production-ready

---

© 2026 Real Korean Cosmetic BD. All rights reserved.
