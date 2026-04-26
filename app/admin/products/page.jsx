'use client';
import { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'COSRX Snail Mucin 96% Power Repairing Essence', brand: 'COSRX', category: 'Serum', price: 1850, stock: 23, status: 'Active', emoji: '🦌' },
  { id: 2, name: 'Some By Mi AHA BHA PHA 30 Days Miracle Toner', brand: 'Some By Mi', category: 'Toner', price: 2200, stock: 15, status: 'Active', emoji: '✨' },
  { id: 3, name: 'Laneige Water Bank Moisture Cream', brand: 'Laneige', category: 'Moisturizer', price: 3500, stock: 8, status: 'Low Stock', emoji: '💧' },
  { id: 4, name: 'Dr.Jart+ Cicapair Tiger Grass Cream', brand: 'Dr.Jart+', category: 'Moisturizer', price: 3400, stock: 31, status: 'Active', emoji: '🐅' },
  { id: 5, name: 'Innisfree Green Tea Seed Serum', brand: 'Innisfree', category: 'Serum', price: 1200, stock: 0, status: 'Out of Stock', emoji: '🍚' },
  { id: 6, name: 'Missha Time Revolution Night Repair', brand: 'Missha', category: 'Ampoule', price: 2800, stock: 19, status: 'Active', emoji: '🌙' },
];

const statusBadge = { Active: 'badge-success', 'Low Stock': 'badge-warning', 'Out of Stock': 'badge-danger' };

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', brand: '', category: 'Serum', price: '', stock: '', description: '', emoji: '🌸' });
  const [editing, setEditing] = useState(null);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      setProducts(products.map(p => p.id === editing ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock), status: Number(form.stock) === 0 ? 'Out of Stock' : Number(form.stock) < 10 ? 'Low Stock' : 'Active' } : p));
      setEditing(null);
    } else {
      const newProduct = { ...form, id: Date.now(), price: Number(form.price), stock: Number(form.stock), status: Number(form.stock) === 0 ? 'Out of Stock' : Number(form.stock) < 10 ? 'Low Stock' : 'Active' };
      setProducts([newProduct, ...products]);
    }
    setForm({ name: '', brand: '', category: 'Serum', price: '', stock: '', description: '', emoji: '🌸' });
    setShowForm(false);
  };

  const handleEdit = (p) => { setForm({ name: p.name, brand: p.brand, category: p.category, price: p.price, stock: p.stock, description: p.description || '', emoji: p.emoji }); setEditing(p.id); setShowForm(true); };
  const handleDelete = (id) => { if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id)); };

  return (
    <div>
      <div className="admin-topbar">
        <h1>📦 Products</h1>
        <div className="topbar-actions">
          <div className="search-box">
            <span>🔍</span>
            <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', brand: '', category: 'Serum', price: '', stock: '', description: '', emoji: '🌸' }); }}>+ Add New Product</button>
        </div>
      </div>
      <div className="admin-content">
        {showForm && (
          <div className="card" style={{ marginBottom: 24 }}>
            <div className="card-header"><h3>{editing ? '✏️ Edit Product' : '➕ Add New Product'}</h3><button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button></div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group"><label>Product Name *</label><input className="form-control" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. COSRX Snail Mucin Essence" /></div>
                  <div className="form-group"><label>Brand *</label><input className="form-control" required value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} placeholder="e.g. COSRX" /></div>
                  <div className="form-group"><label>Category</label><select className="form-control" value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option>Serum</option><option>Toner</option><option>Moisturizer</option><option>Cleanser</option><option>Sunscreen</option><option>Mask</option><option>Ampoule</option><option>Eye Cream</option></select></div>
                  <div className="form-group"><label>Emoji Icon</label><input className="form-control" value={form.emoji} onChange={e => setForm({...form, emoji: e.target.value})} placeholder="🌸" /></div>
                  <div className="form-group"><label>Price (৳) *</label><input className="form-control" type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="e.g. 1850" /></div>
                  <div className="form-group"><label>Stock Quantity *</label><input className="form-control" type="number" required value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} placeholder="e.g. 50" /></div>
                </div>
                <div className="form-group"><label>Description</label><textarea className="form-control" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Product description..." /></div>
                <div className="upload-zone"><div className="upload-icon">📷</div><p>Click to upload product image</p><small style={{color:'#9ca3af'}}>PNG, JPG up to 5MB (Connect Supabase to enable)</small></div>
                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                  <button type="submit" className="btn btn-primary">{editing ? '✅ Update Product' : '➕ Add Product'}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="card">
          <div className="card-header">
            <h3>All Products ({filtered.length})</h3>
            <div style={{ fontSize: 13, color: '#888' }}>{products.filter(p=>p.status==='Low Stock').length} low stock &bull; {products.filter(p=>p.status==='Out of Stock').length} out of stock</div>
          </div>
          <table>
            <thead><tr><th>Product</th><th>Brand</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="product-thumb">{p.emoji}</div><span style={{ fontWeight: 500 }}>{p.name}</span></div></td>
                  <td style={{ color: '#6b7280' }}>{p.brand}</td>
                  <td><span className="badge badge-info">{p.category}</span></td>
                  <td style={{ fontWeight: 600 }}>৳{p.price.toLocaleString()}</td>
                  <td style={{ fontWeight: 600, color: p.stock === 0 ? '#ef4444' : p.stock < 10 ? '#f59e0b' : '#22c55e' }}>{p.stock}</td>
                  <td><span className={`badge ${statusBadge[p.status]}`}>{p.status}</span></td>
                  <td><div style={{ display: 'flex', gap: 6 }}><button className="btn btn-secondary btn-sm" onClick={() => handleEdit(p)}>✏️ Edit</button><button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>🗑️</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
