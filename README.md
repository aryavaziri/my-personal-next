# Arya Vaziri Personal Website

Modern personal website and project portfolio built with Next.js, TypeScript, Tailwind CSS, Node/Express, GraphQL, MongoDB, Docker, and NGINX.

## Highlights

- Personal landing page, about page, contact page, and selected project pages
- Next.js App Router frontend with TypeScript React components and Tailwind styling
- Express/Apollo backend with MongoDB/Mongoose data models
- Authentication, profile, address, order, payment, and admin UI experiments
- Project pages for a to-do list app, shop, charts, p5.js sketches, and browser games
- Docker Compose and NGINX configuration for development and deployment

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express
- GraphQL / Apollo
- MongoDB / Mongoose
- Docker
- NGINX

## Running Locally

Development mode:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Production-style mode:

```bash
docker compose -f docker-compose.yml up --build
```

The repository includes separate frontend, backend, NGINX, and deployment configuration folders.
