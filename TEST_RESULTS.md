# Test results

Recorded in `C:\Freelancing\Portfolio\port_web_school` on 2026-11-25.

## Environment

- Node.js `v24.12.0`
- npm `11.6.2`
- Next.js `16.4.6`
- Sanity credentials: not configured
- Formspree credentials: not configured (test-only IDs used for mocked E2E requests)

## Commands

| Command | Result | Notes |
| --- | --- | --- |
| `npx tsc --noEmit` | PASS | No TypeScript errors after adding author fields to the blog post type and tightening Portable Text narrowing. |
| `npm run lint` | PASS | ESLint 9 flat config using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. |
| `npm run test` | PASS | 6 test files, 25 tests passed. |
| `npm run build` | PASS | Production build completed; 14 static/dynamic route entries generated. |
| `npx playwright install chromium` | PASS | Chromium installed for Playwright. |
| `npm run test:e2e` | PASS | 10 passed, 2 skipped. Runs against a local dev server on port 3100 with mocked Formspree responses; CMS-dependent cases are skipped because no published Sanity content was supplied. |

## Production route smoke check

Started with `npm run start -- --hostname 127.0.0.1 --port 3210` and checked each HTTP status with `curl.exe`.

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
| `/blog/e2e-slug-that-does-not-exist` | 404 (expected) |
| `/studio` | 200 |
| `/sitemap.xml` | 200 |
| `/robots.txt` | 200 |
| `/icon.svg` | 200 |
| `/images/placeholders/hero.svg` | 200 |

## Placeholder imagery

All temporary images are now local SVG graphics under `public/images/placeholders/`. They are labelled as placeholders and contain no fabricated photographs, people, events, facilities or achievements. The previous Unsplash URLs returned 404 and were removed from `src/content/images.ts`, `next.config.ts` and the CSP.

## Known warnings

npm emits `EBADENGINE` warnings from a transitive `isomorphic-dompurify`/`jsdom` dependency of Sanity because this machine runs Node `24.12.0` and that transitive package requests a newer Node minor. The top-level `jsdom` is pinned to `29.1.1`; typecheck, lint, unit tests, production build and route smoke checks all passed on this machine.
