import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { serviceCollections } from '@/data/servicesDetailed';
import { getEffectiveProject, getEffectiveProjects } from '@/lib/studio-overrides';

export function generateStaticParams() {
  const params: { slug: string; projectId: string }[] = [];
  serviceCollections.filter(x => x.group === 'home').forEach(service => {
    (service.projectIds || []).forEach(projectId => {
      params.push({ slug: service.slug, projectId });
    });
  });
  return params;
}

export default async function ProjectDetail({params}: {params: Promise<{slug: string; projectId: string}>}) {
  const {slug, projectId} = await params;
  const service = serviceCollections.find(x => x.group === 'home' && x.slug === slug);
  if (!service) notFound();
  
  if (!service.projectIds?.includes(projectId)) notFound();
  const project = getEffectiveProject(projectId);
  if (!project) notFound();

  return <main className="page">
    <section className="page-intro">
      <div><div className="eyebrow">{service.title.toUpperCase()}</div><h1>{project.title}</h1></div>
      <p>{project.description}</p>
    </section>
    
    <section className="service-detail-intro">
      <div className="service-detail-copy">
        <div className="eyebrow">PROJECT SPOTLIGHT</div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <Link className="dark-btn" href="/contact">Discuss your project <ArrowRight size={15}/></Link>
      </div>
      <div className="service-detail-feature">
        <img src={project.image} alt={project.title}/>
      </div>
    </section>
    
    {project.beforeImages && project.beforeImages.length > 0 && (
      <>
        <div className="finished-gallery-label">
          <div className="eyebrow">THE TRANSFORMATION</div>
        </div>
        <section className="before-gallery">
          {project.beforeImages.map((src, i) => (
            <div className={`before-gallery-item ${i === 0 && project.beforeImages!.length % 2 !== 0 ? 'wide' : ''}`} key={src}>
               <div className="before-label">BEFORE</div>
               <img src={src} alt={`Before condition ${i + 1}`} />
            </div>
          ))}
        </section>
        
        <div className="finished-gallery-label" style={{ marginTop: '24px' }}>
          <div className="eyebrow">THE FINISHED SPACE</div>
        </div>
      </>
    )}
    
    {project.gallery.length > 1 && (
      <section className="collection-detail-grid">
        {project.gallery.slice(1).map((src, i) => (
          <div className="collection-detail-image" key={src}>
            <img src={src} alt={`${project.title} reference ${i + 2}`}/>
          </div>
        ))}
      </section>
    )}

    <section className="detail-cta">
      <div className="eyebrow">START WITH A CONVERSATION</div>
      <h2>Planning a home project?</h2>
      <p>Get an indicative starting point or speak directly with our team.</p>
      <div><Link className="gold-btn" href="/estimate">Get a Free Quote <ArrowRight size={15}/></Link><Link className="outline-btn" href="/contact">Contact Us</Link></div>
    </section>
  </main>
}
