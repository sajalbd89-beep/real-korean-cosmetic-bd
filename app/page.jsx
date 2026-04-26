'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../lib/supabase';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getFeaturedProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts products={products} loading={loading} />
      <Features />
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <Link href="/" className="logo">RKCBD</Link>
        <nav>
          <Link href="/products">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/admin">Admin</Link>
          <button className="btn-primary">AI Skin Analysis</button>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <h1>Authentic Korean Beauty</h1>
      <p>100% genuine K-beauty products sourced directly from Seoul. Transform your skincare routine with Korea's finest.</p>
      <Link href="/products"><button className="btn-primary" style={{ marginRight: '1rem' }}>Shop Now</button></Link>
      <button className="btn-secondary">Try AI Skin Doctor</button>
    </div>
  );
}

function FeaturedProducts({ products, loading }) {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Best-selling Korean cosmetics loved by our customers</p>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
        ) : products.length === 0 ? (
          <DemoProducts />
        ) : (
          <div className="product-grid">
            {products.map(p => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <div className="product-card">
                  <img src={p.image_url || '/placeholder.jpg'} alt={p.name} />
                  <div className="product-card-body">
                    {p.featured && <span className="badge">Featured</span>}
                    <h3>{p.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{p.category}</p>
                    <div className="price">
                      ৳{p.price}
                      {p.compare_price > p.price && <span className="old-price">৳{p.compare_price}</span>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products"><button className="btn-secondary">View All Products</button></Link>
        </div>
      </div>
    </div>
  );
}

function DemoProducts() {
  const demo = [
    { id: 1, name: 'COSRX Snail Mucin Essence', category: 'Serum', price: 1850, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
    { id: 2, name: 'Innisfree Green Tea Toner', category: 'Toner', price: 1450, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400' },
    { id: 3, name: 'Laneige Water Sleeping Mask', category: 'Mask', price: 2200, compare: 2600, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400' },
    { id: 4, name: 'Etude House SoonJung pH Cleanser', category: 'Cleanser', price: 1350, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400' },
  ];
  return (
    <div className="product-grid">
      {demo.map(p => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <div className="product-card-body">
            <span className="badge">Featured</span>
            <h3>{p.name}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{p.category}</p>
            <div className="price">৳{p.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Features() {
  return (
    <div className="section" style={{ background: 'var(--light-bg)' }}>
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>✓</div>
            <h3>100% Authentic</h3>
            <p>Directly sourced from certified Seoul distributors</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🚚</div>
            <h3>Fast Delivery</h3>
            <p>Delivery all over Bangladesh within 2-5 days</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>💳</div>
            <h3>Easy Payment</h3>
            <p>bKash, Nagad, Cash on Delivery accepted</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem' }}>🤖</div>
            <h3>AI Skin Doctor</h3>
            <p>Free AI-powered skin analysis & recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h4>Real Korean Cosmetic BD</h4>
            <p>Bringing authentic Korean beauty to Bangladesh since 2024.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p><Link href="/products">Shop</Link></p>
            <p><Link href="/admin">Admin</Link></p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>WhatsApp: 01700-000000</p>
            <p>Email: info@rkcbd.com</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '1rem', textAlign: 'center' }}>
          <p>© 2026 Real Korean Cosmetic BD. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
