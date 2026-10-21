# KFO — Khaled Alfagih Engineering Consultancy Company

Modern, responsive, bilingual (English LTR + Arabic RTL) marketing website — **front-end only**.
Static/mock content lives in typed data files so it can later be wired to WordPress (headless) or any backend.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · next-intl · Framer Motion · Lenis · lucide-react · next/font · next/image

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (statically generates all 61 pages with SSG)
npm run start      # serve the production build locally
npm run lint       # next lint (zero warnings or errors)
npm run typecheck  # tsc --noEmit
```

## Deploy to Vercel (Production Ready)

The project is configured for seamless, zero-config deployment on **Vercel** with full Edge middleware support, dynamic metadata routes, and static SSG page generation.

### Exact Deployment Steps:
1. **Push the repository to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Vercel production deployment setup"
   git push origin main
   ```
2. **Import the repository in Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your Git repository.
   - **Framework Preset**: Next.js (auto-detected).
   - **Root Directory**: `./` (default).
   - **Build Command**: `next build` (default).
   - **Output Directory**: `.next` (default).
3. **Add Environment Variables**:
   Configure the variables listed in `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` = `https://kfoco.com` (canonical domain for metadata, sitemap, hreflang, Open Graph)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `+966506515861` (international direct WhatsApp contact)
   - `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (optional Google Analytics Measurement ID)
4. **Deploy & Add Custom Domain**:
   - Click **Deploy**. Vercel will build all static pages and edge middleware in ~1 minute.
   - Navigate to **Project Settings → Domains**.
   - Add `kfoco.com` (and `www.kfoco.com`).
   - Update your DNS records as directed by Vercel:
     - **A Record**: `@` → `76.76.21.21`
     - **CNAME Record**: `www` → `cname.vercel-dns.com`
   - SSL certificate generation and global CDN propagation complete automatically.

Optional environment (`.env`):

```bash
NEXT_PUBLIC_SITE_URL=https://kfoco.com   # canonical URL for sitemap/hreflang/JSON-LD
```

## Locale routing

| Locale | URL pattern | Layout |
|--------|-------------|--------|
| English (default) | `/`, `/about`, `/projects/…` | LTR |
| Arabic | `/ar`, `/ar/about`, `/ar/projects/…` | RTL |

- The language switcher in the header/top bar/mobile menu keeps the current path.
- Every page emits `hreflang` alternates (en / ar / x-default) + canonical.
- `sitemap.xml` and `robots.txt` are generated (`src/app/sitemap.ts`, `src/app/robots.ts`).
- JSON-LD (Organization + LocalBusiness) is injected in `src/app/[locale]/layout.tsx`.

## Folder structure

```
src/
├── app/
│   ├── globals.css            # tokens, blueprint grid, buttons, a11y classes, reduced-motion
│   ├── robots.ts / sitemap.ts
│   └── [locale]/
│       ├── layout.tsx         # fonts, intl provider, header/footer, JSON-LD
│       ├── template.tsx       # soft fade page transition
│       ├── page.tsx           # HOME (all home sections in order)
│       ├── about/  services/  projects/  projects/[slug]/
│       ├── [category]/        # /healthcare /education /residential /industrial
│       │                      # /hospitality /offices-building /transportation /interior
│       ├── our-clients/  knowledge-center/  knowledge-center/[slug]/
│       ├── events/  events/[slug]/  contact/
│       └── not-found.tsx
├── components/
│   ├── ui/                    # Button, Reveal, CountUp, Lightbox, PageHeader, Breadcrumb…
│   ├── layout/                # TopBar, Header, MobileMenu, Footer, FloatingActions,
│   │                          # AccessibilityWidget, LanguageSwitcher, SocialIcons, SmoothScroll
│   └── sections/
│       ├── home/              # Hero, AboutIntro, CategoryTiles, FeaturedProjects,
│       │                      # ServicesSection, CtaBanner, StatsSection, ClientsMarquee…
│       └── shared/            # ProjectsGrid, ProjectGallery, ProcessSteps, Timeline,
│                              # ContactForm, ArticleCard, KnowledgeExplorer
├── data/                      # ALL content (see below)
├── messages/                  # en.json / ar.json — every UI string
├── i18n/                      # next-intl routing/request/navigation
└── lib/                       # utils, seo (metadata + JSON-LD), motion variants
```

## Design decisions (summary)

**Palette** (Tailwind tokens in `tailwind.config.ts`):
- Ink/navy `#0F1B2D` / `#0B1F33` — headers, footers, overlays
- Steel blue `#7C9AA6` (+ tint `#DCE6EA`, shade `#4F6F7C`) — brand accent (from the existing theme-color)
- Muted gold `#B08D57` — hairlines, small labels, hover underlines only
- Neutrals: `#F7F8F9`, `#E8EBED`, text `#1C2430` / muted `#5B6673` — all AA compliant

**Type:** Playfair Display (EN display, restrained serif) · Inter (EN body) · IBM Plex Sans Arabic (AR, remapped via CSS variables on `html[lang="ar"]`). Small uppercase letter-spaced labels ("ABOUT US"), editorial scale, generous whitespace, 1px dividers, blueprint grid at ~4% opacity.

