import appHotPlayer from '../assets/app-hot-player.webp';
import appIboPlayer from '../assets/app-ibo-player.webp';
import appIboProPlayer from '../assets/app-ibo-pro-player.webp';
import appIptvSmartersPro from '../assets/app-iptv-smarters-pro.webp';
import appSmartIptv from '../assets/app-smart-iptv.webp';
import appSmartStb from '../assets/app-smart-stb.webp';
import appXciptv from '../assets/app-xciptv.webp';
import paymentIcons from '../assets/payment-icons.webp';
import photoAbonnementPremium from '../assets/photo-abonnement-premium.webp';
import photoFranceIptvB from '../assets/photo-france-iptv-b.webp';
import type {
  AppLogo,
  BenefitCard,
  ComparisonRow,
  CustomerReview,
  FAQItem,
  StepCard,
} from '../types';

/**
 * Der Markenname dieser Seite — die einzige Stelle, an der er steht.
 * Die Wortmarke setzt sich aus zwei Gewichten zusammen (`mark1` fett,
 * `mark2` leicht), `full` geht in Fließtext, Meta-Tags und die
 * WhatsApp-Nachrichten. Beim Aufsetzen einer Schwesterseite werden hier
 * drei Zeilen getauscht, sonst nichts.
 */
export const BRAND = {
  mark1: 'IPTV',
  mark2: 'Germany',
  full: 'IPTVGermany',
  /** Kanonische Adresse — für canonical, og:url, sitemap.xml und JSON-LD. */
  url: 'https://iptvgermany.app',
};

/**
 * Das Such-Keyword, auf das diese Seite optimiert ist, plus die Textstellen,
 * die es tragen. Jede Schwesterseite zielt auf ihren eigenen Namen, deshalb
 * steht das hier als Konstante und nicht verstreut in den Komponenten:
 * H1, Hero-Zeile, sechs Abschnittsüberschriften und die erste FAQ-Frage
 * ziehen alle aus diesem Objekt.
 *
 * `keyword` läuft durch die Überschriften, `h1Before` steht vor dem
 * Markennamen in der H1 (das Keyword gehört in die ersten Wörter),
 * `tagline` ist die eine Zeile unter der H1, und `faq` ist die
 * seitenspezifische Frage, die zusätzlich als FAQPage-Schema in
 * index.html steht — beide Fassungen müssen identisch bleiben, sonst
 * meldet die Search Console strukturierte Daten ohne Entsprechung.
 */
export const SEO = {
  keyword: 'IPTV Germany',
  h1Before: 'IPTV Germany — IPTV kaufen bei',
  tagline: 'IPTV Germany für ganz Deutschland — HD/4K, stabil und unbegrenzt.',
  faq: {
    id: 'f0',
    question: 'Was ist IPTV Germany und wo funktioniert es?',
    answer:
      'IPTV Germany ist unser IPTV-Abo für den deutschsprachigen Raum. Es funktioniert überall dort, wo du eine stabile Internetverbindung von mindestens 25 Mbit/s hast — zu Hause in Deutschland ebenso wie im Urlaub. Du brauchst nur ein kompatibles Gerät und die Zugangsdaten, die du nach der Bestellung über WhatsApp bekommst.',
  },
};

/**
 * Kontakt läuft ausschließlich über WhatsApp — bewusst keine sichtbare
 * Rufnummer irgendwo auf der Seite. `wa.me` erwartet die Nummer in E.164
 * ohne Leerzeichen und ohne führendes Plus; sie steckt nur in dieser URL.
 */
export const CONTACT = {
  whatsapp: 'https://wa.me/447832486269',
};

/** Gemeinsame Leistungsliste für jedes Ein-Geräte-Paket. */
const CORE_FEATURES = [
  '35.500+ internationale TV-Sender',
  '179.000+ Filme & Serien on demand',
  'SD/HD/FHD/4K/UHD Bildqualität',
  'Anti-Buffer EU-Server (stabil)',
  '99,99 % Stabilität',
  'TV-Wiedergabe (Replay TV) + EPG',
  '7 Tage Geld-zurück-Garantie',
];

