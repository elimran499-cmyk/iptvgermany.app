# IPTVGermany

Deutschsprachige IPTV-Landingpage für **https://iptvgermany.app**. React + Vite + Tailwind v4.

## Entwickeln

```bash
npm install
npm run dev      # http://localhost:3002
npm run build    # -> dist/
npm run lint     # tsc --noEmit
```

## SEO

Diese Seite ist auf **„IPTV Germany"** optimiert. Das Keyword steht in:

| Stelle | Datei |
| --- | --- |
| Title, Description, canonical, Open Graph, JSON-LD | `index.html` |
| H1, Hero-Zeile, Trust-Chip, erste FAQ-Frage | `src/data/iptvData.ts` → `SEO` |
| Sechs Abschnittsüberschriften | ziehen aus `SEO.keyword` |
| robots.txt, sitemap.xml | `public/` |

`SEO.faq` und der FAQPage-Block in `index.html` müssen **wortgleich** bleiben.
Schema ohne sichtbare Entsprechung verstößt gegen Googles Richtlinien.

Absichtlich **nicht** enthalten: `aggregateRating`. Die Seite zeigt zwar
Bewertungen, aber ohne belegbare Erhebung dahinter wäre Rating-Markup
erfundenes Rich-Snippet-Material und ein Abstrafungsrisiko.

## Was diese Seite von ihren Schwesterseiten unterscheidet

| Stelle | Inhalt |
| --- | --- |
| `src/data/iptvData.ts` → `BRAND` | Wortmarke `IPTV` + `Germany`, voller Name `IPTVGermany` |
| `src/data/iptvData.ts` → `SEO` | Keyword „IPTV Germany" |
| `src/index.css` → `@theme` + `:root` | Palette: #0e7c86 → #10b981 |
| `index.html`, `public/robots.txt`, `public/sitemap.xml` | Adresse https://iptvgermany.app |

## Kontakt

Der Kontakt läuft ausschließlich über WhatsApp. Es steht **keine Rufnummer**
auf der Seite — die Nummer existiert nur als `wa.me`-URL in
`CONTACT.whatsapp` (`src/data/iptvData.ts`).

## Vor dem Live-Gang

1. Die Google-Ads-Conversion-ID (`AW-18345460239`) und die Labels in
   `src/conversions.ts` stammen aus dem Ursprungsprojekt. Durch die eigenen
   Werte ersetzen, sonst laufen die Conversions in ein fremdes Konto.
2. `BRAND.url` in `src/data/iptvData.ts` sowie die Adressen in `index.html`,
   `public/robots.txt` und `public/sitemap.xml` prüfen, falls die Domain
   von `https://iptvgermany.app` abweicht.
3. `vercel.json` enthält noch die `frame-ancestors`-Liste des Ursprungs-
   projekts.
