# Vargr Viking

Personal project: my first website, built from scratch to learn web development. A full-stack site for my Viking tactical combat group.

Live site: [vargrviking.co.uk](https://vargrviking.co.uk)

## Stack

- **Frontend**: HTML, CSS, vanilla JavaScript — no frameworks. Hosted on GitHub Pages.
- **Backend**: Node.js, TypeScript, Express. Hosted on Render.
- **Database**: PostgreSQL. Hosted on Neon.

## Features

- Multi-page site with responsive navigation and mobile hamburger menu
- Events section — dynamically loaded from the backend API
- Contact form — submissions stored in the database
- Admin panel (`/admin.html`) — JWT-authenticated, full event CRUD, contact submission viewer

## Backend API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /events | No | List all events |
| POST | /events | Yes | Create event |
| PUT | /events/:id | Yes | Update event |
| DELETE | /events/:id | Yes | Delete event |
| POST | /contact | No | Submit contact form |
| GET | /contact | Yes | List contact submissions |
| POST | /auth/login | No | Login, returns JWT |

## Local Development

1. Install dependencies: `npm install` from the `backend` folder
2. Create `backend/.env` with `DATABASE_URL`, `PORT=3000`, and `JWT_SECRET`
3. Run migration: `npx ts-node src/migrate.ts`
4. Start server: `npm run dev`
