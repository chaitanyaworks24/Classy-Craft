import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { credibilityStats, companyConfig } from '@/data/company';
import GoogleReviews from '@/components/GoogleReviews';
import FaqAccordion from '@/components/FaqAccordion';
import { getEffectiveHeroImages, getEffectiveRooms } from '@/lib/studio-overrides';

const heroTemplate = '/assets/High-quality images/3.png';
const planTemplate = '/assets/High-quality images/8.png';

export default function Home() {
  const heroImages = getEffectiveHeroImages([heroTemplate, planTemplate]);
  const hero = heroImages[0] || heroTemplate;
  const plan = heroImages[1] || planTemplate;
  const effectiveRooms = getEffectiveRooms();
  
  const roomCards = [
    ['Kitchen', 'kitchen', effectiveRooms.find(r => r.slug === 'kitchen')?.images[0] || '/assets/rooms/Kitchen/imgi_19_138-1775458964-w17LJ.webp'],
    ['Living Room', 'living-room', effectiveRooms.find(r => r.slug === 'living-room')?.images[0] || '/assets/rooms/living room/imgi_11_lr-2-1785987661-X3R94.png'],
    ['Bedrooms', 'bedrooms', effectiveRooms.find(r => r.slug === 'bedroom')?.images[0] || '/assets/rooms/bedroom/imgi_11_06-1785331585-TpqGR.jpg'],
    ['Wardrobes', 'wardrobes', effectiveRooms.find(r => r.slug === 'wardrobes')?.images[0] || '/assets/rooms/wardrobes/imgi_36_77-1780901142-4H9hu.jpg']
  ];
  return (
    <main>
      <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(15,14,12,.62),rgba(15,14,12,.18) 70%),url('${hero}')`}}>
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="eyebrow light">HOME INTERIORS · BESPOKE DESIGN</div>
            <h1>A home that feels<br/>beautifully yours.</h1>
            <p>We translate your personal aesthetic into living, breathing spaces. Expert craftsmanship, tailored to the rhythm of your life.</p>
            <div className="hero-actions">
              <Link className="gold-btn" href="/contact">Talk to a Designer <ArrowRight size={15}/></Link>
              <Link className="outline-btn light-btn" href="/estimate">Check Your Interior Budget</Link>
            </div>
          </div>
          <div className="hero-proof">
            <div><span>01</span><b>Personalised Design</b><small>Tailored to your unique lifestyle.</small></div>
            <div><span>02</span><b>Practical Planning</b><small>Space optimization at its finest.</small></div>
            <div><span>03</span><b>End-to-End Support</b><small>From concept to final handover.</small></div>
          </div>
        </div>
      </section>
      
      <section className="split-section">
        <div className="split-copy">
          <div className="eyebrow">START WITH A CONVERSATION</div>
          <h2>Planning your new home?</h2>
          <p>Our design experts are ready to turn your vision into a meticulously crafted reality. Let's discuss your ideas, lifestyle requirements, and aspirations.</p>
          <Link className="dark-btn" href="/contact">Get a Free Consultation <ArrowRight size={15}/></Link>
        </div>
        <div className="image-frame tall"><img src={plan} alt="Interior design planning model"/></div>
      </section>
      
      <section className="philosophy">
        <div className="eyebrow gold">OUR PHILOSOPHY</div>
        <h2>Good design makes everyday living feel easier.</h2>
        <p>True luxury lies in intentionality. Every texture chosen, every line drawn, and every space planned is dedicated to creating environments that elevate your daily routines.</p>
      </section>
      
      <section className="room-section">
        <div className="section-head">
          <div>
            <div className="eyebrow">EXPLORE THE DETAILS</div>
            <h2>Designed around how you live.</h2>
          </div>
          <Link href="/projects" className="text-link">View all projects <ArrowRight size={15}/></Link>
        </div>
        <div className="room-grid">
          {roomCards.map(([name,slug,img])=>(
            <Link href={`/projects/rooms/${slug}`} className="room-card" key={name}>
              <img src={img} alt={name}/>
              <div><span>{name}</span><ArrowRight size={15}/></div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="service-band">
        <div>
          <div className="eyebrow">RESIDENTIAL + COMMERCIAL</div>
          <h2>From the first sketch to the final detail.</h2>
          <p>Explore spaces, understand our approach, and start with an honest conversation about your project.</p>
        </div>
        <div className="band-links">
          <Link href="/services/home">Home Interiors <ArrowRight size={15}/></Link>
          <Link href="/services/commercial">Commercial Interiors <ArrowRight size={15}/></Link>
          <Link href="/how-it-works">How It Works <ArrowRight size={15}/></Link>
        </div>
      </section>

      {/* NEW: Trust Section */}
      <section className="trust-section">
        <div className="trust-intro">
          <div className="eyebrow gold">WHY {companyConfig.name.toUpperCase()}</div>
          <h2>Why Bangalore Families Trust Us with Their Homes</h2>
          <p>Trust is earned, not claimed. Our reputation is built through thoughtful design, quality execution, and transparent communication throughout your interior journey.</p>
        </div>
        <div className="trust-grid">
          {credibilityStats.map((stat, i) => (
            <div key={i} className="trust-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="trust-proof-points">
          <div className="proof-point">
            <strong>Transparent Pricing</strong>
            <p>Clear, itemized estimates before execution begins.</p>
          </div>
          <div className="proof-point">
            <strong>Accountable Execution</strong>
            <p>Dedicated project management and strict quality control.</p>
          </div>
          <div className="proof-point">
            <strong>Post-Handover Support</strong>
            <p>Comprehensive warranties and reliable service after you move in.</p>
          </div>
        </div>
      </section>

      <section className="black-cta">
        <div className="eyebrow gold">READY TO BEGIN?</div>
        <h2>Let's create a space that truly reflects you.</h2>
        <Link className="gold-btn" href="/estimate">Start Your Project <ArrowRight size={15}/></Link>
      </section>

      {/* NEW: Testimonials */}
      <div className="home-reviews-wrapper">
        <GoogleReviews />
      </div>

      {/* NEW: Homeowner FAQ */}
      <section className="home-faq-section">
        <div className="faq-intro">
          <div className="eyebrow">FREQUENTLY ASKED QUESTIONS</div>
          <h2>Everything you need to know.</h2>
        </div>
        <div className="faq-content">
          <FaqAccordion />
        </div>
      </section>
      
    </main>
  );
}
