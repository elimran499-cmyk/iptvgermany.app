import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { DURATION_PACKS, TOTAL_CHANNELS } from '../data/catalog';
import { CONTACT } from '../data/iptvData';
import { WhatsAppGlyph } from './ui';

/**
 * Feste Aktionsleiste am unteren Rand — nur auf dem Telefon.
 *
 * Warum es sie gibt: `FloatingWhatsApp` ist ab `sm` sichtbar, auf dem Telefon
 * also gar nicht, und die schwebende Kopfzeile trägt nur „Paket wählen".
 * Wer am Hero vorbeigescrollt war, hatte damit auf dem Telefon keinen
 * WhatsApp-Weg mehr — auf einer Seite, deren gesamter Verkauf über WhatsApp
 * läuft. Die Leiste bringt beides zurück und nennt nebenbei den Einstiegs-
 * preis, damit die Entscheidung nicht erst im Preisabschnitt beginnt.
 *
 * Sie erscheint wie die Kopfzeile erst nach dem ersten Scrollen: über dem
 * Fold trägt der Hero seine eigenen CTAs, zwei Aufforderungen gleichzeitig
 * wären eine zu viel. Solange sie unsichtbar ist, ist sie auch inert
 * (`pointer-events-none` + `tabIndex={-1}`), damit niemand versehentlich
 * auf eine ausgeblendete Schaltfläche tippt oder hineintabbt.
 */

/** Günstigster Einstieg über alle Laufzeiten, Basis-Stufe, ein Gerät. */
const CHEAPEST = Math.min(...DURATION_PACKS.map((pack) => pack.prices.basic[0]));
const formatEuro = (val: number) => `${val.toFixed(2).replace('.', ',')} €`;

export const MobileCtaBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-page/95 backdrop-blur-xl transition-all duration-300 sm:hidden ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-2.5 px-3 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold leading-none text-ink">
            ab {formatEuro(CHEAPEST)}
          </p>
          <p className="mt-1 truncate text-[11px] font-semibold text-muted">
            {TOTAL_CHANNELS} Sender • HD/4K
          </p>
        </div>

        <a
          href="#pricing"
          tabIndex={visible ? 0 : -1}
          className="flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full pl-3.5 pr-4 text-[13.5px] font-bold text-white no-underline shadow-[0_12px_26px_-12px_rgba(var(--brand-b-deep-rgb),0.6)]"
          style={{
            background:
              'linear-gradient(135deg, var(--color-orange), var(--color-magenta))',
          }}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Paket wählen
        </a>

        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kontakt über WhatsApp"
          tabIndex={visible ? 0 : -1}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wa text-white shadow-[0_10px_24px_-12px_rgba(37,211,102,0.7)]"
        >
          <WhatsAppGlyph className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};
