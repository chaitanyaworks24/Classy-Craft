import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getEffectiveProjects, getEffectiveProject } from '@/lib/studio-overrides';

export function generateStaticParams() {
  return getEffectiveProjects().map(p => ({ slug: p.slug }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getEffectiveProject(slug);
  if (!p) notFound();

  return (
    <main>
      <section className="detail-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(15,14,12,.64),rgba(15,14,12,.16)),url('${p.image}')` }}>
        <div>
          <div className="eyebrow light">{p.category} · {p.homeType}</div>
          <h1>{p.title}</h1>
          <div className="detail-meta">
            <span>{p.location}</span>
            <span>{p.homeType}</span>
            <span>{p.style}</span>
          </div>
        </div>
      </section>

      <section className="story">
        <div className="story-label">
          <div className="eyebrow">THE APPROACH</div>
          <p>Designed around the way the space needs to be lived, used and experienced.</p>
        </div>
        <div>
          <h2>“The space is treated as a canvas, where light, proportion and material create the character.”</h2>
          <p>{p.description}</p>
          <p>Each decision is kept intentional — from circulation and storage to surfaces, joinery and visual rhythm — so the final space feels composed rather than decorated.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '24px',
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid var(--line)'
          }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '8px' }}>HOME TYPE</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', color: 'var(--charcoal)' }}>{p.homeType}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '8px' }}>STYLE</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', color: 'var(--charcoal)' }}>{p.style}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '8px' }}>AREA</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', color: 'var(--charcoal)' }}>{p.areaSqFt} sq ft</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '8px' }}>TIMELINE</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', color: 'var(--charcoal)' }}>{p.timelineWeeks} weeks</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '8px' }}>INVESTMENT</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', color: 'var(--charcoal)' }}>{p.budgetLabel}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '8px' }}>LOCATION</div>
              <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '18px', color: 'var(--charcoal)' }}>{p.location}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-gallery">
        {p.gallery.map((src, i) => (
          <div className={i === 0 ? 'wide' : ''} key={src}>
            <img src={src} alt={`${p.title} image ${i + 1}`} />
          </div>
        ))}
      </section>

      <section className="detail-cta">
        <div className="eyebrow">MAKE IT YOURS</div>
        <h2>Want a space like this?</h2>
        <p>Let's discuss what you are planning and what it should feel like.</p>
        <div>
          <Link className="gold-btn" href="/contact">Talk to a Designer <ArrowRight size={15} /></Link>
          <Link className="outline-btn" href="/estimate">Get Your Interior Estimate</Link>
        </div>
      </section>
    </main>
  );
}
