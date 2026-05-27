# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production (also runs next-sitemap postbuild)
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
pnpm test:int         # Run integration tests (vitest)
pnpm test:e2e         # Run E2E tests (Playwright)
pnpm generate:types   # Regenerate Payload TypeScript types from collection/global configs
pnpm generate:importmap  # Regenerate Payload admin import map
pnpm payload migrate  # Run pending database migrations
```

Running a single integration test file:
```bash
pnpm exec vitest run tests/int/api.int.spec.ts
```

## Environment Variables

Copy `.env.example` to `.env`. Required vars:
- `DATABASE_URI` — PostgreSQL connection string
- `PAYLOAD_SECRET` — Secret for Payload CMS session signing
- `NEXT_PUBLIC_SERVER_URL` — Public URL (default: `http://localhost:3000`)
- `CRON_SECRET` — Bearer token for the jobs endpoint
- `PREVIEW_SECRET` — Secret for draft preview mode

S3 storage variables (`S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ACCESS_TOKEN`) are defined but the S3 plugin is currently commented out in `src/plugins/index.ts`.

## Architecture

This is a **Payload CMS v3 + Next.js 15** monolith — both the CMS admin and the frontend run in the same Next.js app.

### Route groups

- `src/app/(payload)/` — Payload admin UI (`/admin`) and REST/GraphQL API (`/api`)
- `src/app/(frontend)/[locale]/` — Public-facing site, all routes scoped under a locale segment

The locale prefix uses `as-needed` mode: Ukrainian (`uk`) is the default locale and gets no prefix, English (`en`) routes get `/en/` prefix.

### Payload layer (`src/`)

**Collections** (`src/collections/`): `Pages`, `Posts`, `Media`, `Categories`, `Users`, `Games`

**Globals**: `Header`, `Footer` — configured in `src/Header/config.ts` and `src/Footer/config.ts`

**Plugins** (`src/plugins/index.ts`): redirects, nested-docs (categories), SEO, form-builder, search (posts only), payload-cloud

All content collections (`Pages`, `Posts`, `Games`) support **draft/version mode** with autosave and scheduled publishing. After-change hooks fire `revalidatePath` for ISR — note that `Games` revalidation is currently commented out.

**Types**: Run `pnpm generate:types` after any collection/global schema change. The output file is `src/payload-types.ts`.

### Frontend layer

Pages are rendered as Next.js RSC. The pattern for content pages is:
- **page.tsx** — server component, fetches data from Payload and renders
- **page.client.tsx** — client component for interactive parts (live preview, search, etc.)

**Page builder**: `Pages` use a `layout` blocks field. Available blocks are registered in `src/blocks/RenderBlocks.tsx`: `archive`, `content`, `cta`, `formBlock`, `gamesBlock`, `mediaBlock`. Each block has a `config.ts` (Payload schema) and `Component.tsx` (React renderer).

**Heroes**: Defined in `src/heros/config.ts` as a `hero` group field. Types: `none`, `lowImpact`, `highImpact`, `mediumImpact`.

**i18n**: Handled by `next-intl`. Routing config in `src/i18n/routing.ts`, middleware in `src/middleware.ts`. Payload localization mirrors the same locales (`uk` default, `en` fallback disabled).

### Testing

- **Integration tests** (`tests/int/`) use vitest + jsdom and instantiate Payload directly via `getPayload()`. They need a real database connection from `.env`.
- **E2E tests** (`tests/e2e/`) use Playwright against a running dev server (`pnpm dev` on port 3000).
