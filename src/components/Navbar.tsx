import React, { useEffect, useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import { BRAND, CONTACT, NAV_LINKS } from '../data/iptvData';
import { GlassButton, Logo, WhatsAppGlyph } from './ui';

/**
 * Desktop/tablet (`sm:` and up) keeps one conventional sticky bar throughout.
 *
 * Phone is deliberately different: no bar at all. Three independent floating
 * elements — a brand-fill CTA pill, a centred logo badge, a hamburger icon
 * button — appear over the live page once the user scrolls, each with its
 * own shadow and ground, `position: fixed` so they never reserve layout
 * space. Before scrolling there is nothing here; the hero's own CTAs carry
 * the fold. The badge is centred with `left-1/2 -translate-x-1/2`, so the
 * pill's width on the left can never push it off-centre.
 */
export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll while the mobile glass panel is open, and let
  // Escape close it — the panel traps nothing else.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* ── Desktop / tablet bar ─────────────────────────────────────── */}
      <div
        className={`hidden border-b bg-page/85 backdrop-blur-xl transition-colors sm:block ${
          scrolled ? 'border-hairline' : 'border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-10">
          <Logo />

          <ul className="hidden items-center gap-7 xl:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href="#pricing"
                  className="text-[14px] font-semibold tracking-wide text-muted no-underline transition-colors hover:text-orange-deep"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kontakt über WhatsApp"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-hairline text-wa transition-colors hover:border-wa/60 xl:flex"
            >
              <WhatsAppGlyph className="h-5 w-5" />
            </a>
            <GlassButton variant="primary" size="sm" href="#pricing">
              Jetzt bestellen
            </GlassButton>
            <button
              type="button"
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={open}
              aria-controls="mobile-menu-desktop"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline text-ink xl:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Slim scroll-progress line — a quiet, well-judged touch under the
            tablet/desktop bar, not a loop, so it stays outside the
            transform/opacity-only rule for looping animation. */}
        <div className="h-px w-full bg-hairline/70">
          <div
            className="h-full origin-left bg-gradient-to-r from-orange to-magenta transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${scrolled ? 1 : 0})` }}
          />
        </div>

        {open && (
          <div
            id="mobile-menu-desktop"
            className="animate-fadeIn border-t border-hairline bg-page/95 px-5 pb-6 backdrop-blur-xl xl:hidden"
          >
            <MenuLinks onNavigate={() => setOpen(false)} />
            <GlassButton
              variant="primary"
              size="lg"
              fullWidth
              className="mt-5"
              href="#pricing"
              onClick={() => setOpen(false)}
            >
              Jetzt bestellen
            </GlassButton>
          </div>
        )}
      </div>

      {/* ── Telefon-Kopfzeile — zwei Zustaende ────────────────────────────
          Oben: Wortmarke links, Menue rechts, ohne eigenen Grund. Sie liegt
          ueber dem Hero, also darf sie ihn nicht zudecken.
          Gescrollt: Angebots-Pille links, Bildmarke mittig, Menue rechts —
          drei frei stehende Elemente auf einem weichen Verlauf, damit
          durchlaufender Inhalt nicht mit ihnen kollidiert.
          `fixed`, belegt also nie Layoutplatz; der Hero haelt dafuer oben
          entsprechend Abstand. ─────────────────────────────────────────── */}
      <div className="safe-top fixed inset-x-0 top-0 z-50 px-3 sm:hidden">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 -top-3 h-[5.5rem] transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            /* Deckend ueber die gesamte Kopfzeilenhoehe, erst darunter
               ausblenden — mit der frueheren, kuerzeren Verlaufsfahne stand
               der Fliesstext noch sichtbar hinter Pille und Namen. */
            background:
              'linear-gradient(to bottom, var(--color-page) 0%, var(--color-page) 62%,' +
              ' rgba(var(--brand-a-rgb), 0) 100%)',
          }}
        />

        <div className="relative flex h-12 items-center justify-between">
          {scrolled ? (
            <a
              href="#pricing"
              className="animate-fadeIn flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full pl-3.5 pr-4 text-[13px] font-bold text-white no-underline shadow-[0_12px_26px_-12px_rgba(var(--brand-b-deep-rgb), 0.6)]"
              style={{ background: 'linear-gradient(135deg,var(--color-orange),var(--color-magenta))' }}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Paket wählen
            </a>
          ) : (
            <Logo className="h-8" />
          )}

          {/* Name der Seite mittig — absolut zentriert, damit die Breite der
              Pille links ihn nicht aus der Mitte schiebt. Nur im gescrollten
              Zustand: oben steht die Wortmarke ohnehin links.
              `pointer-events-none` auf dem Wrapper, damit der unsichtbare
              Rand des zentrierten Blocks die Pille daneben nicht abfaengt. */}
          {scrolled && (
            <span className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
              <a
                href="#top"
                aria-label={`${BRAND.full} — Startseite`}
                className="animate-fadeIn pointer-events-auto flex items-baseline whitespace-nowrap no-underline"
              >
                <span className="text-[14.5px] font-extrabold tracking-tight text-ink">
                  {BRAND.mark1}
                </span>
                <span className="text-[14.5px] font-medium tracking-tight text-muted">
                  {BRAND.mark2}
                </span>
              </a>
            </span>
          )}

          <button
            type="button"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className={`flex h-11 w-11 items-center justify-center border border-hairline bg-white/95 text-ink shadow-soft backdrop-blur-md transition-[border-radius] duration-300 ${
              scrolled ? 'rounded-2xl' : 'rounded-full'
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Mobile glass sheet ───────────────────────────────────────── */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          className="fixed inset-0 z-[70] sm:hidden"
        >
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="animate-fadeIn absolute inset-x-0 top-0 max-h-[88dvh] overflow-y-auto rounded-b-3xl border-b border-hairline bg-page/95 px-5 pb-8 pt-5 shadow-2xl backdrop-blur-xl">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg,var(--color-orange),var(--color-magenta))' }}
            />
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <MenuLinks onNavigate={() => setOpen(false)} />

            <GlassButton
              variant="primary"
              size="lg"
              fullWidth
              className="mt-5"
              href="#pricing"
              onClick={() => setOpen(false)}
            >
              Jetzt bestellen
            </GlassButton>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-xl bg-wa px-6 py-4 text-[16px] font-bold text-white shadow-card"
            >
              <WhatsAppGlyph className="h-5 w-5" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* Die Eintraege laufen gestaffelt herein — als CSS-Keyframe (.slide-in in
   index.css) statt ueber die Animationsbibliothek, die dafuer sonst im
   kritischen Pfad haengen wuerde. `prefers-reduced-motion` schaltet sie
   dort ab. */
const MenuLinks: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => (
  <ul className="flex flex-col">
    {NAV_LINKS.map((link, i) => (
      <li key={link.label} className="slide-in" style={{ animationDelay: `${i * 45}ms` }}>
        <a href="#pricing" onClick={onNavigate}
          className="flex min-h-[44px] items-center border-b border-hairline py-3 text-[17px] font-bold text-ink no-underline transition-colors hover:text-orange-deep"
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
);
