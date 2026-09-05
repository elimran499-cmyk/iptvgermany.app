import React from 'react';
import logoMark from '../assets/logo-mark.png';
import { BRAND, PAYMENT_ICONS, PAYMENT_ICONS_ALT } from '../data/iptvData';

/**
 * Die Bildmarke der Seite — gelieferte Artwork-Datei, keine Inline-SVG mehr.
 * Jede Schwesterseite legt ihre eigene `logo-mark.png` an dieselbe Stelle,
 * der Code bleibt identisch.
 *
 * Bewusst nur die Marke ohne Grund: `Logo` setzt sie auf einen dunklen Chip
 * (siehe dort), die Intro-Karte und das Telefon-Badge bringen ihren eigenen
 * dunklen Grund schon mit.
 */
export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
  <img
    src={logoMark}
    alt=""
    aria-hidden="true"
    decoding="async"
    className={`logo-mark object-contain ${className}`}
  />
);

/**
 * Bildmarke plus Wortmarke. Der Name kommt aus `BRAND` — hier steht er
 * nirgends fest verdrahtet, damit eine Schwesterseite nur die Konstante
 * tauschen muss.
 */
export const Logo: React.FC<{ className?: string }> = ({ className = 'h-8 sm:h-9' }) => (
  <a href="#top"
    className={`flex shrink-0 items-center gap-2 no-underline ${className}`}
    aria-label={`${BRAND.full} — Startseite`}
  >
    <span
      className="flex h-full aspect-square shrink-0 items-center justify-center rounded-[0.65rem]"
      style={{ background: 'var(--ink-solid)' }}
    >
      {/* Prozentgroesse statt h-full: der Chip leitet seine Breite ueber
          `aspect-square` aus der Hoehe ab, und ein h-full-Kind darin hat
          keine aufloesbare Bezugshoehe — die Marke schrumpfte auf wenige
          Pixel. 68% laesst ringsum den Rand stehen, den der Chip braucht. */}
      <LogoMark className="h-[68%] w-[68%]" />
    </span>
    <span className="flex items-baseline leading-none">
      <span className="text-[17px] font-extrabold tracking-tight text-ink sm:text-[19px]">
        {BRAND.mark1}
      </span>
      <span className="text-[17px] font-medium tracking-tight text-muted sm:text-[19px]">
        {BRAND.mark2}
      </span>
    </span>
  </a>
);

/** Thin gradient rule with a small diamond centred on it — sits under every
 * heading. `align="left"` drops the symmetric taper for a single rule running
 * off to the right of the diamond — the left-set, ragged-right heading
 * treatment used where the page deliberately breaks from centring. */
export const TriRule: React.FC<{ align?: 'center' | 'left' }> = ({ align = 'center' }) => {
  if (align === 'left') {
    return (
      <div className="my-4 flex items-center gap-3" aria-hidden="true">
        <span
          className="h-[7px] w-[7px] shrink-0 rotate-45"
          style={{ background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-magenta) 100%)' }}
        />
        <span className="h-px w-16 bg-gradient-to-r from-orange/55 to-transparent sm:w-24" />
      </div>
    );
  }
  return (
    <div className="my-4 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-orange/60 sm:w-14" />
      <span
        className="h-[7px] w-[7px] rotate-45"
        style={{ background: 'linear-gradient(135deg, var(--color-orange) 0%, var(--color-magenta) 100%)' }}
      />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-magenta/60 sm:w-14" />
    </div>
  );
};

/** Small wide-tracked numeral + hairline rule — the page's editorial spine.
 * Pass the section's position in the running order (1-based); rendered as
 * "01", "02"… Shared by `SectionHeading` and any section with a bespoke
 * header (Pricing, Comparison, FAQ) that still wants to sit in the sequence.
 * `align="left"` runs the mark's rule off to the right, a printed running
 * head, instead of the symmetric centred taper. */
