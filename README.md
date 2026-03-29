# Personal Portfolio

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

Personal CV/portfolio site built with React, TypeScript, and Vite. Content is loaded from a local static JSON file. Deployed via Docker + Nginx with a self-hosted GitHub Actions runner.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS, shadcn/ui (Radix UI) |
| Routing | Wouter |
| Content | Static JSON (`client/statics/content.json`) |
| Container | Docker multi-stage → Nginx |
| CI/CD | GitHub Actions (self-hosted runner) |
| Tunnel | ngrok |

---

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/       # UI components (shadcn/ui + custom)
│   │   ├── pages/            # Home, NotFound
│   │   ├── lib/
│   │   │   ├── api.ts        # getCV() — reads local JSON
│   │   │   └── types.ts      # CV type definitions
│   │   └── App.tsx
│   └── statics/
│       └── content.json      # CV data (edit here to update content)
├── Dockerfile                # Multi-stage: pnpm build → Nginx
├── docker-compose.yaml       # App + ngrok services
├── vite.config.ts
└── .github/
    └── workflows/
        └── deploy.yaml       # CI/CD pipeline
```

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)

### Local Development

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:5173` by default.

### Production Build

```bash
pnpm build
```

Output goes to `dist/`.

### Docker

```bash
docker compose up --build
```

Serves the app on port `8090` via Nginx.

---

## Updating Content

All CV data lives in [`client/statics/content.json`](client/statics/content.json). Edit that file and redeploy — no backend or API keys required.

```json
{
  "name": "...",
  "title": ["..."],
  "about": "...",
  "contact": { "email": "", "linkedin": "", "github": "" },
  "experience": ["..."],
  "education": [
    { "name": "...", "badge": true, "loader": "<credly-badge-id>" }
  ],
  "skills": ["..."]
}
```

For education entries with a Credly badge, set `"badge": true` and put the badge UUID in `"loader"`.

---

## CI/CD

On every push to `main`, the workflow in [`.github/workflows/deploy.yaml`](.github/workflows/deploy.yaml):

1. Checks out the code on a **self-hosted runner**
2. Builds the Vite app
3. Builds a Docker image tagged with the current timestamp
4. Replaces the running `procv-nginx` container in the `majula` Docker network

---

## License

MIT