/**
 * Hintergrundfotos, aus src/assets gebündelt, damit die Seite auch offline
 * rendert. Jedes liegt hinter einem dunklen Schleier, damit weiße Schrift
 * lesbar bleibt — welcher Abschnitt welches nutzt, hängt nur davon ab, wo
 * die Konstante steht; die Ebenen sind überall identisch.
 */
export const HOW_IMAGE = photoAbonnementPremium;
export const FOOTBALL_IMAGE = photoFranceIptvB;

export const BENEFITS: BenefitCard[] = [
  {
    id: 'b1',
    title: '4K / Full HD — stabile Streams',
    body: 'Optimierte EU-/DE-Netze: Spiele, Filme und Serien ohne Unterbrechung, minimale Latenz, zuverlässiges IPTV-Abo.',
  },
  {
    id: 'b2',
    title: 'Kompatibel mit allen Geräten',
    body: 'Samsung/LG Smart TV, Android/Google TV, Fire TV, Apple TV, iOS/Android, PC/Mac (M3U & Xtream).',
  },
  {
    id: 'b3',
    title: 'IPTV unbegrenzt & flexibel',
    body: 'Klare Angebote, keine versteckten Kosten, VOD & Replay, automatische Senderupdates für IPTV Deutschland.',
  },
  {
    id: 'b4',
    title: 'WhatsApp-Support DE rund um die Uhr',
    body: 'Verständliche Anleitungen und direkte Hilfe bis zur vollständigen Aktivierung deines Premium-IPTV.',
  },
  {
    id: 'b5',
    title: '7 Tage Geld-zurück-Garantie',
    body: 'Gesicherte Zahlung, Privatsphäre gewahrt, in Ruhe testen, bevor du dich für dein IPTV-Abo entscheidest.',
  },
  {
    id: 'b6',
    title: 'Sport, Filme & Serien',
    body: 'Deutsche und internationale Sender, VOD in 4K/HD, große Sportevents live — Bundesliga, Champions League, Formel 1.',
  },
];

export const BENEFIT_PILLS = [
  { label: 'Sichere Zahlung', icon: 'lock' },
  { label: 'Aktivierung 5–15 Min.', icon: 'zap' },
  { label: 'HD/4K Qualität', icon: 'star' },
  { label: 'WhatsApp 24/7', icon: 'whatsapp' },
  { label: 'Fokus auf Deutschland', icon: 'flag' },
];

/** Player-Apps, mit denen wir kompatibel sind. Kacheln ohne `logo` fallen auf Text zurück. */
export const APP_LOGOS: AppLogo[] = [
  { id: 'a1', name: 'IPTV Smarters Pro', color: '#6d28d9', logo: appIptvSmartersPro },
  { id: 'a2', name: 'IBO Player', color: '#dc2626', logo: appIboPlayer },
  { id: 'a3', name: 'IBO Pro Player', color: '#7c3aed', logo: appIboProPlayer },
  { id: 'a4', name: 'Smart STB', color: '#1d4ed8', logo: appSmartStb },
  { id: 'a5', name: 'Smart IPTV', color: '#b91c1c', logo: appSmartIptv },
  { id: 'a6', name: 'Hot Player', color: '#f97316', logo: appHotPlayer },
  { id: 'a7', name: 'XCIPTV', color: '#dc2626', logo: appXciptv },
  { id: 'a8', name: 'TiVimate', color: '#2563eb' },
];

/** Der Dreischritt „kaufen, aktivieren, schauen". */
export const BUY_STEPS: StepCard[] = [
  {
    id: 's1',
    number: 1,
    title: 'Wähle dein IPTV-Abo',
    body: 'monatlich, quartalsweise oder jährlich',
    bullets: [],
  },
  {
    id: 's2',
    number: 2,
    title: 'Sichere Zahlung (PayPal, Karte, Überweisung).',
    body: 'Aktivierung sofort.',
    bullets: [],
  },
  {
    id: 's3',
    number: 3,
    title: 'Installieren & in HD/4K schauen',
    body: 'auf Smart TV, Android, iOS, Box & PC',
    bullets: [],
  },
];

