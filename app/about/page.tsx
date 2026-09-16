import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { credibilityStats, companyConfig } from '@/data/company';
import GoogleReviews from '@/components/GoogleReviews';
import FaqAccordion from '@/components/FaqAccordion';

const img = '/assets/High-quality images/12.png';

export default function About() {
  return (
    <main className="page">
      <section className="page-intro">
        <div>
          <div className="eyebrow">WHY {companyConfig.name.toUpperCase()}</div>
          <h1>Quietly considered. Built to last.</h1>
        </div>
        <p>Our approach starts with how a space needs to work, then builds a visual language around it.</p>
      </section>

      <section className="about-split">
        <div className="image-frame">
          <img src={img} alt="Interior detail" />
        </div>
        <div>
          <div className="eyebrow">OUR APPROACH</div>
          <h2>Good design is not decoration added at the end.</h2>
          <p>
            It is the sequence of decisions made before anything is built — proportion,
            circulation, storage, material, light and detail.
          </p>
          <ul className="check-list">
            <li><Check size={15} />Personalised planning</li>
            <li><Check size={15} />Practical material choices</li>
            <li><Check size={15} />Clear project communication</li>
            <li><Check size={15} />Attention to the final detail</li>
          </ul>
        </div>
      </section>

      <section className="credibility-section">
        <div className="credibility-grid">
          {credibilityStats.map((stat, i) => (
            <div key={i} className="credibility-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <GoogleReviews />

      <section className="faq-section">
        <h2>Questions you might have</h2>
        <FaqAccordion />
      </section>

      <section className="detail-cta">
        <div className="eyebrow">START WITH A CONVERSATION</div>
        <h2>Ready to discuss your vision?</h2>
        <p>Get an indicative starting point or speak directly with our design team.</p>
        <div>
          <Link className="gold-btn" href="/estimate">
            Get a Free Quote <ArrowRight size={15} />
          </Link>
          <Link className="outline-btn" href="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
