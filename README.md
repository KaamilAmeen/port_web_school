# School Website Port

A premium, responsive school website built with Next.js App Router. The project currently ships in **fictional demo mode**: it presents a complete-looking school called **Aurelia Academy**, but every name, image, story, achievement and contact detail is clearly labelled as demonstration content.

> **Status:** The code, CMS schemas and form integrations are implemented. Sanity and Formspree have not been tested against real accounts, and the project has not been deployed to Vercel. Fictional demo content is intentionally not indexed by search engines.

---

## 1. Technology stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | Strict TypeScript |
| Styling | Tailwind CSS 4 with custom design tokens |
| UI | shadcn-style reusable components, Lucide React icons |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| CMS | Sanity Studio, Sanity JavaScript client, GROQ, image URL builder |
| Forms | Formspree, Zod validation, React Testing Library |
| Testing | Vitest, React Testing Library, Playwright |
| SEO | Next.js Metadata API, sitemap, robots, JSON-LD |
| Security | CSP and security headers in `next.config.ts`, explicit image hosts |
| Deployment | GitHub + Vercel (instructions below) |

### Design direction

**Academic Elegance — Navy, Gold and Ivory.** Design tokens are defined in `src/app/globals.css`. Headings use Playfair Display; body and navigation use Manrope.

---

## 2. Local setup

### Requirements

- Node.js 24 LTS (or a version supported by Next.js 16)
- npm 11 or compatible
- Git

### Install

```bash
git clone https://github.com/KaamilAmeen/port_web_school.git
cd port_web_school
cp .env.example .env
npm install
npm run dev
```

Open <http://localhost:3000>. Sanity Studio is available at <http://localhost:3000/studio>.

### Environment variables

Copy `.env.example` to `.env` and replace the placeholders with real values when they are available. Both `.env` and `.env.local` are ignored by Git; never commit either file or any real credentials. The `YOUR_*` placeholders are deliberately rejected by the app, so the labelled fictional demo content stays active until real values are supplied. You may use `.env.local` for machine-specific overrides.

| Variable | Purpose | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | From <https://www.sanity.io/manage>. Leave blank or keep its placeholder to use the labelled fictional demo fallback content. |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | Usually `production`. Drafts are excluded from all public queries. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API date version | ISO date, for example `2026-11-01`. |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` | Contact form endpoint | Form ID is the part after `/f/` in the Formspree URL. |
| `NEXT_PUBLIC_FORMSPREE_ADMISSION_ID` | Admission form endpoint | Must be a separate Formspree form. |
| `NEXT_PUBLIC_SITE_URL` | Public origin | No trailing slash. Used for canonical URLs, Open Graph and the sitemap. |
| `SANITY_API_READ_TOKEN` | Optional, server-only | Only needed if live preview/draft mode is added later. Never prefix private tokens with `NEXT_PUBLIC_`. |

### Fictional demo mode

When Sanity is unconfigured, unreachable or empty, the site uses fictional fallback records instead of blank pages:

- `src/content/site.ts` — fictional school identity, address, `.example` email and reserved 555 phone number
- `src/content/pages.ts` — fictional editorial copy, leadership names, programmes, FAQs and form options
- `src/content/demo.ts` — nine demo articles, four categories, six achievements and ten gallery items with `demo-` IDs
- `src/content/images.ts` — local SVG demo artwork in `public/images/demo/`
- `src/components/ui/demo-banner.tsx` — visible notice on every public route
- `src/app/layout.tsx` — `robots: { index: false, follow: false }` while demo content is active

Published Sanity documents always take priority. The demo records disappear automatically once real published content exists. Search the repository for `fictional` and `demo` before launch, and replace the files above with verified school information.

> The generated-image service rejected all image requests with `Invalid credential`, so the artwork is locally authored SVG illustration, not photography. Replace it with approved school photography before launch.

---

