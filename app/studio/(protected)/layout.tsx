import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { companyConfig } from '@/data/company';
import { LayoutDashboard, Image as ImageIcon, Users, Settings } from 'lucide-react';

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('studio_session');
  
  if (!session || session.value !== 'authenticated') {
    redirect('/studio/login');
  }

  return (
    <>
      <style>{`
        .studio-shell { display: flex; min-height: 100vh; background: var(--ivory); }
        .studio-sidebar { width: 260px; background: #fff; border-right: 1px solid var(--line); display: flex; flex-direction: column; flex-shrink: 0; }
        .studio-main { flex-grow: 1; padding: 40px; overflow-y: auto; }
        .studio-bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid var(--line); padding: 12px 16px; padding-bottom: env(safe-area-inset-bottom, 12px); justify-content: space-around; z-index: 100; box-shadow: 0 -4px 12px rgba(0,0,0,0.05); }
        .studio-nav-item { display: flex; flex-direction: column; items: center; text-decoration: none; color: #555; gap: 4px; align-items: center; }
        .studio-nav-item span { font-size: 10px; font-weight: 500; }
        
        @media (max-width: 900px) {
          .studio-sidebar { display: none; }
          .studio-main { padding: 20px; padding-bottom: 100px; }
          .studio-bottom-nav { display: flex; }
        }
      `}</style>
      
      <div className="studio-shell">
        {/* Desktop Sidebar */}
        <aside className="studio-sidebar">
          <div style={{ padding: '30px 24px' }}>
            <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', fontWeight: 500 }}>
              {companyConfig.name.toUpperCase()}
            </div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginTop: '4px' }}>
              Studio Portal
            </div>
          </div>

          <nav style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
            <Link href="/studio" style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--charcoal)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link href="/studio/showcase" style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--charcoal)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ImageIcon size={16} /> Showcase
            </Link>
            <Link href="/studio/leads" style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--charcoal)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={16} /> Leads
            </Link>
          </nav>

          <div style={{ padding: '24px 12px', borderTop: '1px solid var(--line)' }}>
            <div style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--muted)', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Settings size={16} /> Settings
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="studio-main">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation */}
        <nav className="studio-bottom-nav">
          <Link href="/studio" className="studio-nav-item">
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </Link>
          <Link href="/studio/showcase" className="studio-nav-item">
            <ImageIcon size={20} /> <span>Showcase</span>
          </Link>
          <Link href="/studio/leads" className="studio-nav-item">
            <Users size={20} /> <span>Leads</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
