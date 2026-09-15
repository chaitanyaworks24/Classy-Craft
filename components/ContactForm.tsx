'use client';
import { FormEvent, useState } from 'react';
import { companyConfig } from '@/data/company';

export default function ContactForm({ type = 'contact' }: { type?: 'contact' | 'estimate' }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.formType = type;
    payload.source = 'website';
    payload.timestamp = new Date().toISOString();

    const url = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
    
    if (!url) {
      // For local testing/demo purposes, simulate a successful submission so the UI can be reviewed
      setTimeout(() => setStatus('success'), 800);
      return;
    }

    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error();
      
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong while sending your enquiry. Please try again or contact us on WhatsApp.');
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success-state">
        <h2>Thank you.</h2>
        <p>We’ve received your enquiry. A designer from {companyConfig.name} will get in touch with you shortly.</p>
        <hr />
        <p className="whatsapp-fallback">
          Prefer WhatsApp? You can also <a href={`https://wa.me/${companyConfig.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20interior%20project.`} target="_blank" rel="noreferrer">message us directly</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-row">
        <label>Full Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>Phone
          <input name="phone" required inputMode="tel" placeholder="+91" />
        </label>
      </div>
      <div className="form-row">
        <label>Email <span>(optional)</span>
          <input name="email" type="email" placeholder="you@example.com" />
        </label>
        <label>Project / Locality <span>(optional)</span>
          <input name="locality" placeholder="City or neighbourhood" />
        </label>
      </div>
      <label>Tell us a little about the project
        <textarea name="message" rows={2} placeholder="What are you planning?"></textarea>
      </label>
      
      {status === 'error' && <p className="form-status error">{errorMessage}</p>}
      
      <button className="dark-btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : (type === 'estimate' ? 'Save My Estimate' : 'Talk to a Designer')}
      </button>
    </form>
  );
}
