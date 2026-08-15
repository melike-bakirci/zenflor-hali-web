# Zenflor — Karo Halı & Çim Halı

Digital storefront and informational site for Zenflor, selling carpet tiles (karo halı) and artificial grass (çim halı) to both B2B clients (architects, contractors, businesses) and B2C retail customers.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router 8](https://reactrouter.com/) (framework mode, SPA with static prerendering)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [i18next](https://www.i18next.com/) for TR/EN translations

## Getting started

```sh
npm install
npm run dev
```

## Scripts

| Command             | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `npm run dev`       | Start the dev server                                                 |
| `npm run build`     | Prerender the site to `build/client` (runs sitemap generation first) |
| `npm run typecheck` | Type-check with `tsc -b`                                             |
| `npm run lint`      | Lint with [oxlint](https://oxc.rs/)                                  |
| `npm run preview`   | Build and preview the production output                              |

## Structure

- `app/root.tsx` — root route (HTML shell + `<Outlet />`)
- `app/routes.ts` — route config (URL patterns → route modules)
- `app/routes/` — route modules (home, product listing/detail, blog, contact, legal, etc.)
- `app/components/` — UI and layout components
- `app/data/` — products, blog posts, and references content
- `app/i18n/` — translation resources and setup
- `app/lib/` — shared helpers (`constants.ts`, `seo.ts`)
- `app/utils/`, `app/types/` — utilities and types
- `scripts/` — build scripts (e.g. sitemap generation)
- `public/` — static assets

The `~/` path alias resolves to `app/` (via Vite's `resolve.tsconfigPaths`).

## Configuration

Site-wide constants (URL, brand name) live in `app/lib/constants.ts`. SEO metadata is built via `seoMeta` in `app/lib/seo.ts`.
