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
        <Link href="/" className="logo">K-BEAUTY BD</Link>
        <nav>
          <Link href="/products">Products</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/cart">Cart (0)</Link>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <h1>Authentic Korean Cosmetics</h1>
      <p>100% genuine K-beauty products sourced directly from Seoul. Transform your skincare routine with Korea's best brands.</p>
      <Link href="/products"><button className="btn-primary" style={{ marginRight: '1rem' }}>Shop Now</button></Link>
      <button className="btn-secondary">Try AI Skin Doctor</button>
    </div>
  );
}

function FeaturedProducts({ products, loading }) {
  return (
    <div className="section">
      <h2 className="text-center">Best-selling Korean cosmetics</h2>
      <p>Loved by our customers</p>
      
      {loading ? (
        <div className="grid">Loading products...</div>
      ) : (
        <div className="grid">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="card">
              <img src={product.image_url || '/placeholder.jpg'} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">৳{product.price}</p>
              <button className="btn-primary">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center" style={{ marginTop: '2rem' }}>
        <Link href="/products"><button className="btn-primary">View All Products</button></Link>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="features">
      <div className="container">
        <div className="feature">
          <h3>🚚</h3>
          <h4>Direct from Seoul</h4>
          <p>100% authentic K-beauty products</p>
        </div>
        <div className="feature">
          <h3>✅</h3>
          <h4>KFDA Certified</h4>
          <p>All products are officially certified</p>
        </div>
        <div className="feature">
          <h3>🎉</h3>
          <h4>Same-day dispatch</h4>
          <p>Fast delivery across Bangladesh</p>
        </div>
        <div className="feature">
          <h3>🔒</h3>
          <h4>Secure payment</h4>
          <p>bKash / Nagad / COD supported</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Korean Cosmetics BD</h3>
            <p>Authentic Korean skincare & cosmetics in Bangladesh. Direct from Seoul.</p>
          </div>
          <div className="footer-section">
            <h4>Brands</h4>
            <Link href="/brands/cosrx">COSRX</Link>
            <Link href="/brands/laneige">Laneige</Link>
            <Link href="/brands/innisfree">Innisfree</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Phone: +880 1234567890</p>
            <p>Email: info@kbeauty-bd.com</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>
        <p className="text-center" style={{ marginTop: '2rem' }}>© 2025 Korean Cosmetics BD · All products sourced directly from Seoul, South Korea</p>
      </div>
    </footer>
  );
}
