'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ShowcaseItem } from '@/lib/studio-data';
import { ShowcaseSettings } from '@/lib/showcase-token';
import { companyConfig } from '@/data/company';
import { ArrowLeft, ArrowUpRight, MessageCircle, X } from 'lucide-react';
import ConversionCard from './ConversionCard';

interface ShowcaseClientProps {
  clientName: string;
  items: ShowcaseItem[];
  settings: ShowcaseSettings;
}

export default function ShowcaseClient({ clientName, items, settings }: ShowcaseClientProps) {
  const projectItems = useMemo(() => items.filter(i => i.kind === 'project'), [items]);
  const portfolioItems = useMemo(() => items.filter(i => i.kind === 'portfolio'), [items]);
  
  const hasProjects = projectItems.length > 0;
  const hasRooms = portfolioItems.length > 0;
  
  const [activeTab, setActiveTab] = useState<'Projects' | 'Rooms'>(hasProjects ? 'Projects' : 'Rooms');
  const [activeHomeType, setActiveHomeType] = useState<string>('All');
  const [activeBudget, setActiveBudget] = useState<string>('All');
  const [activeStyle, setActiveStyle] = useState<string>('All');
  
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, activeProjectId, activeRoomId]);

  const homeTypes = useMemo(() => {
    return ['All', ...new Set(projectItems.map(p => p.category).filter(Boolean))];
  }, [projectItems]);

  const budgets = useMemo(() => {
    return ['All', 'Under ₹15L', '₹15L - ₹30L', '₹30L+'];
  }, []);

  const styles = useMemo(() => {
    return ['All', ...new Set(projectItems.map(p => p.style).filter(Boolean) as string[])];
  }, [projectItems]);

  const filteredProjects = useMemo(() => {
    let result = projectItems;
    
    if (activeHomeType !== 'All') {
      if (activeHomeType === 'Full Home') result = result.filter(p => p.category?.includes('BHK') || p.category?.includes('Villa'));
      else result = result.filter(p => p.category?.includes(activeHomeType));
    }
    
    if (activeBudget !== 'All') {
      if (activeBudget === 'Under ₹15L') result = result.filter(p => (p.budgetMin || 0) < 1500000);
      else if (activeBudget === '₹15L - ₹30L') result = result.filter(p => (p.budgetMin || 0) >= 1500000 && (p.budgetMin || 0) <= 3000000);
      else if (activeBudget === '₹30L+') result = result.filter(p => (p.budgetMin || 0) > 3000000);
    }
    
    if (activeStyle !== 'All') {
      result = result.filter(p => p.style === activeStyle);
    }
    
    return result;
  }, [projectItems, activeHomeType, activeBudget, activeStyle]);

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${companyConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const renderProjectDetail = () => {
    const p = projectItems.find(i => i.id === activeProjectId);
    if (!p) return null;

    return (
      <div style={{ background: 'var(--ivory)', minHeight: '100vh', paddingBottom: '100px' }}>
        <button 
          onClick={() => setActiveProjectId(null)}
          style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 50, background: 'var(--ivory)', border: '1px solid var(--line)', padding: '10px 16px', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '80px 20px 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, margin: '0 0 16px' }}>
              {p.title}
            </h1>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>
              <span>{p.category}</span>
              {settings.showLocation && p.location && <span>{p.location}</span>}
              {settings.showBudget && p.budgetLabel && <span>{p.budgetLabel}</span>}
              {p.timelineWeeks && <span>{p.timelineWeeks} Weeks</span>}
            </div>
          </div>
          
          <div style={{ height: 'clamp(400px, 70vh, 700px)', width: '100%', overflow: 'hidden', marginBottom: '40px' }}>
            <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {settings.showProjectDetails && p.description && (
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--charcoal)', marginBottom: '40px' }}>
                {p.description}
              </p>
            )}
          </div>

          {p.beforeImages && p.beforeImages.length > 0 && (
            <>
              <div className="finished-gallery-label">
                <div className="eyebrow" style={{ marginTop: '24px' }}>THE TRANSFORMATION</div>
              </div>
              <section className="before-gallery">
                {p.beforeImages.map((src, i) => (
                  <div className={`before-gallery-item ${i === 0 && p.beforeImages!.length % 2 !== 0 ? 'wide' : ''}`} key={src}>
                     <div className="before-label">BEFORE</div>
                     <img src={src} alt={`Before condition ${i + 1}`} />
                  </div>
                ))}
              </section>
              
              <div className="finished-gallery-label" style={{ marginTop: '40px', marginBottom: '0' }}>
                <div className="eyebrow">THE FINISHED SPACE</div>
              </div>
            </>
          )}

          {p.gallery && p.gallery.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '40px' }}>
              {p.gallery.slice(1, 7).map((img, i) => (
                <div key={i} style={{ height: '350px', background: 'var(--stone)' }}>
                  <img src={img} alt={`${p.title} detail`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </section>

        {(settings.showEstimateCTA || settings.showWhatsAppCTA) && (
          <section style={{ maxWidth: '800px', margin: '140px auto 0', textAlign: 'center', padding: '0 20px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginBottom: '16px' }}>
              Seen something you love?
            </div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0 0 40px' }}>
              Let’s create something similar for your home.
            </h2>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {settings.showEstimateCTA && (
                <Link href="/estimate" className="dark-btn" style={{ padding: '14px 28px', fontSize: '12px' }}>
                  Get Your Estimate
                </Link>
              )}
              {settings.showWhatsAppCTA && (
                <a href={getWhatsAppLink(`Hi ${companyConfig.name}, I'm looking at ${p.title} from the showcase.`)} target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ padding: '14px 28px', fontSize: '12px', display: 'inline-flex', alignItems: 'center' }}>
                  <MessageCircle size={16} style={{ marginRight: '8px' }} /> Chat on WhatsApp
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    );
  };

  const renderRoomDetail = () => {
    const r = portfolioItems.find(i => i.id === activeRoomId);
    if (!r) return null;

    const gallery = r.gallery || [r.image];
    const midIndex = Math.floor(gallery.length / 2);

    const singularName = r.title.toLowerCase().endsWith('s') && !r.title.toLowerCase().includes('kids') 
      ? r.title.slice(0, -1) 
      : r.title;
    const rawFirstName = clientName.split(' ')[0];
    const firstName = rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase();

    return (
      <div style={{ background: 'var(--ivory)', minHeight: '100vh', paddingBottom: '100px' }}>
        <button 
          onClick={() => setActiveRoomId(null)}
          style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 50, background: 'var(--ivory)', border: '1px solid var(--line)', padding: '10px 16px', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}
        >
          <ArrowLeft size={16} /> Back to Rooms
        </button>

        <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '80px 20px 0' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--gold)', marginBottom: '16px', fontWeight: 600 }}>
              PORTFOLIO COLLECTION
            </div>
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, margin: '0 0 16px', textTransform: 'capitalize' }}>
              {r.title}
            </h1>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {gallery.slice(0, midIndex).map((img, i) => (
              <div key={i} style={{ height: '400px', background: 'var(--stone)' }}>
                <img src={img} alt={`${r.title} design`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ))}

            <ConversionCard 
              title={`YOUR ${singularName.toUpperCase()} CAN BE HERE`}
              text={`Let's create a ${singularName.toLowerCase()} designed around the way ${firstName} lives.`}
            />

            {gallery.slice(midIndex).map((img, i) => (
              <div key={i + midIndex} style={{ height: '400px', background: 'var(--stone)' }}>
                <img src={img} alt={`${r.title} design`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  if (activeProjectId) return renderProjectDetail();
  if (activeRoomId) return renderRoomDetail();

  const insertProjectConversionIndex = Math.max(1, Math.floor(filteredProjects.length / 2));

  return (
    <main style={{ background: 'var(--ivory)', color: 'var(--charcoal)', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Presentation Header */}
      {(hasProjects || hasRooms) && (
        <nav className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', padding: '0 40px', height: '64px', alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
          <div></div>
          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
            {hasProjects && (
              <button 
                onClick={() => setActiveTab('Projects')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif', color: activeTab === 'Projects' ? 'var(--charcoal)' : 'var(--muted)', fontWeight: activeTab === 'Projects' ? 500 : 400 }}
              >
                Projects
              </button>
            )}
            {hasRooms && (
              <button 
                onClick={() => setActiveTab('Rooms')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'Inter, sans-serif', color: activeTab === 'Rooms' ? 'var(--charcoal)' : 'var(--muted)', fontWeight: activeTab === 'Rooms' ? 500 : 400 }}
              >
                Rooms
              </button>
            )}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'Inter, sans-serif', textAlign: 'right' }}>Showcase for {clientName}</div>
        </nav>
      )}

      {/* Editorial Hero */}
      <section style={{ padding: '50px 20px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.18em', color: 'var(--gold)', fontWeight: 600, marginBottom: '24px' }}>
          {companyConfig.name}
        </div>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 500, lineHeight: 1.1, margin: '0 auto' }}>
          A few spaces we thought you might love, {clientName}.
        </h1>
      </section>

      {/* Projects Tab */}
      {activeTab === 'Projects' && (
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', maxWidth: '100%', overflow: 'hidden' }}>
            {homeTypes.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Type</span>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
                  {homeTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setActiveHomeType(t)}
                      style={{
                        padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                        border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                        background: activeHomeType === t ? 'var(--charcoal)' : 'transparent',
                        color: activeHomeType === t ? 'var(--ivory)' : 'var(--muted)',
                        borderColor: activeHomeType === t ? 'var(--charcoal)' : 'var(--line)'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {budgets.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Budget</span>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
                  {budgets.map(b => (
                    <button
                      key={b}
                      onClick={() => setActiveBudget(b)}
                      style={{
                        padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                        border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                        background: activeBudget === b ? 'var(--charcoal)' : 'transparent',
                        color: activeBudget === b ? 'var(--ivory)' : 'var(--muted)',
                        borderColor: activeBudget === b ? 'var(--charcoal)' : 'var(--line)'
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {styles.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Style</span>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
                  {styles.map(s => (
                    <button
                      key={s}
                      onClick={() => setActiveStyle(s)}
                      style={{
                        padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                        border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                        background: activeStyle === s ? 'var(--charcoal)' : 'transparent',
                        color: activeStyle === s ? 'var(--ivory)' : 'var(--muted)',
                        borderColor: activeStyle === s ? 'var(--charcoal)' : 'var(--line)'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {filteredProjects.slice(0, insertProjectConversionIndex).map((p, i) => (
              <div 
                key={p.id} 
                onClick={() => setActiveProjectId(p.id)}
                className="project-card"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ height: '400px', background: 'var(--stone)', marginBottom: '16px', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} loading="lazy" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', margin: '0 0 8px', fontWeight: 500 }}>{p.title}</h3>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>
                  {p.category} {settings.showLocation && p.location ? `· ${p.location}` : ''}
                </div>
              </div>
            ))}

            {filteredProjects.length > 0 && activeHomeType === 'All' && activeBudget === 'All' && activeStyle === 'All' && <ConversionCard />}

            {filteredProjects.slice(insertProjectConversionIndex).map((p, i) => (
              <div 
                key={p.id} 
                onClick={() => setActiveProjectId(p.id)}
                className="project-card"
                style={{ cursor: 'pointer' }}
              >
                <div style={{ height: '400px', background: 'var(--stone)', marginBottom: '16px', overflow: 'hidden' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} loading="lazy" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', margin: '0 0 8px', fontWeight: 500 }}>{p.title}</h3>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>
                  {p.category} {settings.showLocation && p.location ? `· ${p.location}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Rooms Tab */}
      {activeTab === 'Rooms' && (
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            {portfolioItems.map((r, i) => (
              <div 
                key={r.id} 
                onClick={() => setActiveRoomId(r.id)}
                style={{ cursor: 'pointer', border: '1px solid var(--line)', background: 'var(--surface)' }}
              >
                <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', margin: 0, fontWeight: 500, textTransform: 'capitalize' }}>
                    {r.title}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Explore <ArrowUpRight size={14} />
                  </div>
                </div>
                <div style={{ height: '350px', background: 'var(--stone)', overflow: 'hidden' }}>
                  <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Bottom Navigation */}
      {(hasProjects && hasRooms) && (
        <nav 
          className="mobile-only"
          style={{ 
            position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            background: 'var(--surface)', borderRadius: '30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '10px 24px',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', zIndex: 100
          }}
        >
          <button 
            onClick={() => setActiveTab('Projects')}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0, fontFamily: 'Inter, sans-serif',
              color: activeTab === 'Projects' ? 'var(--charcoal)' : 'var(--muted)', fontWeight: activeTab === 'Projects' ? 600 : 400 
            }}
          >
            Projects
          </button>
          <div style={{ color: 'var(--line)', fontSize: '12px' }}>|</div>
          <button 
            onClick={() => setActiveTab('Rooms')}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0, fontFamily: 'Inter, sans-serif',
              color: activeTab === 'Rooms' ? 'var(--charcoal)' : 'var(--muted)', fontWeight: activeTab === 'Rooms' ? 600 : 400 
            }}
          >
            Rooms
          </button>
        </nav>
      )}

      {/* Grid Conversion Section */}
      {(settings.showEstimateCTA || settings.showWhatsAppCTA) && (
        <section style={{ maxWidth: '800px', margin: '100px auto 0', textAlign: 'center', padding: '0 20px' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginBottom: '16px', fontWeight: 600 }}>
            Seen something you love?
          </div>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0 0 40px' }}>
            Let’s create something similar for your home.
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {settings.showEstimateCTA && (
              <Link href="/estimate" className="dark-btn" style={{ padding: '14px 28px', fontSize: '12px' }}>
                Get Your Estimate
              </Link>
            )}
            {settings.showWhatsAppCTA && (
              <a href={getWhatsAppLink(`Hi ${companyConfig.name}, I'm ${clientName} and I was looking at the showcase you sent me.`)} target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ padding: '14px 28px', fontSize: '12px', display: 'inline-flex', alignItems: 'center' }}>
                <MessageCircle size={16} style={{ marginRight: '8px' }} /> Chat on WhatsApp
              </a>
            )}
          </div>
        </section>
      )}
      
      {/* Sticky WhatsApp Button */}
      {settings.showWhatsAppCTA && (
        <a 
          href={getWhatsAppLink(`Hi ${companyConfig.name}, I'm ${clientName} and I was looking at the showcase you sent me.`)} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            position: 'fixed', bottom: (hasProjects && hasRooms) ? '80px' : '30px', right: '20px', zIndex: 100,
            background: '#25D366', color: '#fff', width: '56px', height: '56px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
            transition: 'transform 0.2s ease'
          }}
          className="sticky-wa-btn"
        >
          <MessageCircle size={28} />
        </a>
      )}
      
      <style>{`
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only { display: none !important; }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .sticky-wa-btn:hover {
          transform: scale(1.05) translateY(-2px);
        }
      `}</style>
    </main>
  );
}
