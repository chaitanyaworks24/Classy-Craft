import Link from 'next/link';
import { getStudioShowcases } from '@/lib/studio-data';

export default function ShowcaseIndexPage() {
  const showcases = getStudioShowcases();

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginBottom: '8px' }}>Showcase</div>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0 0 16px' }}>
          Create Showcase
        </h1>
        <p style={{ color: 'var(--muted)', margin: '0 0 24px', fontSize: '15px', maxWidth: '600px' }}>
          Create a curated collection of projects and share one beautiful link with your client.
        </p>
        <Link href="/studio/showcase/create" className="dark-btn" style={{ padding: '12px 24px', fontSize: '12px' }}>
          Create Showcase
        </Link>
      </div>

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', fontWeight: 500, margin: '0 0 24px' }}>
          Your Showcases
        </h2>

        <div style={{ display: 'grid', gap: '12px' }}>
          {showcases.map(showcase => (
            <div key={showcase.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', background: 'var(--surface)', border: '1px solid var(--line)', padding: '24px', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '16px', marginBottom: '4px' }}>Showcase for {showcase.clientName}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  {showcase.projectCount} projects · {showcase.timestamp}
                </div>
              </div>
              <a href={showcase.url} target="_blank" rel="noopener noreferrer" className="outline-btn" style={{ padding: '8px 16px', fontSize: '10px' }}>
                Open Showcase
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
