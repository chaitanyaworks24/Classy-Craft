import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { Inter, Playfair_Display } from 'next/font/google';
import { companyConfig } from '@/data/company';

const inter=Inter({subsets:['latin'],variable:'--font-inter',display:'swap'});
const playfair=Playfair_Display({subsets:['latin'],variable:'--font-playfair',display:'swap',weight:['500','600']});

export const metadata={
  title: `${companyConfig.name} — Crafting Spaces. Creating Experiences.`,
  description: 'A premium interior design studio digital showroom for residential and commercial interiors.'
};

function ThemeInjector() {
  const activeStudio = process.env.ACTIVE_STUDIO || 'classy-craft';
  let theme: any = {};
  try {
    const profile = require(`@/data/studios/${activeStudio}.json`);
    if (profile.theme) {
      theme = profile.theme;
    }
  } catch (e) {}

  if (!theme || Object.keys(theme).length === 0) return null;

  const vars = [
    theme.background && `--ivory: ${theme.background} !important;`,
    theme.surface && `--surface: ${theme.surface} !important;`,
    theme.border && `--stone: ${theme.border} !important;`,
    theme.text && `--charcoal: ${theme.text} !important;`,
    theme.text && `--ink: ${theme.text} !important;`,
    theme.muted && `--muted: ${theme.muted} !important;`,
    theme.accent && `--gold: ${theme.accent} !important;`,
    theme.border && `--line: ${theme.border} !important;`,
    theme.cta && `--cta: ${theme.cta} !important;`,
  ].filter(Boolean).join('');

  if (!vars) return null;

  return <style dangerouslySetInnerHTML={{ __html: `:root { ${vars} }` }} />;
}

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <ThemeInjector />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
