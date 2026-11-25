# Test results

Recorded in `C:\Freelancing\Portfolio\port_web_school` on 2026-11-25.

## Environment

- Node.js `v24.12.0`
- npm `11.6.2`
- Next.js `16.4.6`
- Sanity credentials: not configured (labelled fictional demo fallback content used)
- Formspree credentials: not configured (test-only IDs used for mocked E2E requests)
- Environment files: `.env` contains safe placeholders and is ignored by Git; `.env.example` is the committed template
- Image generation: unavailable (`Invalid credential` for every request), so local SVG demo artwork was used

## Commands

| Command | Result | Notes |
| --- | --- | --- |
| `npx tsc --noEmit` | PASS | No TypeScript errors. |
| `npm run lint` | PASS | ESLint 9 flat config using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. |
| `npm run test` | PASS | 6 test files, 28 tests passed. Includes demo fallback, placeholder-env handling and demo-labelled JSON-LD tests. |
| `npm run build` | PASS | Production build completed with `.env` placeholders loaded; 23 static/dynamic route entries generated, including nine demo article slugs. |
| `npx playwright install chromium` | PASS | Chromium installed for Playwright. |
| `npm run test:e2e` | PASS | Final clean run: 12 passed, 0 failed, 0 skipped. Runs against a local dev server on port 3100 with mocked Formspree responses and demo CMS fallbacks. |

`git check-ignore -v .env .env.local` confirmed that both files are ignored through `.gitignore`, while `.env.example` remains committed as the placeholder template. `.env` does not appear in `git status`.

Earlier E2E attempts failed because stray `next dev` processes for the same project were still running, and the homepage assertion used old placeholder text. The processes were stopped, the assertion was updated, and the final clean run passed. An experiment with a conditional `dynamicParams` export was reverted because Next.js requires a static boolean; no such configuration is present in the committed code.

## Production route smoke check

Started with `npm run start -- --hostname 127.0.0.1 --port 3211` and checked each HTTP status with `curl.exe`.

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
| `/images/demo/hero.svg` | 200 |

The unknown demo article slug also rendered the custom not-found page in the production response. The temporary smoke-check server was stopped afterwards.

## Fictional demo content

The site uses a coherent fictional identity, **Aurelia Academy**, when Sanity is unconfigured, unreachable or empty. All invented facts are visibly labelled in the UI:

- A global demo banner appears on every public route.
- Blog articles built from demo records show a demo notice.
- Root metadata sets `robots: { index: false, follow: false }`.
- Structured data uses `School` with fictional contact details and states that the site is a fictional demonstration.
- Demo records use `demo-` IDs, and published Sanity content always takes priority.

## Demo imagery

All demo images are locally authored SVG illustrations under `public/images/demo/`. They are labelled as fictional demo illustrations in alt text and surrounding copy. No fabricated photographs are presented as real. The previous Unsplash URLs returned 404 and were removed from `src/content/images.ts`, `next.config.ts` and the CSP. Automated image generation was attempted for ten illustrations but failed with `Invalid credential`; local SVG artwork was produced instead so the site could be completed without external image credentials.

## Known warnings

npm emits `EBADENGINE` warnings from a transitive `isomorphic-dompurify`/`jsdom` dependency of Sanity because this machine runs Node `24.12.0` and that transitive package requests a newer Node minor. The top-level `jsdom` is pinned to `29.1.1`; typecheck, lint, unit tests, production build, E2E tests and route smoke checks all passed on this machine.

## Not verified

- Live Sanity project/dataset connectivity and published-document fallback replacement
- Live Formspree delivery to a real school inbox
- Vercel deployment and production domain configuration
- Real school branding, photography, map embed, testimonials and statistics
