import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONTACT, FAQ_ITEMS, SEO } from '../data/iptvData';
import { ChapterMark, Check, GlassButton, WhatsAppGlyph } from './ui';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="bg-page py-12 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        {/* Chapter 11 — the last numbered section before the closing CTA. */}
        <div className="text-center">
          <ChapterMark n={11} />
          <span className="eyebrow">Fragen</span>
          <h2 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
            <span className="text-ink underline decoration-orange decoration-2 underline-offset-4">
              FAQ
            </span>{' '}
            <span className="text-muted">—</span>{' '}
            <span className="text-orange-deep">{SEO.keyword}</span>{' '}
            <span className="text-muted">(IPTV Deutschland)</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[64ch] text-[15px] leading-relaxed text-muted">
            Alles zu Aktivierung, Installation, Kompatibilität und Support unseres{' '}
            <strong className="font-bold text-ink">Premium-IPTV</strong>.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Accordion */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="overflow-hidden rounded-xl card-hairline">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-bold text-ink">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-orange-deep transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="animate-fadeIn border-t border-hairline px-5 py-4 text-[14px] leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Support sidebar */}
          <aside className="h-fit rounded-2xl border border-orange/30 bg-surface-2 px-6 py-7">
            <h3 className="text-xl font-extrabold text-ink">Direkt Hilfe nötig?</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Melde dich über WhatsApp — schnelle Hilfe und persönlicher Support.
            </p>

            <GlassButton
              variant="secondary"
              size="md"
              fullWidth
              className="mt-5"
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppGlyph className="text-wa" /> WhatsApp • Direkter Kontakt
            </GlassButton>

            <ul className="mt-5 space-y-2.5 text-[13.5px] font-semibold text-ink">
              {[
                'Sofortige Aktivierung (keine Wartezeit)',
                'HD/4K stabil & unbegrenzt',
                'Installationshilfe inklusive',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <Check className="text-orange-deep" />
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-center text-[12px] text-muted">
              Oder schreib uns einfach per{' '}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange-deep underline underline-offset-2"
              >
                WhatsApp
              </a>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};
