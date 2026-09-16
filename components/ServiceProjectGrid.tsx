'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import ConversionCard from './ConversionCard';

const BUDGET_RANGES = [
  { label: 'All Budgets', value: 'All' },
  { label: 'Under ₹10L', min: 0, max: 1000000 },
  { label: '₹10–15L', min: 1000000, max: 1500000 },
  { label: '₹15–25L', min: 1500000, max: 2500000 },
  { label: '₹25L+', min: 2500000, max: Infinity }
];

export default function ServiceProjectGrid({ projects, basePath }: { projects: Project[], basePath?: string }) {
  const [budget, setBudget] = useState('All');
  const [style, setStyle] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
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
  }, [budget, style, projects]);

  const styles = ['All', ...new Set(projects.map(p => p.style))];

  // Insert ConversionCard at ~40% mark, ensuring it's not first or last if possible
  let insertIndex = Math.max(1, Math.floor(filteredProjects.length * 0.4));
  if (filteredProjects.length > 0 && insertIndex >= filteredProjects.length) {
    insertIndex = filteredProjects.length - 1; 
  }
  if (filteredProjects.length === 1) {
    insertIndex = 1; // Put it after the single project
  }

  return (
    <div style={{ marginTop: '40px', marginBottom: '80px', padding: '0 20px' }}>
      <div className="portfolio-toolbar" style={{ borderBottom: '1px solid var(--line)', marginBottom: '40px', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%', overflow: 'hidden' }}>
          
          {BUDGET_RANGES.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginRight: '16px', width: '60px', flexShrink: 0 }}>Budget</span>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }} className="hide-scrollbar">
                {BUDGET_RANGES.map(b => (
                  <button
                    key={b.label}
                    onClick={() => setBudget(b.label)}
                    style={{
                      padding: '8px 16px', fontSize: '12px', borderRadius: '30px', flexShrink: 0,
                      border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
                      background: budget === b.label ? 'var(--charcoal)' : 'transparent',
                      color: budget === b.label ? 'var(--ivory)' : 'var(--muted)',
                      borderColor: budget === b.label ? 'var(--charcoal)' : 'var(--line)'
                    }}
                  >
                    {b.label}
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
          )}
          
        </div>
      </div>

      <div className="service-grid service-grid-large">
        {filteredProjects.map((p, i) => {
          const showCardHere = i === insertIndex;
          
          const projectCard = (
            <article className="service-card" key={p.slug}>
              <img src={p.image} alt={p.title} />
              <div className="service-card-copy">
                <div className="eyebrow" style={{ color: 'var(--charcoal)' }}>PROJECT</div>
                <h2>{p.title}</h2>
                <p style={{ fontWeight: 500, margin: '8px 0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
                  {p.areaSqFt} sq ft · {p.timelineWeeks} weeks · {p.budgetLabel} · {p.location}
                </p>
                <p style={{ marginTop: '12px' }}>{p.description}</p>
                <Link href={basePath ? `${basePath}/${p.slug}` : `/projects/${p.slug}`}>
                  View Project <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          );

          if (showCardHere) {
            return (
              <div key={`${p.slug}-wrapper`} style={{ display: 'contents' }}>
                <ConversionCard />
                {projectCard}
              </div>
            );
          }

          return projectCard;
        })}

        {/* If insert index is after the very last item */}
        {filteredProjects.length > 0 && insertIndex === filteredProjects.length && (
          <ConversionCard key="conversion-card" />
        )}

        {filteredProjects.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            No projects match your selected criteria.
          </div>
        )}
      </div>
    </div>
  );
}
