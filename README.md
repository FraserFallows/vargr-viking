# Vargr Viking

A full-stack site for a Viking tactical combat re-enactment group, built solo, end to end: static site generation, a REST API, a Postgres database, JWT-authenticated admin tooling, and an automated deployment pipeline.

**Live:** [vargrviking.co.uk](https://vargrviking.co.uk)

This was my first web project, built to learn the stack from scratch (my background is C#). It's a real, publicly-used site for an active group, not a tutorial project; content and event listings are managed by non-technical group organisers through the admin panel.

## Stack

| Layer | Tech |
|---|---|
| Frontend | [Eleventy](https://www.11ty.dev/) (Nunjucks templates) → static HTML/CSS/vanilla JS, no client-side framework |
| Backend | Node.js, TypeScript, Express 5 |
| Database | PostgreSQL ([Neon](https://neon.tech)) |
| Auth | JWT + bcrypt |
| Email | [Resend](https://resend.com) (contact form notifications) |
| Hosting | GitHub Pages (frontend), Render (API) |
| CI/CD | GitHub Actions: builds the Eleventy site and deploys to Pages on every push to `main` |

## Features

- Multi-page public site (home, about, combat/training info, gallery, contact) with responsive nav and mobile menu
- Static site generation via Eleventy with shared layouts and clean URLs (`/about/combat/`, `/contact/join/`, etc.)
- Events list rendered from live API data, sorted soonest-first
- Contact form: submissions persisted to Postgres and forwarded by email via Resend
- Admin panel (`/admin/`): JWT-authenticated, full CRUD on events, contact submission viewer, session persisted in `localStorage`
- Graceful handling of Render's free-tier cold starts: the admin login gives explicit "server waking up" feedback instead of silently hanging
- Automated build + deploy pipeline via GitHub Actions

## API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check (used to detect Render cold-start wake-up) |
| POST | `/auth/login` | No | Log in, returns a JWT |
| GET | `/events` | No | List all events, ordered by date |
| POST | `/events` | Yes | Create an event |
| PUT | `/events/:id` | Yes | Update an event |
| DELETE | `/events/:id` | Yes | Delete an event |
| POST | `/contact` | No | Submit the contact form (stores + emails a notification) |
| GET | `/contact` | Yes | List contact submissions |

Auth is a bearer JWT (`Authorization: Bearer <token>`), issued by `/auth/login` and checked by middleware on protected routes.

## Project structure

```
src/                  Eleventy source (pages, layouts) → built to _site/
backend/
  src/
    routes/           auth, events, contact
    middleware/       JWT auth guard
    db.ts             Postgres connection pool
    migrate.ts        schema migration script
.github/workflows/    CI/CD (build + deploy to GitHub Pages)
```

## Local development

**Frontend**
```
npm install
npx @11ty/eleventy --serve
```

**Backend**
```
cd backend
npm install
```
Create `backend/.env`:
```
DATABASE_URL=postgres://...
PORT=3000
JWT_SECRET=...
RESEND_API_KEY=...
NOTIFY_EMAIL=...
```
Then:
```
cd backend
npm run migrate   # creates tables
npm run dev       # starts the API with ts-node
```
