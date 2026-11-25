# School Website Port

A premium, responsive school website built with Next.js App Router. The project presents a complete Aurelia Academy school experience with a polished, client-ready editorial design.

> **Status:** The code, CMS schemas and form integrations are implemented. Sanity and Formspree have not been tested against real accounts, and the project has not been deployed to Vercel. This preview deployment is intentionally not indexed by search engines.

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
| Forms | `@formspree/react`, Formspree, Zod validation |
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

Copy `.env.example` to `.env` and replace the placeholders with real values when they are available. Both `.env` and `.env.local` are ignored by Git; never commit either file or any real credentials. The `YOUR_*` placeholders are deliberately rejected by the app, so the built-in fallback content stays active until real values are supplied. You may use `.env.local` for machine-specific overrides.

| Variable | Purpose | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | From <https://www.sanity.io/manage>. Leave blank or keep its placeholder to use the built-in fallback content. |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | Usually `production`. Drafts are excluded from all public queries. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API date version | ISO date, for example `2026-11-01`. |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` | Contact form endpoint | Form ID is the part after `/f/` in the Formspree URL. |
| `NEXT_PUBLIC_FORMSPREE_ADMISSION_ID` | Admission form endpoint | Must be a separate Formspree form. |
| `NEXT_PUBLIC_SITE_URL` | Public origin | No trailing slash. Used for canonical URLs, Open Graph and the sitemap. |
| `SANITY_API_READ_TOKEN` | Optional, server-only | Only needed if live preview/draft mode is added later. Never prefix private tokens with `NEXT_PUBLIC_`. |

### Fallback content

When Sanity is unconfigured, unreachable or empty, the site uses a complete fallback dataset instead of blank pages. The public UI contains no demo labels; all copy reads as a finished school website.

- `src/content/site.ts` — school identity, emblem logo reference, address, email and phone number
- `src/content/pages.ts` — editorial copy, leadership names, programmes, FAQs and form options
- `src/content/demo.ts` — nine fallback articles, four categories, nine achievements and ten gallery items with internal `demo-` IDs
- `src/content/images.ts` — curated Pexels photography in `public/images/curated/`; original SVG artwork remains in `public/images/demo/` as a fallback
- `public/images/generated/School Port Education Emblem.png` — supplied emblem used in the header and footer
- `src/app/layout.tsx` — `robots: { index: false, follow: false }` for this preview deployment

Published Sanity documents always take priority. The fallback records disappear automatically once real published content exists. Replace the files above with verified school information before a production launch.

> The curated photographs are Pexels imagery. Source details are listed below.

### Photography credits

