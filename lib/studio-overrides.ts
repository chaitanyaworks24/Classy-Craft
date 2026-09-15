import { roomCollections, RoomCollection } from '@/data/rooms';
import { projects, Project } from '@/data/projects';
import { homeServices, commercialServices } from '@/data/services';
import { serviceCollections, ServiceCollection } from '@/data/servicesDetailed';

let manifest: any = null;

try {
  manifest = require('@/data/generated/studio-assets.json');
} catch (e) {
  // Silent fallback if manifest is not generated yet
}

function mergeImages(templateImages: string[], studioImages: string[] | undefined): string[] {
  if (!studioImages || studioImages.length === 0) return templateImages;
  
  const result = [...studioImages];
  if (templateImages.length > studioImages.length) {
    result.push(...templateImages.slice(studioImages.length));
  }
  return result;
}

export function getEffectiveRooms(): RoomCollection[] {
  return roomCollections.map(room => {
    const studioImages = manifest?.rooms?.[room.slug];
    return {
      ...room,
      images: mergeImages(room.images, studioImages)
    };
  });
}

export function getEffectiveRoom(slug: string): RoomCollection | undefined {
  const rooms = getEffectiveRooms();
  return rooms.find(r => r.slug === slug);
}

export function getEffectiveProjects(): Project[] {
  return projects.map(proj => {
    const studioImages = manifest?.projects?.[proj.slug];
    if (studioImages && studioImages.length > 0) {
      return {
        ...proj,
        image: studioImages[0], // First image is cover
        gallery: mergeImages(proj.gallery, studioImages),
        // If they provided studio images, but no explicit before images for this studio yet, we empty beforeImages for safety.
        beforeImages: [] 
      };
    }
    return proj;
  });
}

export function getEffectiveProject(slug: string): Project | undefined {
  return getEffectiveProjects().find(p => p.slug === slug);
}

export function getEffectiveServiceCollections(): ServiceCollection[] {
  return serviceCollections.map(collection => {
    if (collection.group === 'commercial') {
      const studioImages = manifest?.commercial?.[collection.slug];
      return {
        ...collection,
        images: mergeImages(collection.images || [], studioImages)
      };
    }
    return collection;
  });
}

export function getEffectiveServiceCollection(slug: string): ServiceCollection | undefined {
  return getEffectiveServiceCollections().find(s => s.slug === slug);
}

export function getEffectiveHomeServices() {
  const effProjects = getEffectiveProjects();
  return homeServices.map(service => {
    // Find the matching service collection to get project IDs
    const collection = serviceCollections.find(s => s.slug === service.slug);
    if (collection && collection.projectIds && collection.projectIds.length > 0) {
      // Find the first project in that collection that has an image
      const firstProj = effProjects.find(p => collection.projectIds!.includes(p.slug));
      if (firstProj && firstProj.image) {
        return {
          ...service,
          image: firstProj.image
        };
      }
    }
    return service;
  });
}

export function getEffectiveCommercialServices() {
  return commercialServices.map(service => {
    const studioImages = manifest?.commercial?.[service.slug];
    if (studioImages && studioImages.length > 0) {
      return {
        ...service,
        image: studioImages[0]
      };
    }
    return service;
  });
}

export function getEffectiveHeroImages(templateImages: string[]): string[] {
  const studioImages = manifest?.highQuality;
  return mergeImages(templateImages, studioImages);
}

export function getEffectiveContactImage(templateImage: string): string {
  const lrImages = manifest?.rooms?.['living-room'];
  if (lrImages && lrImages.length > 0) {
    return lrImages[0];
  }
  return templateImage;
}
