# Personal Portfolio

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)

Personal CV/portfolio site built with React, TypeScript, and Vite. Content is loaded from a local static JSON file. Deployed to [GitHub Pages](https://dsalazarcazanhas.github.io/PersonalPortfolio/) via GitHub Actions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS, shadcn/ui (Radix UI) |
| Routing | Wouter |
| Content | Static JSON (`client/statics/content.json`) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

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
├── vite.config.ts
└── .github/
    └── workflows/
        └── deploy.yml         # CI/CD pipeline (build + deploy to GitHub Pages)
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

---

## Updating Content

All CV data lives in [`client/statics/content.json`](client/statics/content.json). Edit that file and redeploy — no backend or API keys required.

```json
{
  "name": "...",
  "title": ["..."],
  "about": "...",
  "contact": { "email": "", "linkedin": "", "github": "" },
  "experience": [
    {
      "role": "...",
      "organization": "...",
      "start": "2021",
      "end": "2024",
      "description": "..."
    }
  ],
  "projects": [
    {
      "name": "...",
      "description": "...",
      "stack": ["...", "..."],
      "url": "https://github.com/..."
    }
  ],
  "education": [
    { "name": "...", "badge": true, "loader": "<credly-badge-id>" }
  ],
  "skills": [
    { "category": "...", "items": ["...", "..."] }
  ]
}
```

For education entries with a Credly badge, set `"badge": true` and put the badge UUID in `"loader"`.

`experience` entries render as a timeline, ordered as listed in the file (most recent first). Use `"end": "Present"` for an ongoing role. `projects` render as cards linking out to `url`. `skills` are grouped by `category` and rendered as a matrix of panels.

---

## CI/CD

On every push to `main`, the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Checks out the code on a GitHub-hosted runner
2. Installs dependencies with pnpm and builds the Vite app
3. Uploads `dist/` as a Pages artifact and deploys it to [GitHub Pages](https://dsalazarcazanhas.github.io/PersonalPortfolio/)
