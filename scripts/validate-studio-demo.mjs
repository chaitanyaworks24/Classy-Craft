import fs from 'fs';
import path from 'path';

const activeStudio = process.env.ACTIVE_STUDIO || 'classy-craft';
const profilePath = path.join(process.cwd(), 'data', 'studios', `${activeStudio}.json`);
const studiosDir = path.join(process.cwd(), 'public', 'assets', 'studios');

function validate() {
  if (!fs.existsSync(profilePath)) {
    console.error(`❌ Validation failed: Studio profile not found at ${profilePath}. Check ACTIVE_STUDIO env var.`);
    process.exit(1);
  }

  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  
  if (!profile.slug) {
    console.error(`❌ Validation failed: studio-profile.json must have a "slug" field.`);
    process.exit(1);
  }

  if (profile.slug !== activeStudio) {
    console.error(`❌ Validation failed: ACTIVE_STUDIO environment variable ("${activeStudio}") does not match profile slug ("${profile.slug}").`);
    process.exit(1);
  }

  if (fs.existsSync(studiosDir)) {
    const dirs = fs.readdirSync(studiosDir).filter(f => fs.statSync(path.join(studiosDir, f)).isDirectory());

    if (!dirs.includes(profile.slug)) {
      console.error(`❌ Validation failed: Missing asset folder for ${profile.slug} in ${studiosDir}`);
      process.exit(1);
    }

    // Strip non-active folders for isolation
    dirs.forEach(dir => {
      if (dir !== profile.slug) {
        console.log(`🧹 Stripping non-active studio folder: ${dir}`);
        fs.rmSync(path.join(studiosDir, dir), { recursive: true, force: true });
      }
    });
  }

  // Validate logo
  if (!profile.logo) {
    console.error(`❌ Validation failed: studio-profile.json must have a "logo" field.`);
    process.exit(1);
  }

  console.log(`✅ Studio validation passed for: ${activeStudio}`);
}

validate();
