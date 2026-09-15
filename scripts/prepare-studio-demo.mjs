import fs from 'fs';
import path from 'path';

const activeStudio = process.env.ACTIVE_STUDIO || 'classy-craft';
const studioDir = path.join(process.cwd(), 'public', 'assets', 'studios', activeStudio);
const generatedDir = path.join(process.cwd(), 'data', 'generated');
const manifestPath = path.join(generatedDir, 'studio-assets.json');

const roomsFolders = [
  'kitchen', 'bedroom', 'living-room', 'pooja-room', 'tv-unit', 
  'wardrobes', 'foyer', 'crockery-unit', 'kids-room'
];
const projectsFolders = [
  '1bhk1', '1bhk2', '1bhk3', '2bhk1', '2bhk2', '2bhk3', '2bhk4',
  '3bhk1', '3bhk2', '3bhk4', '3bhl3', 'villa1', 'villa2', 'villa4'
];
const commercialFolders = ['office', 'restaurant', 'shop'];

function getImagesInFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return [];
  const files = fs.readdirSync(folderPath);
  // Sort files for determinism
  return files
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort()
    .map(file => `/assets/studios/${activeStudio}/${path.basename(folderPath)}/${file}`);
}

function prepare() {
  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  const manifest = {
    rooms: {},
    projects: {},
    commercial: {},
    highQuality: []
  };

  if (fs.existsSync(studioDir)) {
    // Rooms
    for (const room of roomsFolders) {
      manifest.rooms[room] = getImagesInFolder(path.join(studioDir, room));
    }
    // Projects
    for (const proj of projectsFolders) {
      manifest.projects[proj] = getImagesInFolder(path.join(studioDir, proj));
    }
    // Commercial
    for (const comm of commercialFolders) {
      manifest.commercial[comm] = getImagesInFolder(path.join(studioDir, comm));
    }
    // High Quality
    manifest.highQuality = getImagesInFolder(path.join(studioDir, 'high-quality'));
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Asset manifest prepared for ${activeStudio}`);
}

prepare();
