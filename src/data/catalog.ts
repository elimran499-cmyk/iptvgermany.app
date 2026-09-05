/* ── Gemeinsamer Katalog ──────────────────────────────────────────────────
   Sender, Filme/Serien und die Paketpreise. Diese Daten sind auf allen
   Schwesterseiten identisch — nur die Gestaltung unterscheidet sich. Preise
   und Paketinhalte stammen eins zu eins aus dem bestehenden Angebot; ändere
   sie hier, nirgendwo sonst.

   Logos liegen in /public/logos, Poster in /public/posters, werden also als
   gewöhnliche URL-Strings geladen (kein Bundler-Import) und können lazy
   laden.

   Jeder Sender und jeder Titel kommt in diesen Listen genau einmal vor. Die
   Marquees duplizieren ihre Reihe im DOM, um nahtlos zu loopen — das ist ein
   Render-Trick, keine doppelten Daten. Zeige nie denselben Titel zweimal in
   zwei nebeneinander sichtbaren Reihen; teile stattdessen die Liste auf.
   ──────────────────────────────────────────────────────────────────────── */

export interface Channel {
  id: string;
  /** Sendername, wie er in der Programmübersicht steht. */
  name: string;
  /** Pfad unter /public/logos. */
  logo: string;
  /** Kurzes Label für den Kategorie-Chip. */
  category: string;
  /** Bildqualität, als Badge angezeigt. */
  quality: string;
  /** Helligkeit des Logos selbst, aus den Pixeln gemessen. 'light' = eine
   *  weiße oder helle Marke, die auf weißer Kachel unsichtbar wäre und daher
   *  eine dunkle Platte braucht; 'dark' steht gut auf Weiß. */
  tone: 'light' | 'dark';
}

export interface VodTitle {
  id: string;
  title: string;
  /** Pfad unter /public/posters. */
  poster: string;
  genre: string;
  year: number;
  /** 'film' oder 'serie' — steuert das Filter-Label. */
  kind: 'film' | 'serie';
}

export interface PackageTier {
  id: 'basic' | 'vip';
  name: string;
  headline: string;
  features: string[];
}

export interface DurationPack {
  id: string;
  label: string;
  /** Abgerechnete Monate — Basis für den Monatsbetrag. */
  months: number;
  bestDeal?: boolean;
  savePercent?: number;
  /** Preis nach Geräteanzahl; Index 0 = 1 Gerät. */
  prices: Record<'basic' | 'vip', number[]>;
}

/* ── Sender ──────────────────────────────────────────────────────────────
   Nur Hauptsender aus dem deutschen Angebot — die Marken, die jeder
   wiedererkennt. Bewusst keine Sub-Varianten und keine Regionalsender: die
   machten die Wand unruhig und repetitiv, ohne etwas hinzuzufügen. Der
   Zähler in der Abschnittsüberschrift nennt das volle Angebot (80.000+);
   das hier ist die Auslage.

   Zwei Streifen mit eigener Überschrift, bewusst etwa gleich lang. Eine
   eigene Sport-Reihe hatte nur drei Marken und wiederholte sich dadurch
   zweieinhalbmal im selben Viewport — sichtbar als Schleife, nicht als
   Auswahl. Sport läuft deshalb im zweiten Streifen mit: 13 und 13 Kacheln,
   auf jeder Breite nur einzigartige Logos in Sicht.

   `tone` bleibt stimmige Metadaten, aber alle Kacheln stehen auf einer
   dunklen Platte: kein Logo hier liegt unter Luminanz 0,34, sie sind also
   allesamt auf Dunkel lesbar, und die Reihe wirkt ruhig statt wie ein
   Schachbrett aus wechselndem Weiß und Dunkel. */
