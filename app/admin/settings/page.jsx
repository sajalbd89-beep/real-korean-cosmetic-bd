'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [tab, setTab] = useState('site');
  const [saved, setSaved] = useState(false);
  const [site, setSite] = useState({
    heroTitle: 'Authentic Korean Skincare',
    heroSubtitle: '100% genuine Korean skincare — directly sourced from certified Seoul distributors.',
    heroBtnText: 'Start Skin Analysis',
    announcementBar: '🇰🇷 Free shipping on orders above ৳2,000 | bKash | Nagad | COD available',
    footerText: 'Bringing authentic Korean beauty to Bangladesh since 2024.',
    whatsappNumber: '01700-000000',
  });
  const [payment, setPayment] = useState({
    bkash: true, nagad: true, cod: true, card: false,
    bkashNumber: '01700-000000',
    nagadNumber: '01700-000000',
    shippingDhaka: 60, shippingOutside: 120, freeShippingMin: 2000,
  });
  const [admin, setAdmin] = useState({ email: 'admin@rkcbd.com', currentPass: '', newPass: '', confirmPass: '' });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <div className="admin-topbar">
        <h1>⚙️ Settings</h1>
        <div className="topbar-actions">
          {saved && <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 14 }}>✅ Saved successfully!</span>}
          <button className="btn btn-primary" onClick={handleSave}>💾 Save Changes</button>
        </div>
      </div>
      <div className="admin-content">
        <div className="tab-bar" style={{ maxWidth: 500 }}>
          {[['site','🌐 Site Content'], ['payment','💳 Payment'], ['delivery','🚚 Delivery'], ['account','🔒 Account']].map(([t,l]) => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{l}</button>
          ))}
        </div>

        {tab === 'site' && (
          <div className="card">
            <div className="card-header"><h3>🌐 Site Content Editor</h3><p style={{ fontSize: 12, color: '#888' }}>Edit text shown on the website</p></div>
            <div className="card-body">
              <div className="form-group"><label>Announcement Bar Text</label><input className="form-control" value={site.announcementBar} onChange={e => setSite({...site, announcementBar: e.target.value})} /></div>
              <div className="form-grid">
                <div className="form-group"><label>Hero Title</label><input className="form-control" value={site.heroTitle} onChange={e => setSite({...site, heroTitle: e.target.value})} /></div>
                <div className="form-group"><label>Hero Button Text</label><input className="form-control" value={site.heroBtnText} onChange={e => setSite({...site, heroBtnText: e.target.value})} /></div>
              </div>
              <div className="form-group"><label>Hero Subtitle</label><textarea className="form-control" value={site.heroSubtitle} onChange={e => setSite({...site, heroSubtitle: e.target.value})} /></div>
              <div className="form-group"><label>Footer Text</label><input className="form-control" value={site.footerText} onChange={e => setSite({...site, footerText: e.target.value})} /></div>
              <div className="form-group"><label>WhatsApp Number</label><input className="form-control" value={site.whatsappNumber} onChange={e => setSite({...site, whatsappNumber: e.target.value})} /></div>
              <div style={{ background: '#fef9c3', border: '1px solid #fbbf24', borderRadius: 8, padding: 12, fontSize: 13, color: '#92400e' }}>
                ⚠️ <strong>Note:</strong> Connect Supabase database to make these changes live on the website. Currently these are preview settings only.
              </div>
            </div>
          </div>
        )}

        {tab === 'payment' && (
          <div className="card">
            <div className="card-header"><h3>💳 Payment Methods</h3></div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[['bKash', 'bkash', '📱'], ['Nagad', 'nagad', '📱'], ['Cash on Delivery', 'cod', '💵'], ['Credit/Debit Card', 'card', '💳']].map(([label, key, icon]) => (
                  <div key={key} style={{ border: '2px solid', borderColor: payment[key] ? '#f0a500' : '#e5e7eb', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setPayment({...payment, [key]: !payment[key]})}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 20 }}>{icon}</span><div><div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div></div></div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, background: payment[key] ? '#f0a500' : '#e5e7eb', position: 'relative', transition: 'background 0.2s' }}><div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: '#fff', top: 3, left: payment[key] ? 23 : 3, transition: 'left 0.2s' }}></div></div>
                  </div>
                ))}
              </div>
              <div className="form-grid">
                <div className="form-group"><label>bKash Merchant Number</label><input className="form-control" value={payment.bkashNumber} onChange={e => setPayment({...payment, bkashNumber: e.target.value})} /></div>
                <div className="form-group"><label>Nagad Merchant Number</label><input className="form-control" value={payment.nagadNumber} onChange={e => setPayment({...payment, nagadNumber: e.target.value})} /></div>
              </div>
              <div style={{ background: '#dbeafe', border: '1px solid #93c5fd', borderRadius: 8, padding: 12, fontSize: 13, color: '#1e40af', marginTop: 8 }}>
                💡 For SSLCommerz integration (card payments), get API keys from <strong>sslcommerz.com</strong> and add to Vercel environment variables.
              </div>
            </div>
          </div>
        )}

        {tab === 'delivery' && (
          <div className="card">
            <div className="card-header"><h3>🚚 Delivery Settings</h3></div>
            <div className="card-body">
              <div className="form-grid three">
                <div className="form-group"><label>Dhaka Delivery (৳)</label><input className="form-control" type="number" value={payment.shippingDhaka} onChange={e => setPayment({...payment, shippingDhaka: e.target.value})} /></div>
                <div className="form-group"><label>Outside Dhaka (৳)</label><input className="form-control" type="number" value={payment.shippingOutside} onChange={e => setPayment({...payment, shippingOutside: e.target.value})} /></div>
                <div className="form-group"><label>Free Shipping Above (৳)</label><input className="form-control" type="number" value={payment.freeShippingMin} onChange={e => setPayment({...payment, freeShippingMin: e.target.value})} /></div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Delivery Zones</div>
                {[['Dhaka (Inside)', `৳${payment.shippingDhaka}`, '1-2 days'], ['Outside Dhaka', `৳${payment.shippingOutside}`, '3-5 days'], [`Free (above ৳${payment.freeShippingMin})`, '৳0', 'Same as above']].map(([zone, cost, days]) => (
                  <div key={zone} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontWeight: 500 }}>{zone}</span>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>{cost}</span>
                    <span style={{ color: '#888', fontSize: 13 }}>{days}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'account' && (
          <div className="card">
            <div className="card-header"><h3>🔒 Account Security</h3></div>
            <div className="card-body">
              <div className="form-group"><label>Admin Email</label><input className="form-control" type="email" value={admin.email} onChange={e => setAdmin({...admin, email: e.target.value})} /></div>
              <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />
              <div style={{ fontWeight: 600, marginBottom: 12 }}>Change Password</div>
              <div className="form-group"><label>Current Password</label><input className="form-control" type="password" placeholder="Enter current password" /></div>
              <div className="form-grid">
                <div className="form-group"><label>New Password</label><input className="form-control" type="password" placeholder="New password" /></div>
                <div className="form-group"><label>Confirm Password</label><input className="form-control" type="password" placeholder="Confirm new password" /></div>
              </div>
              <button className="btn btn-danger">Update Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
