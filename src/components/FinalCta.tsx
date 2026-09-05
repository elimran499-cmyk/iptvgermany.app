import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND, CONTACT } from '../data/iptvData';
import { GlassButton, WhatsAppGlyph } from './ui';

/** The one full-bleed gradient band on the page — orange → magenta, white
 * type, glass buttons riding on top of it. Everything either side of this
 * section is white or the warm tint, so this is where the brand gradient
 * gets to be loud. */
export const FinalCta: React.FC = () => {
  return (
  <section
    id="final-cta"
    className="relative overflow-hidden py-12 sm:py-20"
    style={{ background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-magenta) 100%)' }}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" />
    <div className="relative mx-auto max-w-[1180px] px-5 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white">
        Bereit zum Schauen?
      </span>
      {/* A closer, not a numbered chapter — it takes the editorial type scale
          but no ChapterMark, whose orange rule would vanish on this gradient. */}
      <h2 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-white">
        Hol dir {BRAND.full}
        <br />
        in HD-/4K-Qualität — ab heute
      </h2>

      <p className="mt-6 text-[15px] font-bold text-white/90">
        WhatsApp-Support &amp; sofortige Aktivierung:
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <GlassButton
          variant="secondary"
          size="lg"
          fullWidth
          className="sm:w-auto sm:max-w-[300px]"
          href="#pricing"
        >
          Preise ansehen <ArrowRight className="h-4 w-4" />
        </GlassButton>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-btn flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-[15px] font-bold text-white no-underline sm:w-auto sm:max-w-[320px]"
          style={{ background: 'rgba(255,255,255,0.16)', borderColor: 'rgba(255,255,255,0.4)' }}
        >
          <WhatsAppGlyph className="h-5 w-5" /> WhatsApp-Kontakt <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
  );
};
