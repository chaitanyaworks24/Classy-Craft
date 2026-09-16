import Link from 'next/link';
import { companyConfig } from '@/data/company';
import { getStudioLeads, getStudioShowcases } from '@/lib/studio-data';

export default function StudioDashboard() {
  const leads = getStudioLeads();
  const showcases = getStudioShowcases();

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0 0 8px' }}>
          Good morning, {companyConfig.name}
        </h1>
        <p style={{ color: 'var(--muted)', margin: 0, fontSize: '15px' }}>
          Here’s what’s happening with your studio.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '50px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '24px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: '8px' }}>New Leads</div>
          <div style={{ fontSize: '36px', fontFamily: 'var(--font-playfair)' }}>{leads.filter(l => l.status === 'New').length}</div>
        </div>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '24px' }}>
          <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: '8px' }}>Showcases</div>
          <div style={{ fontSize: '36px', fontFamily: 'var(--font-playfair)' }}>{showcases.length}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', fontWeight: 500, margin: 0 }}>Recent Leads</h2>
        <Link href="/studio/showcase/create" className="dark-btn" style={{ minHeight: '36px', padding: '8px 16px', fontSize: '10px' }}>
          Create Showcase
        </Link>
      </div>

      <style>{`
        .lead-row {
          display: flex;
          gap: 16px;
          background: #fff;
          border: 1px solid var(--line);
          padding: 16px 20px;
          align-items: center;
        }
        .lead-col-name { flex: 1.5; min-width: 0; font-weight: 500; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lead-col-req { flex: 1.5; min-width: 0; font-size: 13px; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lead-col-bud { flex: 1; min-width: 0; font-size: 13px; color: #666; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lead-col-status { width: 100px; flex-shrink: 0; font-size: 12px; }
        .lead-col-time { width: 100px; flex-shrink: 0; font-size: 12px; color: #999; text-align: right; }
        
        @media (max-width: 900px) {
          .lead-row {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 8px;
            padding: 16px;
          }
          .lead-col-name { grid-column: 1; grid-row: 1; }
          .lead-col-status { grid-column: 2; grid-row: 1; width: auto; text-align: right; }
          .lead-col-req { grid-column: 1 / -1; grid-row: 2; white-space: normal; }
          .lead-col-bud { grid-column: 1; grid-row: 3; }
          .lead-col-time { grid-column: 2; grid-row: 3; width: auto; text-align: right; }
        }
      `}</style>

      <div style={{ display: 'grid', gap: '8px' }}>
        {leads.map(lead => (
          <div key={lead.id} className="lead-row">
            <div className="lead-col-name" style={{ fontWeight: 500, fontSize: '14px' }}>{lead.name}</div>
            <div className="lead-col-req">{lead.requirements}</div>
            <div className="lead-col-bud">{lead.budget}</div>
            <div className="lead-col-status">
              <span style={{ background: lead.status === 'New' ? '#e6f4ea' : '#f1f3f4', color: lead.status === 'New' ? '#137333' : '#5f6368', padding: '4px 8px', borderRadius: '4px' }}>
                {lead.status}
              </span>
            </div>
            <div className="lead-col-time">{lead.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
