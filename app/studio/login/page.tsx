'use client';

import { useState } from 'react';
import { login } from './actions';
import { companyConfig } from '@/data/company';

export default function StudioLogin() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface)', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'var(--surface)', padding: '60px 40px', border: '1px solid var(--line)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '24px', fontWeight: 500, margin: '0 0 8px' }}>
          {companyConfig.name.toUpperCase()}
        </h1>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted)', marginBottom: '40px' }}>
          Studio Portal
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '8px' }}>Email</label>
            <input
              name="email"
              type="email"
              defaultValue="demo@studio.com"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', background: 'transparent', outline: 'none' }}
              readOnly
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '8px' }}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', background: 'transparent', outline: 'none' }}
              autoFocus
            />
          </div>

          {error && <div style={{ fontSize: '12px', color: '#d32f2f' }}>{error}</div>}

          <button type="submit" className="dark-btn" style={{ width: '100%', marginTop: '10px' }}>
            Sign In
          </button>
        </form>

        <p style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '20px' }}>Demo Access: Use "demo@123"</p>
      </div>
    </div>
  );
}
