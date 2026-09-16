import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import { getEffectiveRooms } from '@/lib/studio-overrides';

export default function RoomCollections(){
  const rooms = getEffectiveRooms();
  return <div className="room-collection-grid">
    {rooms.map(r=><Link className="collection-card" href={`/projects/rooms/${r.slug}`} key={r.slug}>
      <img src={r.images[0]} alt={r.name}/>
      <div><span>{r.name}</span><ArrowUpRight size={15}/></div>
    </Link>)}
  </div>
}
