import {notFound} from 'next/navigation';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import { getEffectiveRooms, getEffectiveRoom } from '@/lib/studio-overrides';
import ConversionCard from '@/components/ConversionCard';

export function generateStaticParams(){return getEffectiveRooms().map(r=>({slug:r.slug}))}

export default async function RoomCollectionPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const room=getEffectiveRoom(slug);
  if(!room) notFound();
  return <main className="page">
    <section className="page-intro">
      <div><div className="eyebrow">PORTFOLIO · ROOM TYPE</div><h1>{room.name}</h1></div>
      <p>{room.description} Browse the collection below for visual references and ideas.</p>
    </section>
    <section className="collection-detail-grid">
      {room.images.map((src, i) => {
        const isMiddle = i === Math.floor(room.images.length / 2);
        const singularName = room.name.toLowerCase().endsWith('s') && !room.name.toLowerCase().includes('kids') 
          ? room.name.slice(0, -1) 
          : room.name;
        
        return (
          <div style={{ display: 'contents' }} key={src}>
            {isMiddle && (
              <div>
                <ConversionCard 
                  title={`YOUR ${singularName.toUpperCase()} CAN BE HERE`}
                  text={`Let's create a ${singularName.toLowerCase()} designed around the way you live.`}
                />
              </div>
            )}
            <div className={`collection-detail-image ${i === 0 ? 'featured' : ''}`}>
              <img src={src} alt={`${room.name} design ${i + 1}`} />
            </div>
          </div>
        );
      })}
    </section>
    <section className="detail-cta">
      <div className="eyebrow">LIKE WHAT YOU SEE?</div>
      <h2>Let's plan your space.</h2>
      <p>Tell us what you are building, renovating or furnishing.</p>
      <div><Link className="gold-btn" href="/estimate">Get a Free Quote <ArrowRight size={15}/></Link><Link className="outline-btn" href="/contact">Talk to a Designer</Link></div>
    </section>
  </main>
}