## 3. Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with storytelling sections and CMS/demo previews |
| `/about` | Fictional school profile, vision, mission and leadership |
| `/academics` | Fictional programmes, curriculum and teaching approach |
| `/achievements` | Published achievements, or labelled demo achievements when CMS content is absent |
| `/campus-life` | Fictional facilities, activities and events |
| `/gallery` | CMS or demo gallery with filters and accessible lightbox |
| `/admissions` | Fictional process, FAQ and enquiry form |
| `/contact` | Fictional contact information, form and optional map location |
| `/blog` | Published articles or demo stories, search, categories and pagination |
| `/blog/[slug]` | Dynamic article detail with Portable Text and related posts |
| `/studio` | Sanity Studio with setup fallback when unconfigured |

Loading, error and not-found states are implemented in `src/app/(website)/loading.tsx`, `src/app/(website)/error.tsx` and `src/app/not-found.tsx`.

---

## 4. Project structure

```text
src/
  app/
    (website)/          Public website routes and route-level states
    studio/             Sanity Studio route
    layout.tsx          Root layout, fonts, metadata and demo noindex setting
    globals.css         Design tokens and global styles
    icon.svg            Generated app icon
    robots.ts           robots.txt
    sitemap.ts          XML sitemap (includes demo article slugs)
  components/
    animations/         Framer Motion and GSAP wrappers
    blog/               Blog cards and safe Portable Text renderer
    forms/              Contact and admission forms, accessible fields
    gallery/            Filters, responsive grid, lightbox
    home/               Modular homepage sections
    layout/             Header, footer, CTA
    ui/                 Buttons, headings, breadcrumbs, demo banner, state views
  content/              Centralised copy, demo records and image references
  hooks/                Formspree submission hook
  lib/                  Content helpers, SEO, validation, utilities, types
  sanity/
    lib/                Environment, client, GROQ queries, image URL builder
    schemas/            Blog, category, author, achievement, gallery
public/
  images/demo/          Local SVG demo illustrations
tests/
  unit/                 Vitest and React Testing Library tests
  e2e/                  Playwright tests
```

---

## 5. Reusable components

- `Button`, `SectionHeading`, `PageHeading`, `Breadcrumbs`, `PlaceholderNotice`, `DemoBanner`
- `EmptyState`, `ErrorMessage`, `LoadingIndicator`
- `FadeIn`, `StaggerReveal`, `AnimatedText`, `GsapReveal`, `ScrollProgress`
- `Header`, `Footer`, `CtaSection`, `FaqAccordion`
- `ContactForm`, `AdmissionForm`, accessible `TextField`, `TextAreaField`, `SelectField`, `Honeypot`
- `BlogCard`, `PortableText`, `GalleryGrid`
- Homepage sections: hero, introduction, highlights, academics, achievements preview, campus preview, gallery preview, blog preview

---

## 6. Sanity CMS

### Schemas

| Document type | Important fields |
| --- | --- |
| `blog` | title, slug, excerpt, coverImage, Portable Text body, author, category, publishedAt, featured, SEO fields |
| `category` | title, slug, description |
| `author` | name, designation, profileImage, biography |
| `achievement` | title, slug, description, category, achievementDate, coverImage, featured, publishedAt |
| `gallery` | title, slug, image, category, altText, eventDate, featured |

Schemas are grouped in Sanity Studio structure under **Blog Management**, **Achievements**, **Gallery**, **Authors** and **Categories**.

### Publishing workflow

1. Add the Sanity project ID to `.env` (or `.env.local` for a local-only override).
2. Visit `/studio` and sign in with an authorised Sanity account.
3. Create authors and categories first, then publish blogs, achievements and gallery images.
4. Public queries exclude `drafts.**` and only return published documents.
5. Public content is revalidated every 60 seconds and tagged for cache invalidation.
6. When published content exists, it replaces the fictional demo records automatically.

The Portable Text renderer in `src/components/blog/portable-text.tsx` renders known block types explicitly; it does not inject raw HTML.

---

## 7. Formspree configuration

1. Create two forms in Formspree: one for contact enquiries and one for admission enquiries.
2. Copy each form ID (the part after `https://formspree.io/f/`) into the matching environment variable.
3. In Formspree, configure the notification email and spam settings for each form.
4. Submit a real test enquiry and confirm it appears in Formspree before launch.

