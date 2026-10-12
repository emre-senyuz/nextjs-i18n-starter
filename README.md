# nextjs-i18n-starter

A complete bilingual fictional agency site built with Next.js App Router, strict TypeScript, Tailwind CSS 4 and lucide-react. Requires Node.js 20.9+ and npm.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. `/` redirects to `/tr`.

```sh
npm run build
npm start
npm run typecheck
```

Set `SITE_URL` in `.env.local` to the public origin before deploying (see `.env.example`). It supplies the origin for canonical and language-alternate metadata. No secrets, external translation service, database, APIs, or runtime translation SDK are needed. The contact link opens the visitor’s email application; `hello@forma.example` is intentionally a fictional address. Replace it in both dictionaries before real-world use.

## Architecture

- Six content pages: `/tr`, `/tr/services`, `/tr/about`, `/en`, `/en/services`, `/en/about`.
- `app/[locale]/[[...slug]]/page.tsx` validates the page segment and shares one server rendering implementation. `generateStaticParams` pre-renders all six pages.
- `locales/tr.json` and `locales/en.json` own all visible copy and page metadata. `lib/i18n.ts` derives the dictionary type from Turkish and statically checks English against it. Its server-only boundary prevents dictionary imports into client bundles.
- `components/site.tsx` is server-rendered. Only the responsive header is a client component, receiving translated labels as props. It uses pathname plus local menu state, with no global state or cookie. The explicit locale URL always wins, including after refresh.
- The switcher replaces the locale and preserves the page. Active links expose `aria-current`; mobile navigation exposes expanded state. Native links support keyboard navigation, visible focus, and browser navigation. Content includes a skip link and reduced-motion support.
- Locale layouts own `<html lang>` so the document language is correct without a client-side effect. The entry route has its own minimal root layout.
- `dynamicParams = false` restricts the app to the six generated content URLs. Unsupported locales and unknown/deep page paths return HTTP 404. Helpers also use `notFound()` defensively. Next’s experimental `globalNotFound` option supports a full bilingual fallback across the multiple root layouts; it includes language-labeled recovery links and noindex. The 404 is a utility response, not an extra content page.
- Every content page has a localized title, description, canonical URL, and `tr`, `en`, and `x-default` language alternates.
- Tailwind is configured through PostCSS and imported in `app/globals.css`; custom CSS defines the shared editorial design. The abstract artwork is local CSS, with no image or font network requests.

## Screenshot

<!-- Screenshot placeholder: add docs/home-desktop.png after capturing the running app. -->

_Screenshot placeholder — desktop Turkish home page and mobile English navigation._

## Content changes

Edit both JSON dictionaries together. Keep their key structure aligned. The brand, contact copy, navigation, page text, metadata, footer, and missing-page text live there. Dates are deterministic strings to avoid server/client rendering differences. No tests are included, as requested.

## Verification performed

- Production build passed with Next.js 16.4.0, including strict TypeScript checking and pre-rendering all six content pages.
- All six content URLs returned HTTP 200 with the correct document language, localized title/description, and language alternates. `/` returned HTTP 307 to `/tr`.
- `/de`, `/en/missing`, and `/tr/services/extra` returned HTTP 404 with bilingual recovery content.
- Opened all six content pages in a browser: no console errors or hydration warnings observed. Verified the Services and About language switches preserve their path.
- Checked the responsive navigation at 390px, including open/close behavior and language switching, with no horizontal overflow on the checked About pages.
- On this Windows host, dependency installation, builds, and localhost checks needed execution outside the filesystem sandbox. The final production build passed there. The temporary verification server was stopped after the checks.