export const CHANNELS_DOCS: Channel[] = [
  { id: 'discoverychannel', name: 'Discovery Channel'  , logo: '/logos/discovery-channel-nl.png', category: 'Doku', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'discoveryscience', name: 'Discovery Science'  , logo: '/logos/discovery-science-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'animalplanet', name: 'Animal Planet'      , logo: '/logos/animal-planet-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'nationalgeographic', name: 'National Geographic', logo: '/logos/national-geographic-nl.png', category: 'Doku', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'natgeowild', name: 'Nat Geo Wild'        , logo: '/logos/national-geographic-wild-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'historychannel', name: 'HISTORY'             , logo: '/logos/history-channel-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'tlc', name: 'TLC'                 , logo: '/logos/tlc-nl.png', category: 'Doku', quality: 'HD', tone: 'dark' },
  { id: 'crimeinvestigation', name: 'Crime + Investigation', logo: '/logos/crime-and-investigation-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'investigationdiscovery', name: 'Investigation Discovery', logo: '/logos/id-investigation-discovery-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'curiosity', name: 'Curiosity Channel'  , logo: '/logos/curiosity-channel-nl.png', category: 'Doku', quality: 'HD', tone: 'light' },
  { id: 'lovenature', name: 'Love Nature'        , logo: '/logos/love-nature-nl.png', category: 'Doku', quality: '4K Ultra HD', tone: 'light' },
  { id: 'comedycentral', name: 'Comedy Central'     , logo: '/logos/comedy-central-nl.png', category: 'Unterhaltung', quality: 'HD', tone: 'light' },
  { id: 'paramountnetwork', name: 'Paramount Network'  , logo: '/logos/paramount-network-nl.png', category: 'Unterhaltung', quality: 'HD', tone: 'light' },
];

