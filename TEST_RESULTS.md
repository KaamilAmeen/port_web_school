# Test results

Recorded in `C:\Freelancing\Portfolio\port_web_school` on 2026-11-25.

## Environment

- Node.js `v24.12.0`
- npm `11.6.2`
- Next.js `16.4.6`
- Sanity credentials: not configured (built-in fallback content used; no demo labels in the public UI)
- Formspree credentials: not configured (test-only IDs used for mocked E2E requests)
- Environment files: `.env` contains safe placeholders and is Git-ignored; `.env.example` remains the committed template. No write token is exposed to the client.
- Imagery: ten curated Pexels photographs are stored as WebP in `public/images/curated/`; the supplied `School Port Education Emblem.png` is in `public/images/generated/`. Legacy generated WebPs and original SVGs in `public/images/demo/` are retained as fallbacks.

## Commands

| Command | Result | Notes |
| --- | --- | --- |
| `npm run typecheck` | PASS | Strict TypeScript with `noUncheckedIndexedAccess`; no errors. |
| `npm run lint` | PASS | ESLint 9 flat config using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. |
| `npm run test` | PASS | 7 test files, 36 tests passed. Covers schemas, form validation, `@formspree/react` success/field-error/failure mocks, placeholder IDs, curated image paths, Announcement GROQ queries, fallback records, gallery interaction and SEO. Public UI copy contains no demo labels. |
| `npm run build` | PASS | 23 static/dynamic route entries generated, including nine fallback article slugs and `/studio`. |
| `npx playwright install chromium` | PASS | Chromium installed for Playwright. |
| `npm run test:e2e` | PASS | Final clean run: 12 passed, 0 failed, 0 skipped, no Next.js Image LCP warning. Requests to Formspree are intercepted with `next: "/thanks"` responses and the required CORS headers. |

`git check-ignore -v .env .env.local` confirmed that both files are ignored through `.gitignore`. `.env` does not appear in `git status`.

Earlier E2E failures were caused by stray `next dev`/`next start` processes sharing the project's `.next` directory. All servers were stopped and `.next` was removed before the final run. The E2E web server started cleanly on port 3100, and no server was left running afterwards.

A final repository grep confirmed that `fictional`, `demonstration`, `demo` (as visible copy), `preview only`, `not real`, `placeholder notice` and `role="note"` do not appear in client-facing strings. Remaining `demo-` IDs and `demoImages` identifiers are internal fallback logic only.

## CMS and form integration checks

- Announcement is registered in `src/sanity/schemas/index.ts`, grouped in Studio structure, typed in `src/lib/types/sanity.ts`, queried with `announcementListQuery`/`featuredAnnouncementsQuery`, and exposed through `getAnnouncements()`/`getFeaturedAnnouncements()`.
- Announcement queries exclude drafts, honour `expiresAt` with a `$now` parameter, order pinned items first, return Portable Text `body`, and expose Sanity image URLs and alt text.
- Contact and admission forms validate with Zod, then submit via `useSubmit` from `@formspree/react`. Provider field errors map to the matching inputs; general errors render in an alert; duplicate submissions are blocked while pending; placeholder IDs prevent network requests.
- `/studio` returned 200 in the E2E route smoke check. No real Sanity project or Formspree account was contacted.

## Production route smoke check

Route statuses were smoke-checked with `npm run start -- --hostname 127.0.0.1 --port 3211` and `curl.exe`; the final image and responsive checks used the development server on port 3100 after the clean E2E run.

| Route | Status |
| --- | --- |
| `/` | 200 |
| `/about` | 200 |
| `/academics` | 200 |
| `/achievements` | 200 |
| `/campus-life` | 200 |
| `/gallery` | 200 |
| `/admissions` | 200 |
| `/contact` | 200 |
| `/blog` | 200 |
| `/blog/how-inquiry-shapes-a-monday-morning` | 200 |
| `/blog/e2e-slug-that-does-not-exist` | 404 (expected) |
| `/studio` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/icon.svg` | 200 |
| `/images/demo/hero.svg` | 200 (retained fallback) |
| `/images/generated/hero.webp` | 200 (legacy asset retained) |
| `/images/generated/School%20Port%20Education%20Emblem.png` | 200 |
| Optimized emblem URL via `/_next/image` | 200 |
| Curated Pexels WebPs via `/_next/image` | loaded successfully in all responsive checks |

The unknown article slug also rendered the custom not-found page in the production response. Temporary smoke-check servers were stopped afterwards.

## Client-facing copy cleanup

All visible demonstration wording was removed from the public UI. The site now reads as a finished school website:

- The header sublabel is "Independent school"; the footer shows the school name, copyright and tagline.
- No `PlaceholderNotice`, `DemoBanner` or `role="note"` demo notice remains on any public route.
- Empty states, error messages, form feedback and article/gallery copy use natural school language.
- Fallback content uses the polished **Aurelia Academy** identity with an `.org` email address and a standard phone number.
- Structured data uses `School` with the shared site identity and no demonstration disclaimer.
- Internal `demo-` IDs and `demoImages` identifiers remain for fallback logic; they are never displayed.
- Root metadata still sets `robots: { index: false, follow: false }` for this preview deployment.

## Curated imagery

All ten active images come from `public/images/curated/`, with photographer and source details recorded in `README.md`. Alt text describes the visible subject, and image credits use a simple "Photograph by … via Pexels" format. The supplied emblem is used in the header and footer. Legacy `public/images/generated/*.webp` files and the original SVG illustrations in `public/images/demo/` remain available as fallbacks; no Unsplash URLs remain in `src/content/images.ts`, `next.config.ts` or the CSP.

## Responsive image and logo check

After the final copy cleanup and clean E2E run, the site was re-checked with Playwright at 1440×900, 1920×1080, 768×1024, 375×812 and 430×932:

- No horizontal overflow on `/` or `/gallery`; `scrollWidth` matched `innerWidth` at every viewport.
- No broken images after scrolling through all lazy-loaded images and no console or page errors.
- Gallery contains ten items; the first tile is `A morning in class` and the lightbox buttons expose meaningful labels.
- Hero uses `object-fit: cover`, with `50% 45%` positioning at 375px and 430px and centered positioning from 768px upward. The home hero is `loading="eager"` with `fetchPriority="high"`.
- Header and footer emblem images loaded with `object-fit: contain` at 42×30 CSS pixels inside their tiles at every viewport.

## Known warnings and limitations

- `npm install @formspree/react` emitted `EBADENGINE` warnings for transitive `isomorphic-dompurify`, `jsdom` and `w3c-xmlserializer` packages on Node `24.12.0`, and reported 18 dependency advisories. No `audit fix` was applied. Typecheck, lint, unit tests, production build and E2E tests all passed.
- The pre-existing `npm run sanity:schema` script cannot extract a schema because the repository has no `sanity.cli.ts` CLI configuration. The embedded Studio route itself was verified at `/studio`; no new CLI configuration was added because it was outside the requested integration.
- An earlier Next.js Image LCP warning was resolved by using `loading="eager"` and `fetchPriority="high"` on the home hero, removing the duplicate lazy hero preview from the homepage, and making the first visible gallery tile eager with high fetch priority.

## Not verified

- Live Sanity project/dataset connectivity and replacement of fallback records with published documents
- Announcement content publishing and any future public announcements UI (the schema/query/helper layer is in place)
- Live Formspree delivery to a real school inbox
- Vercel deployment and production domain configuration
- Real school branding, consented photography, map embed, testimonials and statistics