The client posts JSON to `https://formspree.io/f/{ID}` with `Accept: application/json`. A success message is shown only when Formspree returns an OK response. Validation is performed with Zod, duplicate submissions are blocked while a request is pending, and a honeypot field is included. E2E tests use test-only IDs and intercept requests, so no real Formspree account is contacted.

---

## 8. Testing

### Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

`npm run test:e2e` starts a local dev server on port 3100 using test-only Formspree IDs. Playwright intercepts Formspree requests. Stop any other `next dev` server for this project first, because Next.js uses a shared development lock.

### Coverage

Unit tests cover:

- Contact and admission schema validation
- Formspree endpoint construction
- Inline validation, accessible errors, mocked success and provider failure states
- Gallery lightbox, keyboard navigation and category filters
- GROQ query draft exclusions and structure
- CMS helper behaviour and demo fallbacks without credentials
- Metadata and demo-labelled JSON-LD generation

Playwright tests cover:

- Homepage rendering and desktop navigation
- Mobile menu and horizontal overflow
- All approved routes
- Demo article listing, demo article detail and dynamic not-found handling
- Invalid and successfully mocked contact/admission submissions
- Gallery lightbox with demo images
- Custom not-found page

### Optional E2E fixtures

When a real Sanity dataset is configured, set these before running Playwright:

```bash
E2E_TEST_BLOG_SLUG=your-published-article-slug
E2E_GALLERY_FIRST_TITLE="Title of a published gallery image"
```

Without a CMS, the tests automatically use the demo article slug and the first demo gallery title.

### Recorded results

See `TEST_RESULTS.md` for the commands executed in this delivery and their outcomes.

---

## 9. Deployment

### Vercel

1. Push `main` to the GitHub repository.
2. In Vercel, choose **Add New → Project** and import the GitHub repository.
3. Keep the default Next.js framework settings.
4. Add every variable from `.env.example` under **Project Settings → Environment Variables**.
5. Set `NEXT_PUBLIC_SITE_URL` to the final production origin.
6. Deploy. Vercel will run `npm run build` automatically.
7. Confirm `/sitemap.xml`, `/robots.txt`, `/studio`, forms and CMS content on the deployed domain.
8. Add the production domain to Sanity CORS and to the Formspree allowed origins if required by those providers.
9. Replace all demo content and remove the demo `noindex` setting before publishing as a real school site.

No deployment has been performed as part of this delivery because no Vercel account, token or production domain was supplied.

### Sanity hosted content

- Create a hosted Sanity project and dataset.
- Add its project ID to Vercel and local `.env` (or `.env.local`).
- Invite only authorised school content administrators to Studio.
- Public visitors do not receive editor permissions.

---

## 10. Known limitations

- All identity, history, contact details, artwork, stories, achievements and leadership names in the current build are fictional demo content and must be replaced before launch.
- The demo is deliberately noindexed and shows a visible demo banner on every public route.
- Formspree and Sanity are coded but have not been tested with real accounts or datasets.
- No Google Maps embed is rendered because no verified address/map URL was supplied.
- No testimonials or real statistics are displayed because none were verified.
- Lighthouse scores and real Core Web Vitals have not been measured in production.
- Local SVG illustrations are used because the image-generation service was unavailable; they are not photographs.
- npm may report engine warnings from transitive `jsdom` and `isomorphic-dompurify` packages on some Node 24 minor versions. Checks still run; use a supported Node LTS release in CI.

---

## 11. Future improvements

- Add verified school branding, photography, maps and editorial content.
- Remove the demo banner, demo records and demo `noindex` setting at launch.
- Configure real Formspree forms and Sanity project credentials.
- Add an Open Graph image generated from approved school imagery.
- Add Sanity live preview with a server-only read token if editorial preview is required.
- Add automated Lighthouse and accessibility audits in CI.
- Add analytics only after privacy and consent requirements are confirmed.
- Add on-demand revalidation webhooks so published CMS content appears immediately.
