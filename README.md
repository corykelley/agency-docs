# Agency Docs

A Next.js app for managing feature docs, with a Postgres database and [Drizzle ORM](https://orm.drizzle.team/).

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

   Copy the example env file and add your database URL:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your Neon database and auth values:

   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/agency_docs
   NEON_AUTH_BASE_URL=https://your-auth-endpoint.neon.tech
   NEON_AUTH_COOKIE_SECRET=generated-secret-at-least-32-characters-long
   ```

   Enable Neon Auth in the Neon Console, then copy the Neon Auth URL into `NEON_AUTH_BASE_URL`.
   Generate the cookie secret with `openssl rand -base64 32`.

3. **Apply the database schema**

   Push the schema to your database (creates/updates tables):

   ```bash
   pnpm db:push
   ```

4. **Run the app**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You can browse features at `/features`, sign in at `/auth/sign-in`, sign up at `/auth/sign-up`, create one at `/features/create`, and view a single feature at `/features/[id]`.

## Database scripts (Drizzle)

| Script           | Command           | Description                                              |
|------------------|-------------------|----------------------------------------------------------|
| Generate migrations | `pnpm db:generate` | Generate SQL migration files from `src/db/schema.ts`     |
| Push schema      | `pnpm db:push`    | Push schema to the DB (no migration files; good for dev) |
| Run migrations   | `pnpm db:migrate` | Run pending migrations from `migrations/`                 |
| Drizzle Studio   | `pnpm db:studio`  | Open the Drizzle Studio UI to inspect/edit data         |

- Use **`db:push`** for quick iteration in development.
- Use **`db:generate`** then **`db:migrate`** when you want versioned migrations (e.g. for production or team workflows).

## Project structure

- `src/app/` – Next.js App Router (pages, layouts)
- `src/db/` – Drizzle schema, client, and queries
- `src/lib/auth/` – Neon Auth server and client helpers
- `migrations/` – Generated SQL migrations (when using `db:generate`)

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Neon Auth](https://neon.com/docs/neon-auth/quick-start/nextjs)
- **Styling:** Tailwind CSS
