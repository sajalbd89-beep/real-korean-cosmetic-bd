'use client';
import Link from 'next/link';

const stats = [
  { label: 'Total Revenue', value: '৳2,45,800', change: '+12% this month', icon: '💰', color: '#fef3c7' },
  { label: 'Total Orders', value: '348', change: '+8 today', icon: '🛒', color: '#dbeafe' },
  { label: 'Products', value: '124', change: '6 low stock', icon: '📦', color: '#dcfce7' },
  { label: 'Customers', value: '892', change: '+24 this week', icon: '👥', color: '#fce7f3' },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Fatima Khanam', product: 'COSRX Snail Cream', amount: '৳1,850', status: 'Delivered', date: 'Apr 27' },
  { id: '#ORD-002', customer: 'Rashed Ahmed', product: 'Some By Mi Toner', amount: '৳2,200', status: 'Processing', date: 'Apr 27' },
  { id: '#ORD-003', customer: 'Nusrat Jahan', product: 'Laneige Lip Mask', amount: '৳1,600', status: 'Shipped', date: 'Apr 26' },
  { id: '#ORD-004', customer: 'Karim Uddin', product: 'Dr.Jart+ Cicapair', amount: '৳3,400', status: 'Pending', date: 'Apr 26' },
  { id: '#ORD-005', customer: 'Sadia Islam', product: 'Innisfree Green Tea', amount: '৳1,200', status: 'Delivered', date: 'Apr 25' },
];

const statusBadge = {
  Delivered: 'badge-success',
  Processing: 'badge-info',
  Shipped: 'badge-warning',
  Pending: 'badge-danger',
};

const topProducts = [
  { name: 'COSRX Snail Mucin', sold: 89, revenue: '৳1,64,650', stock: 23 },
  { name: 'Some By Mi AHA BHA', sold: 67, revenue: '৳1,47,400', stock: 15 },
  { name: 'Laneige Water Bank', sold: 54, revenue: '৳1,89,000', stock: 8 },
  { name: 'Dr.Jart+ Cicapair', sold: 45, revenue: '৳1,53,000', stock: 31 },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="admin-topbar">
        <h1>📊 Dashboard</h1>
        <div className="topbar-actions">
          <div style={{ fontSize: 13, color: '#888' }}>Mon, 27 Apr 2026</div>
          <Link href="/admin/products/new" className="btn btn-primary btn-sm">👋 Add Product</Link>
          <div className="avatar">S</div>
        </div>
      </div>
      <div className="admin-content">
        <div className="stat-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-change">↑ {s.change}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <h3>🛒 Recent Orders</h3>
              <Link href="/admin/orders" className="btn btn-secondary btn-sm">View All</Link>
            </div>
            <table>
              <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 600, color: '#f0a500' }}>{o.id}</td>
                    <td>{o.customer}</td>
                    <td style={{ color: '#6b7280' }}>{o.product}</td>
                    <td style={{ fontWeight: 600 }}>{o.amount}</td>
                    <td><span className={`badge ${statusBadge[o.status]}`}>{o.status}</span></td>
                    <td style={{ color: '#9ca3af' }}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card">
            <div className="card-header"><h3>🔥 Top Products</h3></div>
            <div className="card-body" style={{ padding: 0 }}>
              {topProducts.map((p, i) => (
                <div key={p.name} style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0a500', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i+1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{p.sold} sold &bull; Stock: {p.stock}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{p.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
          <Link href="/admin/products" style={{ background: '#1a1a2e', color: '#fff', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>📦</span><div><div style={{ fontWeight: 700 }}>Manage Products</div><div style={{ fontSize: 12, opacity: 0.6 }}>Add, edit, delete products</div></div>
          </Link>
          <Link href="/admin/orders" style={{ background: '#0f3460', color: '#fff', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>🛒</span><div><div style={{ fontWeight: 700 }}>Manage Orders</div><div style={{ fontSize: 12, opacity: 0.6 }}>Track & update orders</div></div>
          </Link>
          <Link href="/admin/customers" style={{ background: '#166534', color: '#fff', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <span style={{ fontSize: 28 }}>👥</span><div><div style={{ fontWeight: 700 }}>Customer Data</div><div style={{ fontSize: 12, opacity: 0.6 }}>View all customers</div></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