The ten WebP files in `public/images/curated/` were resized from Pexels photographs under the [Pexels License](https://www.pexels.com/license/). Attribution is not required by the license, but is recorded here for transparency.

| Local file | Pexels photo | Photographer |
| --- | --- | --- |
| `school-campus-students.webp` | [8926848](https://www.pexels.com/photo/8926848/) | Thirdman |
| `students-walking-campus.webp` | [7972512](https://www.pexels.com/photo/7972512/) | George Pak |
| `science-lab-experiment.webp` | [8471835](https://www.pexels.com/photo/8471835/) | MART PRODUCTION |
| `school-library-reading.webp` | [8926840](https://www.pexels.com/photo/8926840/) | Thirdman |
| `bright-classroom-lesson.webp` | [8617771](https://www.pexels.com/photo/8617771/) | Yan Krukau |
| `students-computer-lab-collaboration.webp` | [5621945](https://www.pexels.com/photo/5621945/) | Gustavo Fring |
| `students-outdoor-sports.webp` | [37429888](https://www.pexels.com/photo/37429888/) | Joaquin Reyes Ramos |
| `school-building-playground.webp` | [5896843](https://www.pexels.com/photo/5896843/) | Mary Taylor |
| `students-art-class.webp` | [8382373](https://www.pexels.com/photo/8382373/) | Pavel Danilyuk |
| `school-award-ceremony.webp` | [31772892](https://www.pexels.com/photo/31772892/) | Legacy of Fire |

---

## 3. Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with storytelling sections and CMS-backed previews |
| `/about` | School profile, vision, mission and leadership |
| `/academics` | Programmes, curriculum and teaching approach |
| `/achievements` | Achievements, with fallback items when CMS content is absent |
| `/campus-life` | Facilities, activities and events |
| `/gallery` | Gallery with filters and accessible lightbox |
| `/admissions` | Admissions process, FAQ and enquiry form |
| `/contact` | Contact information, form and optional map location |
| `/blog` | Articles, search, categories and pagination |
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
    layout.tsx          Root layout, fonts, metadata and preview noindex setting
    globals.css         Design tokens and global styles
    icon.svg            Generated app icon
    robots.ts           robots.txt
    sitemap.ts          XML sitemap (includes fallback article slugs)
  components/
    animations/         Framer Motion and GSAP wrappers
    blog/               Blog cards and safe Portable Text renderer
    forms/              Contact and admission forms, accessible fields
    gallery/            Filters, responsive grid, lightbox
    home/               Modular homepage sections
    layout/             Header, footer, CTA
    ui/                 Buttons, headings, breadcrumbs, state views
  content/              Centralised copy, fallback records and image references
  hooks/                Formspree submission hook
  lib/                  Content helpers, SEO, validation, utilities, types
  sanity/
    lib/                Environment, client, GROQ queries, image URL builder
    schemas/            Blog, category, author, achievement, gallery, announcement
public/
  images/curated/       Curated Pexels photographs (WebP)
  images/generated/     Legacy WebP pack and supplied emblem PNG
  images/demo/          Original SVG illustrations retained as fallbacks
tests/
  unit/                 Vitest and React Testing Library tests
  e2e/                  Playwright tests
```

---

## 5. Reusable components

- `Button`, `SectionHeading`, `PageHeading`, `Breadcrumbs`
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
| `announcement` | title, slug, category, summary, Portable Text body, image, publishedAt, expiresAt, pinned, featured |

Schemas are grouped in Sanity Studio structure under **Blog Management**, **Achievements**, **Gallery**, **Announcements**, **Authors** and **Categories**.

### Publishing workflow

1. Add the Sanity project ID to `.env` (or `.env.local` for a local-only override).
2. Visit `/studio` and sign in with an authorised Sanity account.
3. Create authors and categories first, then publish blogs, achievements, gallery images and announcements.
4. Public queries exclude `drafts.**` and only return published documents.
5. Public content is revalidated every 60 seconds and tagged for cache invalidation.
6. When published content exists, it replaces the fallback records automatically.

The Portable Text renderer in `src/components/blog/portable-text.tsx` renders known block types explicitly; it does not inject raw HTML.

---

## 7. Formspree configuration

1. Create two forms in Formspree: one for contact enquiries and one for admission enquiries.
2. Copy each form ID (the part after `https://formspree.io/f/`) into the matching environment variable.
3. In Formspree, configure the notification email and spam settings for each form.
4. Submit a real test enquiry and confirm it appears in Formspree before launch.

`src/hooks/use-formspree.ts` validates with Zod, then submits the payload through `useSubmit` from `@formspree/react`. The library posts JSON to `https://formspree.io/f/{ID}` with `Accept: application/json`. A success message is shown only when the library returns a success result; provider field and form errors are mapped onto the existing accessible error UI. Duplicate submissions are blocked while a request is pending, and a honeypot field is included. E2E tests use test-only IDs and intercept requests, so no real Formspree account is contacted.

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
- Formspree endpoint and form ID extraction
- Inline validation, accessible errors, mocked success and provider failure states
- Gallery lightbox, keyboard navigation and category filters
- GROQ query draft exclusions and structure
- CMS helper behaviour and demo fallbacks without credentials
- Metadata and JSON-LD generation

Playwright tests cover:

- Homepage rendering and desktop navigation
- Mobile menu and horizontal overflow
- All approved routes
- Fallback article listing, article detail and dynamic not-found handling
- Invalid and successfully mocked contact/admission submissions
- Gallery lightbox with curated images
- Custom not-found page

### Optional E2E fixtures

When a real Sanity dataset is configured, set these before running Playwright:

```bash
E2E_TEST_BLOG_SLUG=your-published-article-slug
E2E_GALLERY_FIRST_TITLE="Title of a published gallery image"
```

Without a CMS, the tests automatically use the fallback article slug and the first fallback gallery title.

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
9. Replace the fallback content with verified school information and remove the preview `noindex` setting before publishing.

No deployment has been performed as part of this delivery because no Vercel account, token or production domain was supplied.

### Sanity hosted content

- Create a hosted Sanity project and dataset.
- Add its project ID to Vercel and local `.env` (or `.env.local`).
- Invite only authorised school content administrators to Studio.
- Public visitors do not receive editor permissions.

---

## 10. Known limitations

- Identity, history, contact details, artwork, stories, achievements and leadership names in the current build are fallback content and must be replaced with verified school information before launch.
- The preview deployment is deliberately noindexed; no demo banner is shown on public routes.
- Formspree and Sanity are coded but have not been tested with real accounts or datasets.
- No Google Maps embed is rendered because no verified address/map URL was supplied.
- No testimonials or real statistics are displayed because none were verified.
- Lighthouse scores and real Core Web Vitals have not been measured in production.
- Local SVG illustrations are used because the image-generation service was unavailable; they are not photographs.
- npm may report engine warnings from transitive `jsdom` and `isomorphic-dompurify` packages on some Node 24 minor versions. Checks still run; use a supported Node LTS release in CI.

---

## 11. Future improvements

- Add verified school branding, photography, maps and editorial content.
- Replace the fallback records and remove the preview `noindex` setting at launch.
- Configure real Formspree forms and Sanity project credentials.
- Add an Open Graph image generated from approved school imagery.
- Add Sanity live preview with a server-only read token if editorial preview is required.
- Add automated Lighthouse and accessibility audits in CI.
- Add analytics only after privacy and consent requirements are confirmed.
- Add on-demand revalidation webhooks so published CMS content appears immediately.
