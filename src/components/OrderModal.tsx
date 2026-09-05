import React, { useEffect, useMemo, useState } from 'react';
import { Lock, X } from 'lucide-react';
import { BRAND, CONTACT, MULTISCREEN_PLANS, PRICING_PLANS } from '../data/iptvData';
import { Check, GlassButton, PaymentRow, WhatsAppGlyph } from './ui';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
}

/** Flat list of every orderable plan, single-screen and multi-screen. */
const ALL_PLANS = [
  ...PRICING_PLANS.map((p) => ({
    id: p.id,
    label: `${p.duration} — ${p.screens}`,
    price: p.price,
  })),
  ...MULTISCREEN_PLANS.map((p) => ({
    id: p.id,
    label: p.title,
    price: p.price,
  })),
];

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, initialPlanId }) => {
  const [planId, setPlanId] = useState(initialPlanId ?? 'plan-12m');

  useEffect(() => {
    if (isOpen && initialPlanId) setPlanId(initialPlanId);
  }, [isOpen, initialPlanId]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Prevent background scroll leaking behind the sheet on mobile.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const plan = useMemo(() => ALL_PLANS.find((p) => p.id === planId) ?? ALL_PLANS[0], [planId]);

  if (!isOpen) return null;

  const waLink = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hallo ${BRAND.full}, ich möchte gerne bestellen: ${plan.label} (${plan.price}).`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bestellung abschließen"
      onClick={onClose}
    >
      <div
        className="animate-fadeIn flex h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-hairline bg-page shadow-2xl sm:h-auto sm:max-h-[88dvh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-hairline bg-surface-2 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-ink">Bestellung abschließen</h2>
            <p className="mt-1 text-[13px] text-muted">Aktivierung in 5–15 Minuten</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-tint hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <label htmlFor="plan" className="block text-[13px] font-bold text-orange-deep">
            Wähle dein Abo
          </label>
          <select
            id="plan"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-hairline bg-page px-4 py-3 text-[15px] font-semibold text-ink outline-none focus:border-orange"
          >
            {ALL_PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} — {p.price}
              </option>
            ))}
          </select>

          <div className="mt-5 rounded-xl border border-hairline bg-page px-5 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] font-semibold text-muted">Gesamt</span>
              <span className="text-3xl font-extrabold tracking-tight text-orange-deep">{plan.price}</span>
            </div>
            <ul className="mt-3 space-y-2 text-[13px] text-muted">
              {[
                '7 Tage Geld-zurück-Garantie',
                'Keine automatische Verlängerung',
                'Deutschsprachiger Support an 7 Tagen',
              ].map(
                (line) => (
                  <li key={line} className="flex items-center gap-2">
                    <Check className="text-success" />
                    {line}
                  </li>
                ),
              )}
            </ul>
          </div>

          <GlassButton
            variant="primary"
            size="lg"
            fullWidth
            className="mt-5"
            data-cta="order"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppGlyph /> Über WhatsApp bestellen
          </GlassButton>

          <p className="mt-4 flex items-center justify-center gap-2 text-[12px] font-semibold text-muted">
            <Lock className="h-3.5 w-3.5" /> Sichere Zahlung — deine Daten bleiben privat
          </p>

          <PaymentRow className="mt-3" />
        </div>
      </div>
    </div>
  );
};
