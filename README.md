# Agency Docs

A Next.js app for managing feature docs per website, with Postgres ([Drizzle ORM](https://orm.drizzle.team/)) and [Neon Auth](https://neon.com/docs/neon-auth/quick-start/nextjs).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (or npm / yarn)
- A PostgreSQL database (local or [Neon](https://neon.tech))

## Quick start

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd agency-docs
   pnpm install
   ```

2. **Set up environment**

   Copy the example env file and add your values:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
   NEON_AUTH_BASE_URL=https://your-auth-endpoint.neon.tech
   NEON_AUTH_COOKIE_SECRET=<generate with: openssl rand -base64 32>
   ```

   - **DATABASE_URL:** From Neon (or your Postgres provider). Use the pooler URL if needed.
   - **NEON_AUTH_BASE_URL:** From Neon Console → your project → Auth. Enable Auth and copy the URL.
   - **NEON_AUTH_COOKIE_SECRET:** At least 32 characters; e.g. `openssl rand -base64 32`.

3. **Apply the database schema**

   Run migrations (creates tables including `websites_table`, `website_members_table`, `features_table`):

   ```bash
   pnpm db:migrate
   ```

   For quick dev iteration without migration files you can use `pnpm db:push` instead (see Database scripts below).

4. **Run the app**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Main routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/auth/sign-in`, `/auth/sign-up` | Sign in / sign up (Neon Auth) |
| `/dashboard` | Your sites (requires sign-in). Create new sites and see sites you own or are a member of. |
| `/sites/[slug]` | A single website: name, URL, and its features. Link to add a feature. |
| `/sites/[slug]/features/create` | Create a feature for that website (protected). |

Features are scoped to a website; create them from a site’s page so the site is chosen automatically.

## Database scripts (Drizzle)

| Script | Command | Description |
|--------|---------|-------------|
| Generate migrations | `pnpm db:generate` | Generate SQL from `src/db/schema.ts` |
| Run migrations | `pnpm db:migrate` | Apply pending migrations in `migrations/` |
| Push schema | `pnpm db:push` | Sync schema to DB without migration files (dev) |
| Drizzle Studio | `pnpm db:studio` | Open Drizzle Studio UI |

- Use **`db:migrate`** when you have migrations (e.g. production or team workflows).
- Use **`db:push`** for quick local dev when you don’t need versioned migrations.

## Project structure

- `src/app/` – Next.js App Router (pages, layouts, API routes)
- `src/components/` – UI (NavBar, AuthProvider, FeatureForm, ui/)
- `src/db/` – Drizzle schema, client, and queries (websites, features, members)
- `src/lib/auth/` – Neon Auth server and client
- `migrations/` – SQL migrations (when using `db:generate` / `db:migrate`)

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Neon Auth](https://neon.com/docs/neon-auth/quick-start/nextjs) (Better Auth)
- **UI:** Tailwind CSS, shadcn-style components
