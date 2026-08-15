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

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the dev server                             |
| `npm run build`     | Prerender the site to `build/client` (runs sitemap generation first) |
| `npm run typecheck` | Type-check with `tsc -b`                         |
| `npm run lint`      | Lint with [oxlint](https://oxc.rs/)              |
| `npm run preview`   | Build and preview the production output          |

## Structure

- `app/` — React Router entry (`root.tsx`, `routes.ts`)
- `src/pages/` — route modules (Home, product listing/detail, blog, contact, legal, etc.)
- `src/components/` — UI and layout components
- `src/data/` — products, blog posts, and references content
- `src/i18n/` — translation resources and setup
- `src/utils/`, `src/types/` — shared helpers and types
- `scripts/` — build scripts (e.g. sitemap generation)
- `public/` — static assets

## Configuration

Site-wide constants (URL, brand name) live in `src/constants.ts`. SEO metadata is built via `seoMeta` in `src/seo.ts`.
