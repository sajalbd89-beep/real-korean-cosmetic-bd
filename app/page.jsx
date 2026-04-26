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
          <Link href="/products">Menu</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/admin">Admin</Link>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero">
      <h1>Authentic Bangladeshi Restaurant</h1>
      <p>Experience the finest traditional Bangladeshi cuisine with fresh, halal ingredients. Order now and enjoy!</p>
      <Link href="/products"><button className="btn-primary" style={{ marginRight: '1rem' }}>Order Now</button></Link>
      <button className="btn-secondary">Try AI Menu Assistant</button>
    </div>
  );
}

function FeaturedProducts({ products, loading }) {
  return (
    <div className="section">
      <h2 className="text-center">Popular Menu Items</h2>
      <p>Best-selling Bangladeshi dishes loved by our customers</p>
      
      {loading ? (
        <div className="grid">Loading menu...</div>
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
        <Link href="/products"><button className="btn-primary">View Full Menu</button></Link>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="features">
      <div className="container">
        <div className="feature">
          <h3>🍛</h3>
          <h4>Authentic Recipes</h4>
          <p>Traditional Bangladeshi cooking methods</p>
        </div>
        <div className="feature">
          <h3>🥩</h3>
          <h4>Halal Certified</h4>
          <p>100% halal meat and ingredients</p>
        </div>
        <div className="feature">
          <h3>🚚</h3>
          <h4>Fast Delivery</h4>
          <p>Hot food delivered to your door</p>
        </div>
        <div className="feature">
          <h3>📞</h3>
          <h4>Easy Ordering</h4>
          <p>Call 01046841561 or order online</p>
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
            <h3>RKCBD Restaurant</h3>
            <p>Serving authentic Bangladeshi food in Dhaka since 2024. Halal certified.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link href="/products">Menu</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Phone: 01046841561</p>
            <p>Email: info@rkcbd.com</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>
        <p className="text-center" style={{ marginTop: '2rem' }}>© 2025 RKCBD Restaurant · All products are halal certified</p>
      </div>
    </footer>
  );
}
