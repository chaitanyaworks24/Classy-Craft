'use client';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Menu, MessageCircle, ChevronDown, X, Home, LayoutGrid, Layers, Calculator } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { companyConfig } from '@/data/company';
import { usePathname } from 'next/navigation';

const portfolioLinks = [
  ['Kitchen', '/projects/rooms/kitchen'], ['Bedrooms', '/projects/rooms/bedrooms'], ['Living Room', '/projects/rooms/living-room'],
  ['Crockery Unit', '/projects/rooms/crockery-unit'], ['Kids Room', '/projects/rooms/kids-room'], ['Pooja Room', '/projects/rooms/pooja-room'],
  ['Foyer', '/projects/rooms/foyer'], ['TV Unit', '/projects/rooms/tv-unit'], ['Wardrobes', '/projects/rooms/wardrobes']
] as const;
const homeLinks = [['Villa', '/services/home/villa'], ['1 BHK', '/services/home/1bhk'], ['2 BHK', '/services/home/2bhk'], ['3 BHK', '/services/home/3bhk']] as const;
const commercialLinks = [['Office Spaces', '/services/commercial/office'], ['Restaurants', '/services/commercial/restaurants'], ['Shops', '/services/commercial/shops']] as const;

function DesktopDropdown({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="nav-dropdown" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center' }} className="nav-dropdown-trigger">
        <Link href={href} style={{ padding: '21px 0' }}>{label}</Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          style={{ background: 'none', border: 'none', padding: '21px 5px', color: isOpen ? 'var(--gold)' : 'inherit', display: 'flex', alignItems: 'center' }}
          aria-expanded={isOpen}
        >
          <ChevronDown size={12} />
        </button>
      </div>
      {isOpen && (
        <div className="nav-dropdown-panel" onClick={() => setIsOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

function MobileSubmenu({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mobile-submenu">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={href} style={{ flexGrow: 1, padding: '10px 0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>{label}</Link>
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', padding: '10px' }}><ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}/></button>
      </div>
      {isOpen && <div style={{ display: 'grid', gap: '10px', padding: '10px 0 10px 12px', borderLeft: '1px solid var(--line)', marginTop: '4px' }}>{children}</div>}
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [mobileMenuOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) { if (e.key === 'Escape') setMobileMenuOpen(false); }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <div className="wordmark" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={companyConfig.logoUrl} alt={companyConfig.name} style={{ height: '44px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', fontWeight: 500, fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em', color: 'var(--charcoal)' }}>{companyConfig.name}</span>
          </div>
          
          <nav className="desktop-nav" aria-label="Primary">
            <div className="desktop-menu-links">
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              
              <DesktopDropdown label="Portfolio" href="/projects">
                {portfolioLinks.map(([n, h]) => <Link key={h} href={h}>{n}</Link>)}
              </DesktopDropdown>
              
              <DesktopDropdown label="Our Services" href="/services">
                <div className="nav-dropdown-columns">
                  <div>
                    <span className="mobile-menu-label">HOME INTERIOR</span>
                    {homeLinks.map(([n, h]) => <Link key={h} href={h}>{n}</Link>)}
                  </div>
                  <div>
                    <span className="mobile-menu-label">COMMERCIAL</span>
                    {commercialLinks.map(([n, h]) => <Link key={h} href={h}>{n}</Link>)}
                  </div>
                </div>
              </DesktopDropdown>
              
              <Link href="/contact">Contact</Link>
              <Link href="/how-it-works">How It Works</Link>
            </div>
          </nav>
          
          <Link className="gold-btn header-cta" href="/estimate">Get Free Quote <ArrowUpRight size={14} /></Link>
          
          <div className="mobile-nav">
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open navigation" style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000 }} onClick={() => setMobileMenuOpen(false)} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '300px', maxWidth: '85vw', background: 'var(--ivory)', zIndex: 1001, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', display: 'flex' }}><X size={24} /></button>
            </div>
            <div className="mobile-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link href="/" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Home</Link>
              <Link href="/about" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>About Us</Link>
              
              <MobileSubmenu label="Portfolio" href="/projects">
                {portfolioLinks.map(([n, h]) => <Link key={h} href={h} style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.06em', padding: '4px 0', color: '#555' }}>{n}</Link>)}
              </MobileSubmenu>
              
              <MobileSubmenu label="Our Services" href="/services">
                <span className="mobile-menu-label" style={{ fontSize: '9px', letterSpacing: '.12em', color: '#999', margin: '4px 0' }}>HOME INTERIOR</span>
                {homeLinks.map(([n, h]) => <Link key={h} href={h} style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.06em', padding: '4px 0', color: '#555' }}>{n}</Link>)}
                <span className="mobile-menu-label" style={{ fontSize: '9px', letterSpacing: '.12em', color: '#999', margin: '16px 0 4px' }}>COMMERCIAL</span>
                {commercialLinks.map(([n, h]) => <Link key={h} href={h} style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.06em', padding: '4px 0', color: '#555' }}>{n}</Link>)}
              </MobileSubmenu>
              
              <Link href="/contact" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Contact</Link>
              <Link href="/how-it-works" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>How It Works</Link>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
              <Link className="gold-btn" href="/estimate" style={{ width: '100%' }}>Get Free Quote <ArrowRight size={15} /></Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand" style={{ marginBottom: '16px' }}>
            <img src={companyConfig.logoUrl} alt={companyConfig.name} style={{ height: 'clamp(44px, 8vw, 60px)', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p style={{ fontWeight: 600, color: 'var(--charcoal)', marginBottom: '8px', fontSize: '14px' }}>{companyConfig.name}</p>
          <p>Crafting Spaces. Creating Experiences.<br />Thoughtful, refined interior design for the discerning client.</p>
        </div>
        <div>
          <div className="eyebrow">Explore</div>
          <Link href="/projects">Portfolio</Link>
          <Link href="/services">Our Services</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/estimate">Get Free Quote</Link>
        </div>
        <div>
          <div className="eyebrow">Contact</div>
          <a href={`https://wa.me/${companyConfig.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20interior%20project.`} target="_blank" rel="noreferrer">WhatsApp</a>
          <Link href="/contact">Contact Us</Link>
        </div>
        <div>
          <div className="eyebrow">Visit Us</div>
          <p style={{ lineHeight: 1.6, margin: '0 0 12px 0' }}>
            <strong>{companyConfig.name}</strong><br/>
            {companyConfig.address.split(', ').map((line, i, arr) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </p>
          {companyConfig.googleMapsUrl && companyConfig.googleMapsUrl !== '#' && (
            <a href={companyConfig.googleMapsUrl} target="_blank" rel="noreferrer" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--gold)', fontWeight: 600 }}>
              View on Google Maps &rarr;
            </a>
          )}
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} {companyConfig.name}. All rights reserved.</div>
    </footer>
  );
}

export function WhatsApp() {
  return <a className="whatsapp" href={`https://wa.me/${companyConfig.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20interior%20project.`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={22} /></a>;
}

export function MobileBottom() {
  const pathname = usePathname();
  
  return (
    <nav className="mobile-bottom">
      <Link href="/" className={pathname === '/' ? 'active' : ''}>
        <Home size={20} strokeWidth={pathname === '/' ? 2.5 : 1.5} />
        Home
      </Link>
      <Link href="/projects" className={pathname?.startsWith('/projects') ? 'active' : ''}>
        <LayoutGrid size={20} strokeWidth={pathname?.startsWith('/projects') ? 2.5 : 1.5} />
        Portfolio
      </Link>
      <Link href="/services" className={pathname?.startsWith('/services') ? 'active' : ''}>
        <Layers size={20} strokeWidth={pathname?.startsWith('/services') ? 2.5 : 1.5} />
        Services
      </Link>
      <Link href="/estimate" className={pathname?.startsWith('/estimate') ? 'active' : ''}>
        <Calculator size={20} strokeWidth={pathname?.startsWith('/estimate') ? 2.5 : 1.5} />
        Estimate
      </Link>
      <Link href="/contact" className={pathname?.startsWith('/contact') ? 'active bottom-talk' : 'bottom-talk'}>
        <MessageCircle size={20} strokeWidth={pathname?.startsWith('/contact') ? 2.5 : 1.5} />
        Talk to Designer
      </Link>
    </nav>
  );
}
