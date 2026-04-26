'use client';
import Link from 'next/link';
import { useState } from 'react';

// Demo Korean cosmetic products
const demoProducts = [
  { id: 1, name: 'COSRX Snail Mucin Essence', description: 'Hydrating essence with 96% snail mucin', price: 1850, image_url: 'https://placehold.co/300x300?text=COSRX+Snail' },
  { id: 2, name: 'Laneige Water Sleeping Mask', description: 'Overnight hydration mask', price: 2200, image_url: 'https://placehold.co/300x300?text=Laneige+Mask' },
  { id: 3, name: 'Innisfree Green Tea Serum', description: 'Antioxidant-rich hydrating serum', price: 1650, image_url: 'https://placehold.co/300x300?text=Innisfree+Serum' },
  { id: 4, name: 'Some By Mi AHA BHA PHA Toner', description: 'Exfoliating miracle toner', price: 1950, image_url: 'https://placehold.co/300x300?text=Some+By+Mi' },
  { id: 5, name: 'Etude House SoonJung Toner', description: 'pH 5.5 relief toner for sensitive skin', price: 1350, image_url: 'https://placehold.co/300x300?text=SoonJung' },
  { id: 6, name: 'Missha Time Revolution Essence', description: 'First treatment essence', price: 2400, image_url: 'https://placehold.co/300x300?text=Missha+Essence' },
  { id: 7, name: 'Dr. Jart+ Cicapair Cream', description: 'Centella calming cream', price: 2800, image_url: 'https://placehold.co/300x300?text=Dr+Jart' },
  { id: 8, name: 'Klairs Vitamin C Serum', description: 'Brightening vitamin C serum', price: 1750, image_url: 'https://placehold.co/300x300?text=Klairs+Vit+C' },
];

export default function HomePage() {
  const [products] = useState(demoProducts);

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts products={products} />
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

function FeaturedProducts({ products }) {
  return (
    <div className="section">
      <h2 className="text-center">Best-selling Korean cosmetics</h2>
      <p className="text-center">Loved by our customers</p>
      
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image_url} alt={product.name} style={{width: '100%', borderRadius: '8px'}} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">৳{product.price}</p>
            <button className="btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>
      
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
