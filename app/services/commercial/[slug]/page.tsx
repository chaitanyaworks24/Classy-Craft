import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import { getEffectiveServiceCollections } from '@/lib/studio-overrides';

export function generateStaticParams(){return getEffectiveServiceCollections().filter(x=>x.group==='commercial').map(x=>({slug:x.slug}))}

export default async function ServiceDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const service=getEffectiveServiceCollections().find(x=>x.group==='commercial' && x.slug===slug);
  if(!service || !service.images) notFound();
  
  let intentTitle = '';
  let intentDescription = '';
  
  if (slug === 'office') {
    intentTitle = 'DESIGNED FOR THE WAY WORK HAPPENS';
    intentDescription = 'We focus on creating distinct zones for focused work areas, seamless collaboration, and formal meeting spaces. Our approach balances intelligent storage solutions with material consistency, ensuring your office environment is both highly functional and reflective of your corporate identity.';
  } else if (slug === 'restaurants') {
    intentTitle = 'DESIGNED AROUND THE EXPERIENCE';
    intentDescription = 'A successful restaurant design merges ambiance with operational efficiency. We prioritize intuitive customer flow, comfortable seating arrangements, and atmospheric lighting while ensuring smooth circulation for staff, all carefully crafted to amplify your unique brand character.';
  } else if (slug === 'shops') {
    intentTitle = 'DESIGNED TO GUIDE THE CUSTOMER';
    intentDescription = 'Retail spaces must draw attention and guide the journey. We engineer precise customer movement and optimal product visibility through strategic display zones and focused lighting, creating an engaging environment that instantly communicates your brand identity.';
  }

  return <main className="page">
    <section className="page-intro">
      <div><div className="eyebrow">COMMERCIAL INTERIORS</div><h1>{service.title}</h1></div>
      <p>{service.description} Explore the visual collection below, then speak with a designer about your project.</p>
    </section>
    <section className="service-detail-intro">
      <div className="service-detail-copy">
        <div className="eyebrow">WHAT WE DESIGN</div>
        <h2>{intentTitle}</h2>
        <p>{intentDescription}</p>
        <Link className="dark-btn" href="/contact">Discuss your project <ArrowRight size={15}/></Link>
      </div>
      <div className="service-detail-feature"><img src={service.images[0]} alt={service.title}/></div>
    </section>
    <section className="collection-detail-grid">
      {service.images.slice(1).map((src,i)=><div className="collection-detail-image" key={src}><img src={src} alt={`${service.title} reference ${i+2}`}/></div>)}
    </section>
    <section className="detail-cta">
      <div className="eyebrow">START WITH A CONVERSATION</div>
      <h2>Planning a commercial project?</h2>
      <p>Get an indicative starting point or speak directly with our team.</p>
      <div><Link className="gold-btn" href="/estimate">Get a Free Quote <ArrowRight size={15}/></Link><Link className="outline-btn" href="/contact">Contact Us</Link></div>
    </section>
  </main>
}