export const ChapterMark: React.FC<{ n: number; className?: string; align?: 'center' | 'left' }> = ({
  n,
  className = '',
  align = 'center',
}) => {
  if (align === 'left') {
    return (
      <div className={`mb-3 flex items-center gap-3 ${className}`} aria-hidden="true">
        <span className="text-[11px] font-bold tracking-[0.32em] text-orange-deep">
          {String(n).padStart(2, '0')}
        </span>
        <span className="h-px w-16 bg-gradient-to-r from-hairline to-transparent sm:w-24" />
      </div>
    );
  }
  return (
    <div className={`mb-3 flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-hairline sm:w-12" />
      <span className="text-[11px] font-bold tracking-[0.32em] text-orange-deep">
        {String(n).padStart(2, '0')}
      </span>
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-hairline sm:w-12" />
    </div>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  eyebrow?: React.ReactNode;
  light?: boolean;
  sub?: React.ReactNode;
  /** 1-based position in the page's running order — renders a ChapterMark
   * above the eyebrow when given. Omit for sections outside the sequence
   * (openers/closers). */
  index?: number;
  /** `left` breaks the section out of the page's centred default: heading,
   * rule and standfirst all set left, the headline capped to a ragged
   * measure so real whitespace opens up beside it rather than under it. */
  align?: 'center' | 'left';
}

/** `light` is kept for API compatibility with sections laid over photography —
 * auf dieser Palette sitzt jeder Abschnitt auf Weiß oder dem warmen Tint, also
 * both modes share one look.
 *
 * Editorial pass: a numbered chapter mark above the eyebrow, an oversized,
 * tight-tracked headline (a magazine headline, not a UI heading), and the
 * standfirst held to a narrow ~64ch reading measure rather than a wide
 * dashboard-style block. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  eyebrow,
  sub,
  index,
  align = 'center',
}) => {
  const left = align === 'left';
  return (
    <div className={left ? 'text-left' : 'text-center'}>
      {index !== undefined && <ChapterMark n={index} align={align} />}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`mt-3 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-ink ${
          left ? 'max-w-[16ch]' : ''
        }`}
      >
        {children}
      </h2>
      <TriRule align={align} />
      {sub && (
        <p
          className={`text-[15px] leading-relaxed text-muted sm:text-base ${
            left ? 'max-w-[52ch]' : 'mx-auto max-w-[64ch]'
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
};

/**
 * Asymmetric pull-quote — the magazine move that breaks the measure rather
 * than sitting politely inside it. Left-set, never centred: a rule-and-
 * diamond mark, an oversized serif quotation glyph, then the quote itself
 * set well above body size. Deliberately narrower than its container (no
 * `mx-auto`) so real, unequal whitespace opens up beside it — the point is
 * the offset, not just the size.
 */
export const PullQuote: React.FC<{
  quote: React.ReactNode;
  cite?: React.ReactNode;
  className?: string;
  /** Renders the quote as a real heading tag instead of a `<blockquote>` —
   * used where this is the section's own heading (Football has no other
   * heading element) rather than a customer testimonial. */
  as?: 'blockquote' | 'h1' | 'h2';
}> = ({ quote, cite, className = '', as = 'blockquote' }) => {
  const QuoteTag = as;
  return (
    <figure className={`max-w-[46ch] border-l-2 border-orange/45 pl-5 sm:pl-7 ${className}`}>
      <span
        aria-hidden="true"
        className="block font-serif text-[2.75rem] leading-none text-orange/70 sm:text-[3.25rem]"
      >
        &ldquo;
      </span>
      <QuoteTag className="text-[clamp(1.35rem,4.2vw,2.05rem)] font-semibold leading-[1.2] tracking-tight text-ink">
        {quote}
      </QuoteTag>
      {cite && (
        <figcaption className="mt-4 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-deep">
          {cite}
        </figcaption>
      )}
    </figure>
  );
};

/** Chip mit Haarlinien-Kontur, z. B. „Sofortige Aktivierung (±5 Min.)". */
export const Pill: React.FC<{
  children: React.ReactNode;
  dot?: string;
  className?: string;
}> = ({ children, dot, className = '' }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2/60 px-4 py-2 text-[13px] font-semibold text-orange-deep ${className}`}
  >
    {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
    {children}
  </span>
);

/** Solid surface chip with an orange icon, used in the benefits strip. */
export const NavyPill: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({
  children,
  icon,
}) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2 px-4 py-2.5 text-[13px] font-semibold text-ink shadow-soft">
    {icon && <span className="text-orange-deep">{icon}</span>}
    {children}
  </span>
);

/** Card-brand logos shown at the foot of each pricing card — kept on a warm
 * tint chip since the sprite's marks assume a pale background. */
export const PaymentRow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center rounded-lg bg-tint px-3 py-2 ${className}`}>
    <img
      src={PAYMENT_ICONS}
      alt={PAYMENT_ICONS_ALT}
      loading="lazy"
      decoding="async"
      className="h-[26px] w-auto max-w-full object-contain"
    />
  </div>
);

export const Check: React.FC<{ className?: string }> = ({ className = 'text-success' }) => (
  <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 ${className}`} fill="currentColor">
    <path d="M7.6 14.6 3.4 10.4l1.4-1.4 2.8 2.8 7-7 1.4 1.4z" />
  </svg>
);

export const Cross: React.FC = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-muted" fill="currentColor">
    <path d="M15.5 5.9 14.1 4.5 10 8.6 5.9 4.5 4.5 5.9 8.6 10l-4.1 4.1 1.4 1.4L10 11.4l4.1 4.1 1.4-1.4L11.4 10z" />
  </svg>
);

/** Official WhatsApp mark, 24×24 viewBox, inherits colour from the parent. */
export const WhatsAppGlyph: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/* ---------------------------------------------------------------------- */
/* Glass button — the one component every CTA in the site goes through.   */
/* ---------------------------------------------------------------------- */

type GlassButtonVariant = 'primary' | 'secondary' | 'ghost';
type GlassButtonSize = 'sm' | 'md' | 'lg';

interface GlassButtonOwnProps {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  /** Read by src/conversions.ts to count order clicks. */
  'data-cta'?: string;
}

type GlassButtonAsButton = GlassButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof GlassButtonOwnProps> & {
    href?: undefined;
  };

type GlassButtonAsAnchor = GlassButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof GlassButtonOwnProps> & {
    href: string;
  };

export type GlassButtonProps = GlassButtonAsButton | GlassButtonAsAnchor;

const GLASS_VARIANT_CLASS: Record<GlassButtonVariant, string> = {
  primary: 'glass-btn glass-btn-primary',
  secondary: 'glass-btn glass-btn-secondary',
  ghost: 'glass-btn glass-btn-ghost',
};

const GLASS_SIZE_CLASS: Record<GlassButtonSize, string> = {
  sm: 'gap-1.5 rounded-lg px-4 py-2.5 text-[13px]',
  md: 'gap-2 rounded-xl px-6 py-3 text-[14px]',
  lg: 'gap-2.5 rounded-xl px-8 py-4 text-[15px]',
};

/**
 * Shared glass CTA. Renders an <a> when `href` is given, a <button> otherwise.
 * Backdrop blur + translucent tinted fill + graded hairline border + inset
 * white highlight + a warm brand-tinted shadow. Falls back to a solid fill
 * via `@supports not (backdrop-filter)` in index.css, and every transition is
 * disabled under `prefers-reduced-motion`.
 */
export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  fullWidth,
  className = '',
  children,
  href,
  ...rest
}) => {
  const cls = `${GLASS_VARIANT_CLASS[variant]} ${GLASS_SIZE_CLASS[size]} ${
    fullWidth ? 'w-full' : ''
  } inline-flex min-h-[44px] items-center justify-center text-center font-bold no-underline ${className}`;

  if (href !== undefined) {
    return (
      <a href={href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
