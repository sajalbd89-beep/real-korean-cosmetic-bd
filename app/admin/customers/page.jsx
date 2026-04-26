'use client';
import { useState } from 'react';

const customers = [
  { id: 1, name: 'Fatima Khanam', phone: '01711-234567', email: 'fatima@gmail.com', city: 'Dhaka', orders: 12, spent: 18600, joined: 'Jan 2026', tier: 'Gold' },
  { id: 2, name: 'Rashed Ahmed', phone: '01812-345678', email: 'rashed@gmail.com', city: 'Dhaka', orders: 8, spent: 12400, joined: 'Feb 2026', tier: 'Silver' },
  { id: 3, name: 'Nusrat Jahan', phone: '01912-456789', email: 'nusrat@gmail.com', city: 'Sylhet', orders: 5, spent: 7800, joined: 'Mar 2026', tier: 'Bronze' },
  { id: 4, name: 'Karim Uddin', phone: '01611-567890', email: 'karim@gmail.com', city: 'Chittagong', orders: 15, spent: 24500, joined: 'Dec 2025', tier: 'Gold' },
  { id: 5, name: 'Sadia Islam', phone: '01511-678901', email: 'sadia@gmail.com', city: 'Rajshahi', orders: 3, spent: 4200, joined: 'Apr 2026', tier: 'Bronze' },
  { id: 6, name: 'Tanvir Hossain', phone: '01311-789012', email: 'tanvir@gmail.com', city: 'Khulna', orders: 9, spent: 14300, joined: 'Jan 2026', tier: 'Silver' },
  { id: 7, name: 'Mitu Akter', phone: '01411-890123', email: 'mitu@gmail.com', city: 'Dhaka', orders: 22, spent: 38900, joined: 'Nov 2025', tier: 'Platinum' },
  { id: 8, name: 'Sabbir Rahman', phone: '01911-901234', email: 'sabbir@gmail.com', city: 'Gazipur', orders: 6, spent: 9100, joined: 'Mar 2026', tier: 'Bronze' },
];

const tierColors = { Platinum: '#a855f7', Gold: '#f0a500', Silver: '#6b7280', Bronze: '#b45309' };

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.city.toLowerCase().includes(search.toLowerCase()));
  const totalRevenue = customers.reduce((a, c) => a + c.spent, 0);

  return (
    <div>
      <div className="admin-topbar">
        <h1>👥 Customers</h1>
        <div className="topbar-actions">
          <div className="search-box"><span>🔍</span><input placeholder="Search by name, phone, city..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        </div>
      </div>
      <div className="admin-content">
        <div className="stat-grid" style={{ marginBottom: 20 }}>
          <div className="stat-card"><div className="stat-icon" style={{background:'#dbeafe'}}>👥</div><div className="stat-label">Total Customers</div><div className="stat-value">{customers.length}</div><div className="stat-change">↑ +24 this week</div></div>
          <div className="stat-card"><div className="stat-icon" style={{background:'#fef9c3'}}>👑</div><div className="stat-label">Platinum</div><div className="stat-value">{customers.filter(c=>c.tier==='Platinum').length}</div><div className="stat-change">VIP customers</div></div>
          <div className="stat-card"><div className="stat-icon" style={{background:'#fef3c7'}}>🪩</div><div className="stat-label">Gold</div><div className="stat-value">{customers.filter(c=>c.tier==='Gold').length}</div><div className="stat-change">Loyal customers</div></div>
          <div className="stat-card"><div className="stat-icon" style={{background:'#dcfce7'}}>💰</div><div className="stat-label">Total Revenue</div><div className="stat-value">৳{(totalRevenue/1000).toFixed(0)}K</div><div className="stat-change">↑ +12% this month</div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: 20 }}>
          <div className="card">
            <div className="card-header"><h3>All Customers ({filtered.length})</h3></div>
            <table>
              <thead><tr><th>Customer</th><th>Phone</th><th>City</th><th>Orders</th><th>Total Spent</th><th>Tier</th><th>Joined</th><th></th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div className="avatar">{c.name[0]}</div><div><div style={{ fontWeight: 600 }}>{c.name}</div><div style={{ fontSize: 11, color: '#9ca3af' }}>{c.email}</div></div></div></td>
                    <td style={{ fontSize: 13 }}>{c.phone}</td>
                    <td style={{ fontSize: 13 }}>{c.city}</td>
                    <td style={{ fontWeight: 700, textAlign: 'center' }}>{c.orders}</td>
                    <td style={{ fontWeight: 700, color: '#22c55e' }}>৳{c.spent.toLocaleString()}</td>
                    <td><span style={{ background: tierColors[c.tier] + '22', color: tierColors[c.tier], padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{c.tier}</span></td>
                    <td style={{ fontSize: 12, color: '#9ca3af' }}>{c.joined}</td>
                    <td><button className="btn btn-secondary btn-sm" onClick={() => setSelected(selected?.id === c.id ? null : c)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selected && (
            <div className="card" style={{ height: 'fit-content' }}>
              <div className="card-header"><h3>Customer Profile</h3><button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Close</button></div>
              <div className="card-body">
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0a500', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, margin: '0 auto 12px' }}>{selected.name[0]}</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{selected.name}</div>
                  <div style={{ marginTop: 4 }}><span style={{ background: tierColors[selected.tier]+'22', color: tierColors[selected.tier], padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🏆 {selected.tier} Member</span></div>
                </div>
                {[['Phone', selected.phone], ['Email', selected.email], ['City', selected.city], ['Joined', selected.joined], ['Total Orders', selected.orders], ['Total Spent', `৳${selected.spent.toLocaleString()}`]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: 13 }}>
                    <span style={{ color: '#888', fontWeight: 500 }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="btn btn-primary" style={{ width: '100%' }}>📞 Contact Customer</button>
                  <button className="btn btn-secondary" style={{ width: '100%' }}>📦 View Orders</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
