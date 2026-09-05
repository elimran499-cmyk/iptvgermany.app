import React from 'react';
import { ArrowRight, Flag, Lock, Star, Zap } from 'lucide-react';
import { BENEFITS, SEO } from '../data/iptvData';
import { Check, GlassButton, NavyPill, SectionHeading, WhatsAppGlyph } from './ui';

const PILLS = [
  { label: 'Sichere Zahlung', icon: <Lock className="h-3.5 w-3.5" /> },
  { label: 'Aktivierung 5–15 Min.', icon: <Zap className="h-3.5 w-3.5" /> },
  { label: 'HD/4K Qualität', icon: <Star className="h-3.5 w-3.5" /> },
  { label: 'WhatsApp 24/7', icon: <WhatsAppGlyph className="h-3.5 w-3.5" /> },
  { label: 'Fokus auf Deutschland', icon: <Flag className="h-3.5 w-3.5" /> },
];

export const Benefits: React.FC = () => {
  return (
  <section id="vorteile" className="bg-tint py-12 sm:py-20">
    <div className="mx-auto max-w-[1180px] px-5">
      <SectionHeading index={5} eyebrow="Vorteile">
        {SEO.keyword} — die Vorteile des besten IPTV in Deutschland
      </SectionHeading>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        {PILLS.map((pill) => (
          <NavyPill key={pill.label} icon={pill.icon}>
            {pill.label}
          </NavyPill>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((card) => (
          <article key={card.id} className="card-lift card-hairline rounded-2xl px-6 py-6">
            <h3 className="flex items-start gap-2.5 text-[17px] font-extrabold leading-snug text-ink">
              <Check className="mt-1 text-orange-deep" />
              {card.title}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{card.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <GlassButton variant="primary" size="lg" href="#pricing">
          Heute starten — Preise ansehen
          <ArrowRight className="h-4 w-4" />
        </GlassButton>
      </div>
    </div>
  </section>
  );
};
