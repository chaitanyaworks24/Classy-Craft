'use client';

import { useState } from 'react';
import { ALL_SHOWCASE_ITEMS, ShowcaseItem } from '@/lib/studio-data';
import { encodeShowcaseToken, DEFAULT_SHOWCASE_SETTINGS, ShowcaseSettings } from '@/lib/showcase-token';
import { companyConfig } from '@/data/company';
import { Check, Copy, ExternalLink, MessageCircle, X } from 'lucide-react';

export default function CreateShowcasePage() {
  const [clientName, setClientName] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [settings, setSettings] = useState<ShowcaseSettings>(DEFAULT_SHOWCASE_SETTINGS);
  
  const [primaryFilter, setPrimaryFilter] = useState<'All' | 'Full Projects' | 'Room-wise'>('All');
  const [homeTypeFilter, setHomeTypeFilter] = useState<string>('All');
  
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (!clientName.trim()) {
      alert('Please enter a client name.');
      return;
    }
    if (selectedIds.length === 0) {
      alert('Choose at least one item to create a Showcase.');
      return;
    }
    const token = encodeShowcaseToken(clientName.trim(), selectedIds, settings);
    setGeneratedUrl(`${window.location.origin}/showcase/${token}`);
  };

  const getWhatsAppLink = () => {
    if (!generatedUrl) return '#';
    const msg = `Hi ${clientName.trim()}, I’ve put together a few projects that I think are relevant to what you’re looking for. Have a look here:\n${generatedUrl}`;
    return `https://wa.me/${companyConfig.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const filteredItems = ALL_SHOWCASE_ITEMS.filter(item => {
    if (primaryFilter === 'Full Projects' && item.kind !== 'project') return false;
    if (primaryFilter === 'Room-wise' && item.kind !== 'portfolio') return false;
    
    if (primaryFilter === 'Full Projects' && homeTypeFilter !== 'All') {
      if (homeTypeFilter === 'Full Home') {
        if (!item.category?.includes('BHK') && !item.category?.includes('Villa')) return false;
      } else {
        if (!item.category?.includes(homeTypeFilter)) return false;
      }
    }
    return true;
  });

  const selectedProjectsCount = selectedIds.filter(id => ALL_SHOWCASE_ITEMS.find(i => i.id === id)?.kind === 'project').length;
  const selectedPortfolioCount = selectedIds.filter(id => ALL_SHOWCASE_ITEMS.find(i => i.id === id)?.kind === 'portfolio').length;

  const allFilteredSelected = filteredItems.length > 0 && filteredItems.every(i => selectedIds.includes(i.id));

  const handleToggleAll = () => {
    if (allFilteredSelected) {
      const filteredIds = filteredItems.map(i => i.id);
      setSelectedIds(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...filteredItems.map(i => i.id)])));
    }
  };

  if (generatedUrl) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: '#e6f4ea', color: '#137333', marginBottom: '24px' }}>
          <Check size={32} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0 0 16px' }}>
          Showcase Ready
        </h1>
        <p style={{ color: 'var(--muted)', margin: '0 0 40px', fontSize: '15px' }}>
          Showcase for {clientName} · {selectedIds.length} items selected
        </p>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '24px', borderRadius: '8px', marginBottom: '40px', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '14px', fontFamily: 'monospace', color: 'var(--charcoal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }}>
            {generatedUrl}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(generatedUrl)}
            className="outline-btn" style={{ padding: '8px 12px', minHeight: 'auto', flexShrink: 0 }}
          >
            <Copy size={14} style={{ marginRight: '6px' }}/> Copy Link
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="dark-btn" style={{ background: '#25D366', borderColor: '#25D366' }}>
            <MessageCircle size={16} style={{ marginRight: '8px' }}/> Share on WhatsApp
          </a>
          <a href={generatedUrl} target="_blank" rel="noopener noreferrer" className="outline-btn">
            <ExternalLink size={16} style={{ marginRight: '8px' }}/> Open Showcase
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '32px', fontWeight: 500, margin: '0 0 24px' }}>
          Create Showcase
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* Left: Project Selection */}
        <div style={{ minWidth: 0 }}>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: '12px' }}>
              Who is this showcase for?
            </label>
            <input 
              type="text" 
              placeholder="Client Name (e.g. Aniket Sharma)"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', border: '1px solid var(--line)', fontSize: '15px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>
              Choose Content
            </label>
            <button 
              onClick={handleToggleAll} 
              className="outline-btn" style={{ padding: '6px 12px', minHeight: 'auto', fontSize: '10px' }}
            >
              {allFilteredSelected ? 'Deselect All Shown' : 'Select All Shown'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {['All', 'Full Projects', 'Room-wise'].map(cat => (
              <button 
                key={cat}
                onClick={() => setPrimaryFilter(cat as any)}
                style={{ 
                  padding: '6px 12px', fontSize: '12px', borderRadius: '20px', border: '1px solid',
                  background: primaryFilter === cat ? 'var(--charcoal)' : 'transparent',
                  color: primaryFilter === cat ? '#fff' : '#666',
                  borderColor: primaryFilter === cat ? 'var(--charcoal)' : 'var(--line)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {primaryFilter === 'Full Projects' && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
              {['All', '1 BHK', '2 BHK', '3 BHK', 'Villa', 'Commercial'].map(homeType => (
                <button 
                  key={homeType}
                  onClick={() => setHomeTypeFilter(homeType)}
                  style={{ 
                    padding: '6px 12px', fontSize: '11px', borderRadius: '20px', border: '1px solid',
                    background: homeTypeFilter === homeType ? '#eee' : 'transparent',
                    color: '#444',
                    borderColor: homeTypeFilter === homeType ? '#ddd' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {homeType}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {filteredItems.map(item => {
              const selected = selectedIds.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  style={{ 
                    border: `1px solid ${selected ? 'var(--charcoal)' : 'var(--line)'}`, 
                    background: 'var(--surface)', 
                    cursor: 'pointer', 
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ height: '140px', background: 'var(--stone)' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontFamily: 'var(--font-playfair)', fontSize: '14px', fontWeight: 500, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      {item.kind === 'portfolio' ? 'Portfolio Category' : item.category}
                    </div>
                  </div>
                  {selected && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--charcoal)', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Settings & Generate */}
        <div style={{ position: 'sticky', top: '40px', background: 'var(--surface)', border: '1px solid var(--line)', padding: '24px' }}>
          
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: '12px' }}>
              Selected Content
            </div>
            {selectedIds.length === 0 ? (
              <div style={{ fontSize: '13px', color: 'var(--muted)', padding: '16px', background: 'var(--surface)', border: '1px dashed var(--line)', textAlign: 'center' }}>
                No items selected yet.
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '12px', fontWeight: 500 }}>
                  {selectedIds.length} items selected ({selectedProjectsCount} project{selectedProjectsCount !== 1 ? 's' : ''} · {selectedPortfolioCount} portfolio categor{selectedPortfolioCount !== 1 ? 'ies' : 'y'})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
                  {selectedIds.map((id, index) => {
                    const item = ALL_SHOWCASE_ITEMS.find(i => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', padding: '8px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                        <div style={{ color: 'var(--muted)', fontSize: '10px', minWidth: '16px' }}>{index + 1}.</div>
                        <div style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                        <button onClick={(e) => { e.stopPropagation(); toggleItem(id); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}><X size={14}/></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)', marginBottom: '16px' }}>
            Showcase Settings
          </div>
          
          <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.showProjectDetails} onChange={e => setSettings({...settings, showProjectDetails: e.target.checked})} />
              Show project details
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.showBudget} onChange={e => setSettings({...settings, showBudget: e.target.checked})} />
              Show budget
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.showLocation} onChange={e => setSettings({...settings, showLocation: e.target.checked})} />
              Show location
            </label>
            <div style={{ height: '1px', background: 'var(--line)', margin: '8px 0' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.showEstimateCTA} onChange={e => setSettings({...settings, showEstimateCTA: e.target.checked})} />
              Show Get Estimate button
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={settings.showWhatsAppCTA} onChange={e => setSettings({...settings, showWhatsAppCTA: e.target.checked})} />
              Show WhatsApp button
            </label>
          </div>

          <button onClick={handleGenerate} className="dark-btn" style={{ width: '100%', marginBottom: '12px' }}>
            Generate Showcase
          </button>
          
        </div>

      </div>
    </div>
  );
}