/* Zweiter Streifen: Familie, Musik und Sport. */
export const CHANNELS_FAMILY_SPORT: Channel[] = [
  { id: 'eurosport1hd', name: 'Eurosport 1'        , logo: '/logos/eurosport-1-hd-nl.png', category: 'Sport', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'eurosport2hd', name: 'Eurosport 2'        , logo: '/logos/eurosport-2-hd-nl.png', category: 'Sport', quality: 'FHD 60FPS', tone: 'light' },
  { id: 'extremesportschannel', name: 'Extreme Sports'    , logo: '/logos/extreme-sports-channel-nl.png', category: 'Sport', quality: 'HD', tone: 'light' },
  { id: 'mtv', name: 'MTV'                 , logo: '/logos/mtv-nl.png', category: 'Musik', quality: 'HD', tone: 'light' },
  { id: 'disneychannel', name: 'Disney Channel'     , logo: '/logos/disney-channel-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'disneyjunior', name: 'Disney Junior'      , logo: '/logos/disney-jr-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'nickelodeon', name: 'Nickelodeon'        , logo: '/logos/nickelodeon-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'nickjr', name: 'Nick Jr.'            , logo: '/logos/nick-jr-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'nicktoons', name: 'Nicktoons'           , logo: '/logos/nick-toons-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'cartoonnetwork', name: 'Cartoon Network'    , logo: '/logos/cartoon-network-nl.png', category: 'Kinder', quality: 'HD', tone: 'dark' },
  { id: 'boomerang', name: 'Boomerang'           , logo: '/logos/boomerang-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'dreamworks', name: 'DreamWorks Channel' , logo: '/logos/dreamworks-channel-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
  { id: 'babytv', name: 'BabyTV'              , logo: '/logos/baby-tv-nl.png', category: 'Kinder', quality: 'HD', tone: 'light' },
];

/* Alles zusammen, für Stellen, die eine einzige Liste wollen (etwa das Hero-Panel). */
export const ALL_CHANNELS: Channel[] = [...CHANNELS_DOCS, ...CHANNELS_FAMILY_SPORT];

/* ── Filme & Serien ──────────────────────────────────────────────────────
   30 einzelne Titel: 21 Filme und 9 Serien, jeder mit eigenem Poster. Keine
   Dopplungen. Die Abschnittsüberschrift nennt die 200.000+ Titel, die
   tatsächlich enthalten sind. */
export const VOD_TITLES: VodTitle[] = [
  { id: 'f1', title: 'Dune: Part Two'                , poster: '/posters/f1.webp', genre: 'Sci-Fi', year: 2024, kind: 'film' },
  { id: 'f2', title: 'Oppenheimer'                   , poster: '/posters/f2.webp', genre: 'Drama', year: 2023, kind: 'film' },
  { id: 'f3', title: 'The Batman'                    , poster: '/posters/f3.webp', genre: 'Action', year: 2022, kind: 'film' },
  { id: 'f4', title: 'Interstellar'                  , poster: '/posters/f4.webp', genre: 'Sci-Fi', year: 2014, kind: 'film' },
  { id: 'f5', title: 'Blade Runner 2049'             , poster: '/posters/f5.webp', genre: 'Sci-Fi', year: 2017, kind: 'film' },
  { id: 'f6', title: 'Top Gun: Maverick'             , poster: '/posters/f6.webp', genre: 'Action', year: 2022, kind: 'film' },
  { id: 'f7', title: 'John Wick'                     , poster: '/posters/f7.webp', genre: 'Action', year: 2014, kind: 'film' },
  { id: 'f8', title: 'Joker'                         , poster: '/posters/f8.webp', genre: 'Thriller', year: 2019, kind: 'film' },
  { id: 'f9', title: 'Avatar: The Way of Water'      , poster: '/posters/f9.webp', genre: 'Abenteuer', year: 2022, kind: 'film' },
  { id: 'f10', title: 'Gladiator II'                  , poster: '/posters/f10.webp', genre: 'Action', year: 2024, kind: 'film' },
  { id: 'f11', title: 'Tenet'                         , poster: '/posters/f11.webp', genre: 'Sci-Fi', year: 2020, kind: 'film' },
  { id: 'f12', title: 'Sicario'                       , poster: '/posters/f12.webp', genre: 'Thriller', year: 2015, kind: 'film' },
  { id: 'f13', title: 'Deadpool & Wolverine'          , poster: '/posters/f13.webp', genre: 'Action', year: 2024, kind: 'film' },
  { id: 'f14', title: 'Inception'                     , poster: '/posters/f14.webp', genre: 'Sci-Fi', year: 2010, kind: 'film' },
  { id: 'f15', title: 'Furiosa: A Mad Max Saga'       , poster: '/posters/f15.webp', genre: 'Action', year: 2024, kind: 'film' },
  { id: 'f16', title: 'The Dark Knight'               , poster: '/posters/f16.webp', genre: 'Action', year: 2008, kind: 'film' },
  { id: 'breakingbad', title: 'Breaking Bad'                  , poster: '/posters/breaking-bad.webp', genre: 'Drama', year: 2008, kind: 'serie' },
  { id: 'chernobyl', title: 'Chernobyl'                     , poster: '/posters/chernobyl.webp', genre: 'Drama', year: 2019, kind: 'serie' },
  { id: 'got', title: 'Game of Thrones'               , poster: '/posters/got.webp', genre: 'Fantasy', year: 2011, kind: 'serie' },
  { id: 'lastofus', title: 'The Last of Us'                , poster: '/posters/last-of-us.webp', genre: 'Drama', year: 2023, kind: 'serie' },
  { id: 'peaky', title: 'Peaky Blinders'                , poster: '/posters/peaky.webp', genre: 'Drama', year: 2013, kind: 'serie' },
  { id: 'sopranos', title: 'The Sopranos'                  , poster: '/posters/sopranos.webp', genre: 'Drama', year: 1999, kind: 'serie' },
  { id: 'stranger', title: 'Stranger Things'               , poster: '/posters/stranger.webp', genre: 'Sci-Fi', year: 2016, kind: 'serie' },
  { id: 'succession', title: 'Succession'                    , poster: '/posters/succession.webp', genre: 'Drama', year: 2018, kind: 'serie' },
  { id: 'thewire', title: 'The Wire'                      , poster: '/posters/the-wire.webp', genre: 'Krimi', year: 2002, kind: 'serie' },
  { id: 'godfather', title: 'The Godfather'                 , poster: '/posters/godfather.webp', genre: 'Drama', year: 1972, kind: 'film' },
  { id: 'lotr', title: 'The Lord of the Rings'         , poster: '/posters/lotr.webp', genre: 'Abenteuer', year: 2001, kind: 'film' },
  { id: 'parasite', title: 'Parasite'                      , poster: '/posters/parasite.webp', genre: 'Thriller', year: 2019, kind: 'film' },
  { id: 'pulp', title: 'Pulp Fiction'                  , poster: '/posters/pulp.webp', genre: 'Krimi', year: 1994, kind: 'film' },
  { id: 'shawshank', title: 'The Shawshank Redemption'      , poster: '/posters/shawshank.webp', genre: 'Drama', year: 1994, kind: 'film' },
];

/* ── Pakete ──────────────────────────────────────────────────────────────
   Zwei Stufen (Basis / Premium VIP) × drei Laufzeiten × 1–4 Geräte.
   Die Preise sind aus dem bestehenden Angebot übernommen — nicht ändern.

   Die Reihenfolge ist bewusst lang → kurz: 12+3 Monate zuerst, dann 6, dann
   3. Die längste Laufzeit ist das beste Angebot und gehört daher nach vorn —
   in Array-Reihenfolge rendern und nirgendwo neu sortieren. */
export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'basic',
    name: 'Basis',
    headline: 'Was steckt im Basis-Paket?',
    features: [
      'SD/HD/FULL HD Qualität',
      '+25.000 Kanäle + Netflix',
      'RTL, ProSieben, SAT.1, VOX, Sky, DAZN',
      '+140.000 Filme & Serien',
      'Wöchentliche Updates',
      '24/7 Support DE & AT',
      '100 % anonym',
      'AntiFreeze-Technologie',
      'Alle Geräte',
      'Exklusive DE- & AT-Inhalte',
      'Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
  {
    id: 'vip',
    name: 'Premium VIP',
    headline: 'Was steckt im Premium-VIP-Paket?',
    features: [
      'SD/HD/FULL HD/4K/8K/HDR-VR',
      '+80.000 Kanäle + Netflix',
      'RTL, ProSieben, SAT.1, VOX, Sky, DAZN, ORF',
      '+200.000 Filme & Serien',
      'Tägliche Updates',
      'Alle Sport-PPV-Events',
      'VIP-Support 24/7',
      'Enterprise Anti-Freeze PRO',
      'Persönlicher VIP-Manager',
      'Alle Geräte',
      'VPN inklusive',
      'Exklusive VIP-Inhalte',
      'Netflix, Amazon, HBO, Apple TV, Hulu, Disney+',
    ],
  },
];

export const DURATION_PACKS: DurationPack[] = [
  {
    id: 'pack-15m',
    label: '12+3 Monate',
    months: 15,
    bestDeal: true,
    savePercent: 50,
    prices: {
      basic: [49.0, 79.0, 109.0, 129.0],
      vip: [79.99, 124.99, 179.99, 199.99],
    },
  },
  {
    id: 'pack-6m',
    label: '6 Monate',
    months: 6,
    savePercent: 40,
    prices: {
      basic: [34.99, 49.99, 69.99, 89.99],
      vip: [49.99, 79.99, 99.99, 139.99],
    },
  },
  {
    id: 'pack-3m',
    label: '3 Monate',
    months: 3,
    savePercent: 30,
    prices: {
      basic: [24.99, 39.99, 49.99, 57.99],
      vip: [34.99, 49.99, 69.99, 89.99],
    },
  },
];

/* Die zwei Zahlen, die in allen Überschriften wiederkehren. */
export const TOTAL_CHANNELS = '80.000+';
export const TOTAL_VOD = '200.000+';
