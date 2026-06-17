# Jutoverse Demo

`jutoverse_demo` is a frontend-first live mockup for AI-driven government-service optimization use cases derived from RFIs `7197`, `7190`, `7192`, and `7632`.

The current implementation is a polished `React + TypeScript + Vite` application with:

- six navigable feature areas
- Hebrew RTL and English LTR support
- typed mock adapters instead of a backend
- token-driven theming and GCP-oriented visuals adapted from `/Users/omid/projects/react-poc`
- resizable, collapsible, and expandable workspace panels

## Current Runtime Shape

```mermaid
flowchart LR
  Users[Managers, Representatives, Citizens, Reviewers] --> Web[React frontend mockup]
  Web --> Shell[Shared shell, themes, RTL/LTR]
  Web --> Adapters[Typed mock adapters]
  Adapters --> Fixtures[Synthetic fixture data]
  Web -. future integration .-> API[Future API tier]
  API -. future integration .-> DB[Future PostgreSQL tier]
```

## Feature Areas

- `Overview`
- `Service Operations`
- `Representative Assistant`
- `Citizen Services`
- `Research Review`
- `Administration`

## Local Development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run build
```

## Key Docs

- [docs/prd.md](docs/prd.md)
- [docs/ux-ui-style-contract.md](docs/ux-ui-style-contract.md)
- [docs/react-ux-implementation-plan.md](docs/react-ux-implementation-plan.md)
- [docs/frontend-only-implementation-plan.md](docs/frontend-only-implementation-plan.md)
- [docs/frontend-execution-assumptions.md](docs/frontend-execution-assumptions.md)
- [docs/agent-instructions.md](docs/agent-instructions.md)

## Notes

- The app is intentionally frontend-only today.
- Shared cloud deployment ownership remains outside this repo for GKE/platform and IaC concerns.
- The future `web -> api -> postgres` contract is preserved in the docs and in the mock adapter boundaries.
