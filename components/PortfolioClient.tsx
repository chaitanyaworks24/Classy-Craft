'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getEffectiveProjects } from '@/lib/studio-overrides';



const BUDGET_RANGES = [
  { label: 'All Budgets', value: 'All' },
  { label: 'Under ₹10L', min: 0, max: 1000000 },
  { label: '₹10–15L', min: 1000000, max: 1500000 },
  { label: '₹15–25L', min: 1500000, max: 2500000 },
  { label: '₹25L+', min: 2500000, max: Infinity }
];

export default function PortfolioClient() {
  const [homeType, setHomeType] = useState('All');
  const [budget, setBudget] = useState('All Budgets');
  const [style, setStyle] = useState('All');
  
  const projects = useMemo(() => getEffectiveProjects(), []);

  // Filter list
  const list = useMemo(() => {
    return projects.filter(p => {
      if (homeType !== 'All' && p.homeType !== homeType) return false;
      if (style !== 'All' && p.style !== style) return false;
      
      if (budget !== 'All') {
        const range = BUDGET_RANGES.find(r => r.label === budget);
        if (range) {
          if (p.budgetMin > range.max! || p.budgetMax < range.min!) {
            return false;
          }
        }
      }
      return true;
    });
  }, [homeType, budget, style]);

  const homeTypes = ['All', ...new Set(projects.map(p => p.homeType))];
  const styles = ['All', ...new Set(projects.map(p => p.style))];
  const budgets = BUDGET_RANGES.map(b => b.label);

  return (
    <div>
      <div className="portfolio-toolbar" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%', overflow: 'hidden' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Type</span>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
              {homeTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setHomeType(t)}
                  style={{
                    padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                    border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                    background: homeType === t ? 'var(--charcoal)' : 'transparent',
                    color: homeType === t ? 'var(--ivory)' : 'var(--muted)',
                    borderColor: homeType === t ? 'var(--charcoal)' : 'var(--line)'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Budget</span>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
              {budgets.map(b => (
                <button
                  key={b}
                  onClick={() => setBudget(b)}
                  style={{
                    padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                    border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                    background: budget === b ? 'var(--charcoal)' : 'transparent',
                    color: budget === b ? 'var(--ivory)' : 'var(--muted)',
                    borderColor: budget === b ? 'var(--charcoal)' : 'var(--line)'
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Style</span>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
              {styles.map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  style={{
                    padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                    border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                    background: style === s ? 'var(--charcoal)' : 'transparent',
                    color: style === s ? 'var(--ivory)' : 'var(--muted)',
                    borderColor: style === s ? 'var(--charcoal)' : 'var(--line)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="project-grid">
        {list.map((p, i) => (
          <Link className={`project-tile tile-${i % 4}`} href={`/projects/${p.slug}`} key={p.slug}>
            <div className="project-image">
              <img src={p.image} alt={p.title} />
            </div>
            <h3>{p.title}</h3>
            <p style={{ marginTop: '5px' }}>{p.homeType} · {p.location} · {p.budgetLabel}</p>
            <span className="tile-arrow"><ArrowUpRight size={15} /></span>
          </Link>
        ))}
        {list.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            No projects match your selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}
