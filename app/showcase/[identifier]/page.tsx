import { notFound } from 'next/navigation';
import Link from 'next/link';
import { decodeShowcaseToken } from '@/lib/showcase-token';
import { getShowcaseItem } from '@/lib/studio-data';
import { companyConfig } from '@/data/company';
import ShowcaseClient from '@/components/ShowcaseClient';

export default async function ShowcasePage({ params }: { params: Promise<{ identifier: string }> }) {
  const { identifier } = await params;
  
  const decoded = decodeShowcaseToken(identifier);
  if (!decoded) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', marginBottom: '16px' }}>Showcase Unavailable</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>This showcase link may be incorrect or no longer available.</p>
          <Link href="/" className="dark-btn">Return to {companyConfig.name}</Link>
        </div>
      </main>
    );
  }

  const { clientName, projectSlugs, settings } = decoded;
  
  const selectedItems = projectSlugs.map(id => getShowcaseItem(id)).filter(p => p !== null);
  if (selectedItems.length === 0) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', marginBottom: '16px' }}>Empty Showcase</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>This showcase doesn't contain any valid projects or collections.</p>
          <Link href="/" className="dark-btn">Return to {companyConfig.name}</Link>
        </div>
      </main>
    );
  }

  return <ShowcaseClient clientName={clientName} items={selectedItems as any} settings={settings} />;
}