export const HOW_IT_WORKS: StepCard[] = [
  {
    id: 'h1',
    number: 1,
    title: 'Angebot auswählen',
    body: 'Wähle die Laufzeit, die zu dir passt.',
    bullets: ['Ohne Verpflichtungen', 'Sofortige Aktivierung', 'Deutschsprachiger Support'],
  },
  {
    id: 'h2',
    number: 2,
    title: 'IPTV-App installieren',
    body: 'Du erhältst deine Zugangsdaten und richtest deine App ein.',
    bullets: ['Smart TV, Android, iOS, PC', 'Anleitungen inklusive', 'Stabiles HD/4K-Streaming'],
  },
  {
    id: 'h3',
    number: 3,
    title: 'Ohne Limit genießen',
    body: 'Zugriff auf all deine Lieblingssender, Filme und Sport.',
    bullets: ['Sender & VOD unbegrenzt', 'Live-Sport', 'Premium-Qualität'],
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { id: 'c1', criterion: 'Schnelle Aktivierung (5–15 Min.)', iconName: 'zap' },
  { id: 'c2', criterion: 'HD/4K stabil (Anti-Buffer)', iconName: 'monitor' },
  { id: 'c3', criterion: 'Kompatibel mit Smart TV, Android, iOS, PC & Box', iconName: 'smartphone' },
  { id: 'c4', criterion: 'EPG, Replay & VOD für Filme/Serien', iconName: 'list' },
  {
    id: 'c5',
    criterion: 'Sport & Live-Events (je nach Verfügbarkeit)',
    iconName: 'football',
  },
  { id: 'c6', criterion: 'Deutschsprachiger Support 24/7 (WhatsApp)', iconName: 'whatsapp' },
  { id: 'c7', criterion: 'Keine versteckten Kosten • 7 Tage Geld zurück', iconName: 'euro' },
  { id: 'c8', criterion: 'Wöchentliche Katalog-Updates', iconName: 'refresh' },
];

export const WHY_CARDS: BenefitCard[] = [
  {
    id: 'w1',
    title: 'Ohne Verpflichtungen',
    body: `Jederzeit kündbar. ${BRAND.full} = volle Flexibilität.`,
  },
  {
    id: 'w2',
    title: 'Premium-Erlebnis in Deutschland',
    body: 'Flüssiges HD/4K-Streaming für Filme, Serien, Unterhaltung und internationale Sender.',
  },
  {
    id: 'w3',
    title: 'Support rund um die Uhr',
    body: 'Begleitete Installation und direkte Hilfe über WhatsApp, 7 Tage die Woche.',
  },
];

export const VOD_CARDS: BenefitCard[] = [
  {
    id: 'v1',
    title: 'Klare Kategorien',
    body: 'Dank einfacher, aufgeräumter Navigation findest du schnell, was du sehen willst.',
  },
  {
    id: 'v2',
    title: 'Flüssige Wiedergabe',
    body: 'Ein stabiles Erlebnis, mit HD/4K je nach Gerät und Verbindung.',
  },
  {
    id: 'v3',
    title: 'Mehrere Geräte',
    body: 'Kompatibel mit Smart TV, Android, iOS, Box & PC — und Hilfe, wenn du sie brauchst.',
  },
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'r1',
    author: 'Lukas M.',
    location: 'Berlin',
    comment:
      'Schnelle Aktivierung, das Bild in 4K läuft super stabil. Die deutschen Sender sind komplett und es buffert nie.',
  },
  {
    id: 'r2',
    author: 'Sophie B.',
    location: 'Hamburg',
    comment:
      'Der WhatsApp-Support reagiert sehr schnell. Ich hatte den Zugang nach wenigen Minuten. Top auf dem Smart TV.',
  },
  {
    id: 'r3',
    author: 'Thomas D.',
    location: 'München',
    comment:
      'VOD, Sport und internationale Sender. Ich wollte etwas Premium und bin rundum zufrieden.',
  },
  {
    id: 'r4',
    author: 'Emma L.',
    location: 'Köln',
    comment: 'Läuft perfekt auf Apple TV und Android. Einfache Oberfläche, saubere Qualität.',
  },
  {
    id: 'r5',
    author: 'Jonas V.',
    location: 'Frankfurt',
    comment: 'Installation in wenigen Minuten mit der Anleitung. Live-Sport ohne Ruckler.',
  },
  {
    id: 'r6',
    author: 'Julia K.',
    location: 'Stuttgart',
    comment: 'Gutes Preis-Leistungs-Verhältnis. Replay und EPG nutze ich täglich.',
  },
  {
    id: 'r7',
    author: 'Simon J.',
    location: 'Düsseldorf',
    comment: 'Zwei Geräte gleichzeitig für die Familie. Alles bleibt stabil in Full HD.',
  },
  {
    id: 'r8',
    author: 'Nora P.',
    location: 'Leipzig',
    comment: 'Klare Erklärungen, sichere Zahlung und sofort aktiv. Genau wie versprochen.',
  },
];

