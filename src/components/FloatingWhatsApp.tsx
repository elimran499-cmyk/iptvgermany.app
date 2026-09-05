import React from 'react';
import { CONTACT } from '../data/iptvData';
import { WhatsAppGlyph } from './ui';

/**
 * Desktop-only corner bubble. On phones the navbar already carries a
 * WhatsApp button and the sticky bottom bar carries the price + CTA — a
 * third floating WhatsApp target would pile straight on top of both, so it
 * is dropped below `sm` entirely rather than juggling z-index math.
 */
export const FloatingWhatsApp: React.FC = () => (
  <a
    href={CONTACT.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Kontakt über WhatsApp"
    className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 sm:flex"
  >
    <WhatsAppGlyph className="h-7 w-7" />
  </a>
);
