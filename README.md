# EU Canteen

Next.js canteen app with Postgres, Drizzle, and Docker.

[Figma working file](https://www.figma.com/design/959XeBxti4P0azOmJPiE2l/POS?node-id=180-51&t=QrxwCL7Vu3pArpFM-1)

## Getting started

Install dependencies, start Postgres, apply the schema, then run the dev server:

```bash
pnpm install
cp .env.example .env
pnpm db:up
pnpm db:push
pnpm db:seed
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

`pnpm db:down` stops Postgres and keeps its data volume.

## Docker

Run the app and Postgres together:

```bash
pnpm docker:up
```

`pnpm docker:down` stops the stack and keeps the database volume. `pnpm docker:logs` follows container logs.

`pnpm docker:up` builds the app, waits for Postgres, and applies the Drizzle schema before the app starts.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Next.js dev server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm db:up` / `pnpm db:down` | Start or stop Postgres |
| `pnpm db:push` | Apply the Drizzle schema |
| `pnpm db:seed` | Load sample data |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm docker:up` / `pnpm docker:down` | Start or stop the full stack |

## Environment

Copy `.env.example` to `.env`. Docker Compose reads `POSTGRES_*` from that file. On the host, `DATABASE_URL` uses `localhost`. Inside Compose, the app uses the `db` hostname instead.

```bash
POSTGRES_USER=canteen
POSTGRES_PASSWORD=canteen
POSTGRES_DB=canteen
POSTGRES_PORT=5432
APP_PORT=3000

DATABASE_URL=postgresql://canteen:canteen@localhost:5432/canteen

AUTH_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SENDGRID_API_KEY=
CRON_SECRET=
```