**Motion:** quiet and editorial — crossfade + Ken-Burns hero, line-by-line headline masks, scroll-reveal fade/translate (once), count-up stats, image zoom on hover, fill-sweep buttons, dual-direction logo marquee, thin scroll-progress bar, soft page fades. Transform/opacity only. Everything respects `prefers-reduced-motion` (CSS + `useReducedMotion`).

**RTL:** logical CSS only (`ms/me/ps/pe/start/end`) — no hardcoded left/right. Arrows, menus, marquee, buttons and layout mirror automatically; Western digits kept in both locales.

## How to swap content

All copy/data is data-driven — **no content is hardcoded in components**.

| What | Where | Notes |
|------|-------|-------|
| UI strings (labels, buttons, headings) | `src/messages/en.json`, `src/messages/ar.json` | nested by section; AR is professional MSA |
| Projects | `src/data/projects.ts` | `{ en, ar }` per field; images array; `featured` flag |
| Categories (8) | `src/data/categories.ts` | slug matches old site URLs |
| Services / process | `src/data/services.ts` | |
| Stats | `src/data/stats.ts` | experience figure unified to **29+** everywhere |
| Client logos | `src/data/clients.ts` | exact WP media filenames; set `name` per logo |
| Articles / Events | `src/data/articles.ts`, `src/data/events.ts` | mock content |
| Timeline / certificates | `src/data/timeline.ts`, `src/data/qualifications.ts` | placeholders |
| Contact + socials | `src/data/site.ts` | |
| **Every image URL** | `src/data/assets.ts` | single map — hotlinks kfoco.com + Unsplash placeholders; swap to `/public` assets here |
| SEO / JSON-LD | `src/lib/seo.ts` | |
| Design tokens | `tailwind.config.ts` + `src/app/globals.css` | |

To replace hotlinked images with local ones: drop files into `public/images/…` and change `assets.ts` values to `/images/…` (then remove the `remotePatterns` entries in `next.config.mjs` if unused).

## Animations & effects implemented (per spec)

- Hero slideshow crossfade + slow Ken-Burns, masked line-by-line headline, line-draw, scroll indicator, floating "+29 Years" badge
- Sticky header: transparent over hero → blurred solid on scroll; hides on scroll down / shows on scroll up
- Scroll-reveal (staggered, once), count-up stats, project-card zoom + overlay + arrow
- Category tiles: hover underline + darkening overlay + caption reveal
- Buttons: fill-sweep (steel → navy), arrow nudge (RTL-aware)
- Client logo marquee: 2 rows, opposite directions, pause on hover, grayscale → color
- Subtle parallax on the CTA banner only
- Scroll-progress bar, soft page transitions, floating WhatsApp + back-to-top
- Accessibility widget: text ±, high contrast, grayscale, underline links, readable font, reset (localStorage)

## Accessibility & performance

- Semantic landmarks, skip link, focus-visible rings, keyboard-navigable menu/lightbox, `aria-*` states on filters/toggles, alt text everywhere
- `prefers-reduced-motion` disables all decorative motion
- Images lazy-loaded with `sizes` + `priority` above the fold; animate only transform/opacity
- Fully static output (SSG) — Lighthouse-friendly; fonts via `next/font` (preload, no layout shift)

---

## TODO list for the client ✅

Everything below is **explicitly marked in code** with `// TODO` comments and rendered with a dashed gold underline (`TodoText` component) where visible. **No facts, awards, client names or project details were invented.**

1. **Project metadata** — location, year, client, area, services provided, status for all 3 featured projects (Dallah Namar Hospital, Dr. Mohamed Alfagih Hospital, Al Hammadi Medical Complex), plus official project descriptions.
2. **Project & category photography** — real photos for the 8 categories, hero slides (currently kfoco `img1.jpg` + 2 Unsplash placeholders) and project galleries.
3. **Certificates** — 8 real scanned certificates for the Qualifications ("Updated Profile") gallery + real titles.
4. **Client logos** — confirm each logo file is correct and supply the **real client names** for alt text/SEO (`src/data/clients.ts`).
5. **Address** — full office address (building, street, district, zip) + working hours + map coordinates/embed.
6. **Vision & mission** — official statements (About page).
7. **Timeline milestones** — confirm founding year (currently "1996") and milestone years.
8. **Knowledge Center & Events** — real articles/downloads/event write-ups (currently marked mock content).
9. **Arabic copy proofreading** — the AR translations are professional MSA drafts; please review officially before launch.
10. **White logo** — currently rendered via CSS filter (`brightness(0) invert(1)`); replace with a real white asset if available.
11. **Contact form endpoint** — form validates client-side only (front-end scope); wire to email/CRM later.
12. **Company profile PDF** — verify the live link `KFO_2025.pdf` remains current.
13. **Formal SEO** — confirm `NEXT_PUBLIC_SITE_URL` and review titles/descriptions per page before launch.
