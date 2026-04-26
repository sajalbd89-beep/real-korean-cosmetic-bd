'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../../lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: '', category: '', sort: 'newest' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [prods, cats] = await Promise.all([getProducts(filters), getCategories()]);
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }
    loadData();
  }, [filters]);

  const updateFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="logo">RKCBD</Link>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/">Home</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
      </nav>
      <div className="section">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Shop All Products</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
            <aside style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius)', height: 'fit-content', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Filters</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                >
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Sort By</label>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '8px' }}
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </aside>
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                  <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No products found. Connect Supabase or add demo products in admin.</p>
                </div>
              ) : (
                <div className="product-grid">
                  {products.map(p => (
                    <div key={p.id} className="product-card">
                      <img src={p.image_url || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'} alt={p.name} />
                      <div className="product-card-body">
                        {p.featured && <span className="badge">Featured</span>}
                        <h3>{p.name}</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{p.category}</p>
                        <div className="price">
                          ৳{p.price}
                          {p.compare_price > p.price && <span className="old-price">৳{p.compare_price}</span>}
                        </div>
                        <button
                          className="btn-primary"
                          style={{ width: '100%', marginTop: '1rem' }}
                          onClick={() => alert('Added to cart! (Cart functionality pending)')}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