const BASE_FAQ: FAQItem[] = [
  {
    id: 'f1',
    question: 'Wie lange dauert die Aktivierung meines IPTV-Abos?',
    answer:
      'Nach erfolgreicher Zahlung wird dein IPTV-Abo in der Regel innerhalb von 5 bis 15 Minuten aktiviert. Die Zugangsdaten erhältst du per E-Mail oder über WhatsApp und kannst sofort loslegen.',
  },
  {
    id: 'f2',
    question: 'Welche Geräte sind mit eurem IPTV Deutschland kompatibel?',
    answer:
      'Unser Dienst läuft auf Samsung und LG Smart TV, Android und Google TV, Fire TV und Fire Stick, Apple TV, iOS- und Android-Smartphones und -Tablets, MAG-Boxen sowie PC/Mac. Wir unterstützen sowohl M3U als auch Xtream Codes.',
  },
  {
    id: 'f3',
    question: 'Wie installiere ich das beste IPTV auf meinem TV oder Handy?',
    answer:
      'Du installierst eine kompatible App wie IPTV Smarters, TiVimate, IBO Player oder Smart IPTV und trägst deine Zugangsdaten ein. Zur Bestellung bekommst du verständliche deutsche Anleitungen, und unser Support hilft dir über WhatsApp, bis alles läuft.',
  },
  {
    id: 'f4',
    question: 'Kann ich schnell starten, wenn ich mich gar nicht auskenne?',
    answer:
      'Ja. Technisches Vorwissen brauchst du nicht. Wir begleiten dich Schritt für Schritt über WhatsApp durch die Installation, und die meisten Kunden schauen innerhalb einer Viertelstunde. Unser deutschsprachiger Support ist 7 Tage die Woche erreichbar.',
  },
  {
    id: 'f5',
    question: 'Wie steht es um Qualität und Stabilität eures Premium-IPTV?',
    answer:
      'Wir streamen in SD, HD, Full HD, 4K und UHD über Anti-Buffer-EU-Server mit 99,99 % Stabilität. Die tatsächliche Bildqualität hängt von deiner Internetgeschwindigkeit und deinem Gerät ab; für 4K empfehlen wir mindestens 25 Mbit/s.',
  },
  {
    id: 'f6',
    question: 'Welche Zahlungsarten und Verlängerungsoptionen gibt es?',
    answer:
      'Du kannst sicher per Visa, Mastercard, American Express, PayPal, SEPA-Überweisung, Apple Pay und Google Pay zahlen. Es gibt keine automatische Verlängerung: Du verlängerst selbst, wann du willst, und hast 7 Tage Geld-zurück-Garantie.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [SEO.faq, ...BASE_FAQ];

export const NAV_LINKS = [
  { label: 'IPTV kaufen', href: '#top' },
  { label: 'IPTV Abo', href: '#pricing' },
  { label: 'Sender', href: '#channels' },
  { label: 'Filme & Serien', href: '#films' },
  { label: 'Installationsanleitung', href: '#how' },
  { label: 'FAQ', href: '#faq' },
];

/** Ein einzelnes Sprite mit allen Kartenlogos, wie in Produktion. */
export const PAYMENT_ICONS = paymentIcons;
export const PAYMENT_ICONS_ALT =
  'Zahlungsarten: Mastercard, Visa, American Express, Apple Pay, Google Pay';
