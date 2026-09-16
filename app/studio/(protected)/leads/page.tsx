import { getStudioLeads } from '@/lib/studio-data';

export default function LeadsPage() {
  const leads = getStudioLeads();

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginBottom: '8px' }}>Studio Leads</div>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0' }}>
          Leads
        </h1>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button style={{ padding: '8px 16px', fontSize: '12px', background: 'var(--charcoal)', color: '#fff', border: 'none', borderRadius: '4px' }}>All</button>
        <button style={{ padding: '8px 16px', fontSize: '12px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: '4px' }}>New</button>
        <button style={{ padding: '8px 16px', fontSize: '12px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: '4px' }}>Contacted</button>
        <button style={{ padding: '8px 16px', fontSize: '12px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--line)', borderRadius: '4px' }}>Won</button>
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
