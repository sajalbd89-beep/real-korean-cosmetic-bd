'use client';
import { useState } from 'react';

const initialOrders = [
  { id: '#ORD-001', customer: 'Fatima Khanam', phone: '01711-234567', address: 'Dhanmondi, Dhaka', items: 'COSRX Snail Cream x1', amount: 1850, payment: 'bKash', status: 'Delivered', date: '27 Apr 2026' },
  { id: '#ORD-002', customer: 'Rashed Ahmed', phone: '01812-345678', address: 'Mirpur, Dhaka', items: 'Some By Mi Toner x1', amount: 2200, payment: 'Nagad', status: 'Processing', date: '27 Apr 2026' },
  { id: '#ORD-003', customer: 'Nusrat Jahan', phone: '01912-456789', address: 'Sylhet Sadar', items: 'Laneige Lip Mask x2', amount: 3200, payment: 'COD', status: 'Shipped', date: '26 Apr 2026' },
  { id: '#ORD-004', customer: 'Karim Uddin', phone: '01611-567890', address: 'Chittagong', items: 'Dr.Jart+ Cicapair x1', amount: 3400, payment: 'bKash', status: 'Pending', date: '26 Apr 2026' },
  { id: '#ORD-005', customer: 'Sadia Islam', phone: '01511-678901', address: 'Rajshahi', items: 'Innisfree Green Tea x1', amount: 1200, payment: 'Nagad', status: 'Delivered', date: '25 Apr 2026' },
  { id: '#ORD-006', customer: 'Jahangir Alam', phone: '01711-789012', address: 'Gazipur', items: 'Missha Night Repair x1', amount: 2800, payment: 'COD', status: 'Cancelled', date: '25 Apr 2026' },
];

const statusColors = { Delivered: 'badge-success', Processing: 'badge-info', Shipped: 'badge-warning', Pending: 'badge-danger', Cancelled: 'badge-danger' };
const allStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = orders.filter(o =>
    (filter === 'All' || o.status === filter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search))
  );

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selected?.id === id) setSelected({ ...selected, status: newStatus });
  };

  return (
    <div>
      <div className="admin-topbar">
        <h1>🛒 Orders</h1>
        <div className="topbar-actions">
          <div className="search-box"><span>🔍</span><input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        </div>
      </div>
      <div className="admin-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 20 }}>
          {[['Pending','🔴'], ['Processing','🟡'], ['Shipped','🟦'], ['Delivered','🟢'], ['Cancelled','⚫']].map(([s, dot]) => (
            <div key={s} className="stat-card" style={{ cursor: 'pointer', border: filter === s ? '2px solid #f0a500' : '' }} onClick={() => setFilter(filter === s ? 'All' : s)}>
              <div style={{ fontSize: 20 }}>{dot}</div>
              <div className="stat-label">{s}</div>
              <div className="stat-value" style={{ fontSize: 24 }}>{orders.filter(o => o.status === s).length}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <h3>Orders ({filtered.length})</h3>
              <div style={{ display: 'flex', gap: 6 }}>
                {allStatuses.map(s => <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(s)}>{s}</button>)}
              </div>
            </div>
            <table>
              <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 700, color: '#f0a500' }}>{o.id}</td>
                    <td><div style={{ fontWeight: 500 }}>{o.customer}</div><div style={{ fontSize: 11, color: '#9ca3af' }}>{o.phone}</div></td>
                    <td style={{ fontSize: 12, color: '#6b7280' }}>{o.items}</td>
                    <td style={{ fontWeight: 700 }}>৳{o.amount.toLocaleString()}</td>
                    <td><span className="badge badge-info">{o.payment}</span></td>
                    <td><span className={`badge ${statusColors[o.status]}`}>{o.status}</span></td>
                    <td style={{ fontSize: 12, color: '#9ca3af' }}>{o.date}</td>
                    <td><button className="btn btn-secondary btn-sm" onClick={() => setSelected(selected?.id === o.id ? null : o)}>Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selected && (
            <div className="card" style={{ height: 'fit-content' }}>
              <div className="card-header"><h3>Order Details</h3><button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Close</button></div>
              <div className="card-body">
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#f0a500' }}>{selected.id}</div>
                  <div style={{ marginTop: 4 }}><span className={`badge ${statusColors[selected.status]}`}>{selected.status}</span></div>
                </div>
                {[['Customer', selected.customer], ['Phone', selected.phone], ['Address', selected.address], ['Items', selected.items], ['Amount', `৳${selected.amount.toLocaleString()}`], ['Payment', selected.payment], ['Date', selected.date]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                    <span style={{ color: '#888', fontWeight: 500 }}>{k}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 600 }}>UPDATE STATUS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s => (
                      <button key={s} className={`btn btn-sm ${selected.status === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateStatus(selected.id, s)}>{s === selected.status ? '✓ ' : ''}{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
