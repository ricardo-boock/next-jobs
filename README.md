# Next Jobs

A modern remote job board application built with Next.js, designed to demonstrate modern frontend architecture, filtering, sorting, responsive UI, and clean component design. The application allows users to browse remote job listings, filter and sort them, and save favorite jobs locally in the browser.

## Live Demo

Deployed on [Vercel](https://next-jobs-cyan.vercel.app/).

<p align="center">
<img src="./screenshots/homepage_desktop.png" height="300" />
<img src="./screenshots/homepage_mobile.png" height="300" />
</p>

## Features

- Browse remote job listings
- Search jobs by keywords
- Filter by category and company
- Sort jobs (newest, oldest, title)
- Save favorite jobs (localStorage)
- Responsive UI (desktop + mobile)
- Accessible UI components

## Tech Stack

### Framework
- Next.js (App Router)

### Language
- TypeScript

### UI
- React
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### State / Data
- React Hooks
- Browser localStorage

### APIs
- Remotive Jobs API

### Tooling
- ESLint
- Prettier
- TypeScript

### Deployment
- Vercel

---

## 🛠 DevOps / CI/CD

This project also demonstrates modern **CI/CD and containerization workflows**:

### Continuous Integration (CI)
- GitHub Actions workflow automatically:
  - installs dependencies
  - builds the application
  - builds a Docker production image
- Runs on:
  - pushes to branches
  - pull requests

### Continuous Deployment (CD)
- Docker image is automatically published to **GitHub Container Registry (GHCR)**
- Only the `main` branch triggers production image publishing
- Uses secure GitHub Actions secrets for environment variables

### Docker / Containerization
- Multi-stage Dockerfile:
  - `dev` stage for development
  - `builder` stage for optimized build
  - `runner` stage for lightweight production image
- Uses Next.js **standalone output** for minimal production footprint
- Environment variables handled for both:
  - build-time
  - runtime

### Image Distribution
- Images are versioned and tagged automatically:
  - `latest` (main branch)
  - branch / commit tags
- Publicly available via GHCR

### Why this matters
This setup reflects real-world practices:
- reproducible builds
- automated deployments
- separation of dev and prod environments
- secure handling of secrets

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ricardo-boock/next-jobs.git
```

### 2. Navigate into the project

```bash
cd next-jobs
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Data Source

[https://remotive.com/api/remote-jobs](https://remotive.com/api/remote-jobs)

All job listing data originates from this external API.

---

## Favorites System

Favorites are stored locally in the browser using `localStorage` (only job IDs).

---

## Deployment

GitHub → GitHub Actions (CI/CD) → Docker (GHCR) → Vercel

---

## Legal Notice

Includes:
- Impressum
- Privacy Policy

---

## License

© 2026 Ricardo Boock  
All rights reserved.

---

## Author

Ricardo Boock  
[https://github.com/ricardo-boock](https://github.com/ricardo-boock)

---

## Portfolio Highlights

- Next.js App Router
- Component architecture
- React hooks
- Filtering and sorting logic
- Responsive UI design
- TypeScript
- CI/CD with GitHub Actions
- Docker & containerization
