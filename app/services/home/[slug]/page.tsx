import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getEffectiveServiceCollections, getEffectiveProjects } from '@/lib/studio-overrides';
import ServiceProjectGrid from '@/components/ServiceProjectGrid';

export function generateStaticParams() {
  return getEffectiveServiceCollections().filter(x => x.group === 'home').map(x => ({ slug: x.slug }))
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getEffectiveServiceCollections().find(x => x.group === 'home' && x.slug === slug);
  if (!service) notFound();

  // Map project IDs to project objects
  const effProjects = getEffectiveProjects();
  const serviceProjects = (service.projectIds || [])
    .map(id => effProjects.find(p => p.slug === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <main className="page">
      <section className="page-intro">
        <div><div className="eyebrow">HOME INTERIORS</div><h1>{service.title}</h1></div>
        <p>{service.description} Explore our specific project collections below.</p>
      </section>
      
      <ServiceProjectGrid projects={serviceProjects} basePath={`/services/home/${slug}`} />

      <section className="detail-cta">
        <div className="eyebrow">START WITH A CONVERSATION</div>
        <h2>Planning a home project?</h2>
        <p>Get an indicative starting point or speak directly with our team.</p>
        <div>
          <Link className="gold-btn" href="/estimate">Get a Free Quote <ArrowRight size={15} /></Link>
          <Link className="outline-btn" href="/contact">Contact Us</Link>
        </div>
      </section>
    </main>
  );
}
