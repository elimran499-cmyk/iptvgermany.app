import React from 'react';
import { Clock, Link2, Lock, ShieldCheck, Star, Zap } from 'lucide-react';
import { BRAND, CONTACT, PAYMENT_ICONS, PAYMENT_ICONS_ALT } from '../data/iptvData';
import { Logo, WhatsAppGlyph } from './ui';

const LEGAL = ['Datenschutz', 'Rückerstattung', 'AGB', 'Impressum'];

export const Footer: React.FC = () => (
  <footer className="border-t border-hairline bg-page">
    <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <h3 className="text-[13px] font-extrabold tracking-[0.18em] text-orange-deep">
            {BRAND.full}
          </h3>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Entdecke das ultimative <strong className="font-bold text-ink">IPTV-Abo</strong> für{' '}
            <strong className="font-bold text-ink">IPTV Deutschland</strong>: tausende Sender, Filme,
            Serien und Live-Sport in <strong className="font-bold text-ink">HD/4K-Qualität</strong>.
            Das <strong className="font-bold text-ink">beste IPTV</strong> — ohne Verpflichtungen.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-[12px] font-semibold text-ink">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-deep" /> Stabil
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-[12px] font-semibold text-ink">
              <Zap className="h-3.5 w-3.5 text-orange-deep" /> Schnell
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1.5 text-[12px] font-semibold text-ink">
              <WhatsAppGlyph className="h-3.5 w-3.5 text-wa" /> 24/7 Support
            </span>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-[13px] font-extrabold tracking-[0.18em] text-orange-deep">SEITEN</h3>
          <ul className="mt-4 space-y-3">
            {[
              { label: 'Sender', href: '#channels' },
              { label: 'Filme & Serien', href: '#films' },
              { label: 'Pakete', href: '#pricing' },
              { label: 'Geräte', href: '#apps' },
              { label: 'So funktioniert es', href: '#how' },
              { label: 'Bewertungen', href: '#reviews' },
              { label: 'FAQ', href: '#faq' },
            ].map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  className="text-[14px] font-semibold text-muted no-underline transition-colors hover:text-orange-deep"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[13px] font-extrabold tracking-[0.18em] text-orange-deep">KONTAKT</h3>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li className="flex items-center gap-2.5">
              <WhatsAppGlyph className="h-4 w-4 text-wa" />
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-ink hover:text-orange-deep"
              >
                Chat über WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <Clock className="h-4 w-4" /> Support an 7 Tagen die Woche
            </li>
            <li className="flex items-center gap-2.5 text-muted">
              <Zap className="h-4 w-4" /> Aktivierung in 5–15 Min.
            </li>
          </ul>
        </div>

        {/* Secure payment card */}
        <div className="h-fit rounded-2xl bg-tint px-5 py-5">
          <p className="flex items-center justify-center gap-2 text-[14px] font-bold text-ink">
            <Lock className="h-4 w-4" /> Sicher bezahlen
          </p>
          <div className="mt-4 flex justify-center">
            <img
              src={PAYMENT_ICONS}
              alt={PAYMENT_ICONS_ALT}
              loading="lazy"
              decoding="async"
              className="h-[28px] w-auto max-w-full object-contain"
            />
          </div>
          <p className="mt-4 text-center text-[12px] font-semibold leading-relaxed text-ink/70">
            Gesicherte Zahlung mit Visa, Mastercard, American Express, Apple Pay &amp; Google Pay
          </p>
        </div>
      </div>

      {/* Partner links */}
      <div className="mt-12 border-t border-hairline pt-8">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-extrabold text-ink">Partnerseiten</h3>
          <span className="h-px w-16 bg-gradient-to-r from-orange to-transparent" />
        </div>
        <a href="#top"
          className="mt-4 inline-flex items-center gap-2.5 text-[14px] font-semibold text-muted no-underline hover:text-orange-deep"
        >
          <Link2 className="h-4 w-4" /> IPTV-Abonnement
        </a>
      </div>

      {/* Trust chips */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-hairline pt-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[13px] font-semibold text-ink">
          <ShieldCheck className="h-4 w-4 text-orange-deep" /> SSL-gesichert
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[13px] font-semibold text-ink">
          <Star className="h-4 w-4 text-orange-deep" /> 4,9/5 Bewertung
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-[13px] font-semibold text-ink">
          <span aria-hidden="true">🇩🇪</span> Deutscher Service
        </span>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 flex flex-col items-center gap-6 border-t border-hairline pt-8 pb-[env(safe-area-inset-bottom)] lg:flex-row lg:justify-between">
        <p className="text-[13px] text-muted">
          © 2026 {BRAND.full} — Premium IPTV Deutschland. Alle Rechte vorbehalten.
        </p>
        <Logo />
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {LEGAL.map((item) => (
            <li key={item}>
              <a href="#top"
                className="text-[13px] font-semibold text-muted no-underline transition-colors hover:text-orange-deep"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </footer>
);
