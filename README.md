<p align="center">
  <img src="apps/web/public/logo/logo-dark.svg" alt="Sunnova Medical Supplies" width="360"/>
</p>

<p align="center">
  Miami-Dade's local medical supply company — same-day delivery, real people, clinic-grade products.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs" alt="Next.js 15"/>
  <img src="https://img.shields.io/badge/NestJS-10-e0234e?logo=nestjs" alt="NestJS 10"/>
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Prisma-5-2d3748?logo=prisma" alt="Prisma"/>
  <img src="https://img.shields.io/badge/pnpm-workspaces-f69220?logo=pnpm" alt="pnpm workspaces"/>
</p>

---

## Overview

Full-stack e-commerce platform for **Sunnova Medical Supplies**, a Miami-Dade local medical supply company serving med spas, aesthetic clinics, dermatology offices, and private practices.

| Layer | Stack |
|---|---|
| Frontend | Next.js 15 · React 19 · TypeScript · Bootstrap 5 · Poppins + Hanken Grotesk |
| Backend | NestJS 10 · Passport JWT · class-validator |
| Database | PostgreSQL 16 · Prisma ORM |
| Cache | Redis 7 |
| Storage | DigitalOcean Spaces (S3-compatible) |
| Payments | Stripe (abstraction layer) |
| Email | Resend / Nodemailer |
| Infra | Docker Compose · DigitalOcean VPS · Nginx |

---

## Monorepo Structure

```
sunnova-medical-supplies/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   └── api/          # NestJS REST API
├── packages/
│   ├── db/           # Prisma schema, migrations, seed
│   └── shared/       # Shared TypeScript types and constants
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9 — `npm install -g pnpm`
- Docker Desktop (for PostgreSQL and Redis)

### 1. Clone and install

```bash
git clone https://github.com/development-astra/sunnova-medical-supplies.git
cd sunnova-medical-supplies
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your values. The defaults work for local Docker development without any changes.

### 3. Start infrastructure

```bash
docker-compose up -d
```

This starts PostgreSQL on `localhost:5432` and Redis on `localhost:6379`.

### 4. Set up the database

```bash
pnpm db:migrate   # run Prisma migrations
pnpm db:seed      # seed categories, products, and admin user
```

Default admin credentials (set in `.env`):
- **Email:** `admin@sunnovamedical.com`
- **Password:** `SunnovaAdmin2026!`

### 5. Start development servers

```bash
pnpm dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:4000/api/v1 |
| Swagger docs | http://localhost:4000/api/docs |
| Prisma Studio | `pnpm db:studio` → http://localhost:5555 |

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, why Sunnova, how it works, local delivery, testimonials |
| `/shop` | Full product catalog with category tables |
| `/why-sunnova` | About the company and value proposition |
| `/how-it-works` | Ordering process + FAQ |
| `/contact` | Contact form and delivery area |
| `/request-quote` | Quote request form |
| `/open-account` | Business account application |
| `/track-order` | Order status lookup |
| `/cart` | Shopping cart |
| `/sign-in` | Customer login |
| `/register` | New customer registration |
| `/forgot-password` | Password reset request |
| `/reset-password` | Password reset confirmation |

---

## API Modules

| Module | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`, `GET /auth/me` |
| Users | `GET/PATCH /users/me`, addresses CRUD |
| Products | `GET /products`, `/products/:slug` |
| Categories | `GET /categories`, `/categories/:slug` |
| Cart | `GET/DELETE /cart`, items CRUD |
| Orders | `GET /orders`, `/orders/:id` |
| Quotes | `POST /quotes`, `GET /quotes/mine` |
| Search | `GET /search?q=` |
| Payments | `POST /payments/create-intent`, `/payments/webhook` |
| Files | `POST /files/upload` (admin) |
| Admin | `/admin/products`, `/admin/orders`, `/admin/quotes`, `/admin/users` |
| Health | `GET /health` |

Full interactive docs at `/api/docs` (Swagger UI).

---

## Database Schema

Core models: `User` · `Address` · `Category` · `Product` · `ProductVariant` · `ProductImage` · `Cart` · `CartItem` · `Order` · `OrderItem` · `Quote`

```bash
pnpm db:studio    # open Prisma Studio
pnpm db:migrate   # create and apply a new migration
pnpm db:generate  # regenerate Prisma client after schema changes
```

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in watch mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Lint all workspaces |
| `pnpm format` | Prettier format everything |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed database with categories, products, admin |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:generate` | Regenerate Prisma client |

---

## Environment Variables

See [`.env.example`](.env.example) for the full list. Key variables:

```env
DATABASE_URL          # PostgreSQL connection string
REDIS_URL             # Redis connection string
JWT_ACCESS_SECRET     # Min 32 characters
JWT_REFRESH_SECRET    # Min 32 characters
DIGITALOCEAN_SPACES_* # For file/image storage
STRIPE_SECRET_KEY     # Payment processing
RESEND_API_KEY        # Transactional email
ADMIN_SEED_EMAIL      # Initial admin account
ADMIN_SEED_PASSWORD   # Initial admin password
```

---

## Logo Assets

Place logo files in `apps/web/public/logo/`:

| File | Usage |
|---|---|
| `logo-dark.svg` | Header, auth pages (light backgrounds) |
| `logo-white.svg` | Footer (dark background) |

---

## Deployment

The app is designed for a **DigitalOcean VPS** with Docker Compose and Nginx.

```bash
# Production build
pnpm build

# Run migrations on the production database
pnpm db:migrate:deploy
```

Set `COOKIE_SECURE=true` and `NODE_ENV=production` in your production `.env`.

---

## License

Private — Sunnova Medical Supplies. All rights reserved.
