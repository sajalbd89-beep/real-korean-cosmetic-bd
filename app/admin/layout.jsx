'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/products', icon: '📦', label: 'Products' },
  { href: '/admin/orders', icon: '🛒', label: 'Orders' },
  { href: '/admin/customers', icon: '👥', label: 'Customers' },
  { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
  { href: '/admin/ai', icon: '🤖', label: 'AI Agent' },
  { href: '/', icon: '🌐', label: 'View Site' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  return (
    <div style={{ display: 'flex' }}>
      <aside className="admin-sidebar">
        <div className="logo">
          <h2>RKCBD Admin</h2>
          <p>Real Korean Cosmetic BD</p>
        </div>
        <nav className="admin-nav">
          <div className="nav-section">Main Menu</div>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          v1.0 &bull; RKCBD &copy; 2026
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
