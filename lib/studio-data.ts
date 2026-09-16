import { getEffectiveProjects, getEffectiveRooms, getEffectiveServiceCollections } from '@/lib/studio-overrides';
import { encodeShowcaseToken, DEFAULT_SHOWCASE_SETTINGS } from './showcase-token';

export type ShowcaseItemKind = 'project' | 'portfolio';

export interface ShowcaseItem {
  id: string;
  kind: ShowcaseItemKind;
  title: string;
  category: string;
  image: string;
  description?: string;
  location?: string;
  budgetLabel?: string;
  gallery?: string[];
  beforeImages?: string[];
  timelineWeeks?: number;
  style?: string;
  budgetMin?: number;
  budgetMax?: number;
}

export function getAllShowcaseItems(): ShowcaseItem[] {
  const items: ShowcaseItem[] = [];
  
  getEffectiveProjects().forEach(p => {
    items.push({
      id: p.slug,
      kind: 'project',
      title: p.title,
      category: p.homeType || p.category,
      image: p.image,
      description: p.description,
      location: p.location,
      budgetLabel: p.budgetLabel,
      gallery: p.gallery,
      beforeImages: p.beforeImages,
      timelineWeeks: p.timelineWeeks,
      style: p.style,
      budgetMin: p.budgetMin,
      budgetMax: p.budgetMax
    });
  });

  getEffectiveRooms().forEach(collection => {
    items.push({
      id: `portfolio-${collection.slug}`,
      kind: 'portfolio',
      title: collection.name,
      category: 'Portfolio Category',
      image: collection.images[0], 
      description: collection.description,
      location: 'Portfolio Reference',
      gallery: collection.images
    });
  });

  getEffectiveServiceCollections().filter(c => c.group === 'commercial').forEach(collection => {
    if (collection.images && collection.images.length > 0) {
      items.push({
        id: `portfolio-${collection.slug}`,
        kind: 'portfolio',
        title: collection.title,
        category: 'Commercial Category',
        image: collection.images[0],
        description: collection.description,
        location: 'Commercial Reference',
        gallery: collection.images
      });
    }
  });

  return items;
}

export const ALL_SHOWCASE_ITEMS: ShowcaseItem[] = getAllShowcaseItems();

export interface Lead {
  id: string;
  name: string;
  requirements: string;
  budget: string;
  status: 'New' | 'Contacted' | 'Won' | 'Lost';
  timestamp: string;
}

export const staticLeads: Lead[] = [
  {
    id: 'l1',
    name: 'Rahul Sharma',
    requirements: '3 BHK · Pune',
    budget: '₹15–20L',
    status: 'New',
    timestamp: '2 hours ago'
  },
  {
    id: 'l2',
    name: 'Priya Kapoor',
    requirements: 'Villa · Bengaluru',
    budget: '₹40–50L',
    status: 'Contacted',
    timestamp: 'Yesterday'
  }
];

export interface DemoShowcase {
  id: string;
  clientName: string;
  projectCount: number;
  timestamp: string;
  url: string;
}

export function getStudioLeads(): Lead[] {
  return staticLeads;
}

export function getStudioShowcases(): DemoShowcase[] {
  return [
    {
      id: 's1',
      clientName: 'Aniket Sharma',
      projectCount: ALL_SHOWCASE_ITEMS.length,
      timestamp: 'Created today',
      url: `/showcase/${encodeShowcaseToken('Aniket', ALL_SHOWCASE_ITEMS.map(i => i.id), DEFAULT_SHOWCASE_SETTINGS)}`
    },
    {
      id: 's2',
      clientName: 'Rahul M',
      projectCount: ALL_SHOWCASE_ITEMS.length,
      timestamp: 'Created yesterday',
      url: `/showcase/${encodeShowcaseToken('Rahul M', ALL_SHOWCASE_ITEMS.map(i => i.id), DEFAULT_SHOWCASE_SETTINGS)}`
    }
  ];
}

export function getShowcaseItem(id: string): ShowcaseItem | null {
  return ALL_SHOWCASE_ITEMS.find(item => item.id === id) || null;
}
