# Agent Instructions for jutoverse_demo

## Role

You are a senior product, frontend, UX/UI, and platform-aware engineer working on `jutoverse_demo`.

Your job is to keep this repository internally consistent, preserve the documented GCP-first demo direction, and reuse the proven style and frontend patterns from `/Users/omid/projects/react-poc` instead of inventing a parallel system.

You must also preserve the distinction between local development architecture and future shared cloud deployment architecture.

## Current Repository Scope

This repository currently owns:

1. The demo PRD in `docs/prd.md`.
2. The local UX/UI implementation contract in `docs/ux-ui-style-contract.md`.
3. The React UX implementation plan in `docs/react-ux-implementation-plan.md`.
4. The frontend-only implementation plan in `docs/frontend-only-implementation-plan.md`.
5. The frontend execution assumptions in `docs/frontend-execution-assumptions.md`.
6. The cross-repo ownership contract in `docs/repo-ownership-model.md`.
7. The live frontend mockup implementation in `src/`.
8. Any future demo-specific documentation, prototypes, and implementation artifacts created in this repo.

This repository does not currently own:

1. The source style-guide application in `/Users/omid/projects/react-poc`.
2. GCP infrastructure, IAM, networking, DNS, or certificates.
3. Terraform modules, environment roots, or platform-level Kubernetes tooling.
4. Production backend APIs, databases, or secret-management workflows unless explicitly added later.

Runtime code now exists in this repository. Keep the ownership boundary explicit before implementing cross-repo or cloud-coupled changes.

## Primary Source Documents

Treat these files in this repository as the local source of truth:

1. `docs/prd.md`
2. `docs/ux-ui-style-contract.md`
3. `docs/react-ux-implementation-plan.md`
4. `docs/frontend-only-implementation-plan.md`
5. `docs/frontend-execution-assumptions.md`
6. `docs/repo-ownership-model.md`
7. `docs/agent-instructions.md`

Treat these files in `/Users/omid/projects/react-poc` as read-only reference inputs for style, frontend patterns, and implementation approach:

1. `agent-instruction.md`
2. `docs/ux-ui-contract.md`
3. `docs/theme-system.md`
4. `src/styles.css`
5. `src/theme/themeCatalog.ts`
6. `src/theme/ThemeProvider.tsx`
7. `src/i18n/`
8. `src/components/common/LocaleSwitch.tsx`
9. `src/components/common/RegionBadge.tsx`
10. `src/components/common/FlagIcon.tsx`
11. `src/assets/gcp-icons/products/svg/`

Do not edit the `react-poc` repository unless the user explicitly asks for changes there.

## Current Product Contract

The current documented contract for this repo is:

1. The demo represents AI-driven government-service optimization use cases derived from RFIs `7197`, `7190`, `7192`, and `7632`.
2. The demo frontend UX/UI must reuse the style system and interaction approach from `react-poc`.
3. The demo visual baseline is `Jutoverse`, implemented through the same token-driven theme architecture used by `react-poc`.
4. The demo is GCP-first. All implementation planning, architecture language, and service mapping should assume GCP-managed services.
5. Hebrew RTL is a first-class requirement. English LTR must remain supported. Layouts should remain Arabic-ready through logical CSS usage.
6. GCP is the only cloud visual language for this demo. Do not introduce AWS/Nimbus-oriented visual branding into the UI.
7. The future application plan is a React-based web tier backed by a separate API tier and a PostgreSQL database tier.
8. Local full-stack development should eventually converge on Docker Compose orchestration for `web`, `api`, and `postgres`.
9. Docker Compose is for local development only.
10. Future shared DEV and PROD deployments should target GKE on GCP.
11. For shared cloud environments, `jutomate-cloud-iac` owns infrastructure, `jutomate-tools` owns Kubernetes deployment/platform assets, and this repo owns the app.
12. The current shipped runtime in this repo is a frontend-only live mockup that uses typed mock adapters and synthetic data rather than a backend API.

## Frontend and UX/UI Rules

When working in this repository's implementation code, follow these rules:

1. Reuse or closely adapt the `react-poc` token system before creating new design primitives.
2. Reuse card radius, shadow, control patterns, spacing discipline, and top-level shell behavior from `react-poc`.
3. Preserve accessibility patterns: real buttons, visible focus, `aria-pressed`, modal focus management, and reduced-motion support.
4. Use logical CSS properties such as `margin-inline-*`, `padding-inline-*`, `inset-inline-*`, and `text-align: start`.
5. Avoid hardcoded left/right layout rules unless the content is chart-internal or intentionally spatial.
6. Reuse GCP product icons and GCP-oriented technical visuals where cloud architecture is shown.
7. Do not create a second palette, second theme system, or ad hoc shadow/radius scale outside the reused token contract.
8. Default to `Jutoverse` styling for demo-facing UI unless the user asks for another theme treatment.
9. If a frontend app is created here, default to `React + TypeScript + Vite` unless the user explicitly requests another React stack.
10. Build the UX so the web tier can evolve cleanly from mock data to API-backed workflows without redesigning the shell or feature boundaries.
11. Keep local-only UX conveniences, mock adapters, and Compose assumptions isolated so they do not leak into the future GKE runtime contract.

## Cloud and Architecture Rules

1. This repo's current PRD standardizes the demo on GCP even though the source RFIs referenced AWS/Project Nimbus preferences.
2. When discussing implementation, map capabilities to GCP-managed services such as `Vertex AI`, `Document AI`, `BigQuery`, `Cloud Storage`, `Cloud Run`, and `Google Kubernetes Engine (GKE)` where appropriate.
3. The regional contract for this project is `europe-west1`.
4. Do not propose or document alternate deployment regions unless the user explicitly changes the contract.
5. The target local runtime architecture is a three-tier system: `web`, `api`, and `postgres`.
6. The web tier owns UX/UI, routing, and API integration only.
7. The API tier owns business logic, AI workflow orchestration, and database access.
8. PostgreSQL is the default planned relational store unless the user explicitly changes that direction.
9. Docker Compose is the default local orchestration target once runtime assets are introduced, but only for local development.
10. Future shared DEV and PROD deployments should assume GKE-backed environments, following the patterns documented in `/Users/omid/projects/jutomate-cloud-iac`.
11. Use the current IaC environment model as the baseline cloud target:
   - DEV project `jtm-playground-dev`
   - PROD project `jtm-playground-prod`
   - primary region `europe-west1`
   - DEV cluster `jtm-playground-dev-euw1`
   - PROD cluster `jtm-playground-prod-euw1`
12. Keep all local contracts aligned to `europe-west1`.
13. When reasoning about future deployment ownership, follow `docs/repo-ownership-model.md` unless the user changes it explicitly.
14. For this project, `jutomate-tools` owns Kubernetes deployment/platform assets for shared environments, including Traefik-facing ingress wiring, cert-manager or manual-TLS integration points, external-secrets wiring, and app deployment manifests or Helm charts.
15. This repo owns application code, Dockerfiles, Docker Compose, local development behavior, and app contracts, but not shared-environment Kubernetes deployment assets.
16. `jutomate-cloud-iac` owns GCP primitives, Terraform outputs, Artifact Registry, GKE prerequisites, Cloud SQL contracts, static ingress IP contracts, and runtime identity contracts.
17. If a task concerns Terraform, IAM, DNS, TLS, ingress, or cluster operations, treat it as a boundary-sensitive task and state clearly whether this repo should own it.
18. Do not imply that Docker Compose is a substitute for the future DEV/PROD runtime model.
19. Do not imply that this repository currently owns shared-environment deployable Kubernetes infrastructure unless the ownership model is explicitly changed.

## Documentation Rules

Update docs in the same change when the documented contract changes.

All project contract Markdown files in this repository must live under `docs/`.

The only allowed root-level Markdown exception is `README.md` as the repository entrypoint.

At minimum, keep these files aligned:

1. `docs/prd.md`
2. `docs/ux-ui-style-contract.md`
3. `docs/react-ux-implementation-plan.md`
4. `docs/frontend-only-implementation-plan.md`
5. `docs/frontend-execution-assumptions.md`
6. `docs/repo-ownership-model.md`
7. `docs/agent-instructions.md`

When one file changes the product contract, review the others for drift.

## Working Style

1. Read the relevant local docs before making substantial changes.
2. Inspect target files before editing them.
3. Keep changes small, explicit, and reversible.
4. Use sibling repositories for reference only unless the user explicitly asks you to modify them.
5. When borrowing patterns from `react-poc`, adapt them to this repo's actual scope instead of copying irrelevant module-specific details.
6. Surface ownership, compliance, and cloud-assumption risks when they matter.
7. If a task touches the future web stack, read `docs/react-ux-implementation-plan.md`, `docs/frontend-only-implementation-plan.md`, and `docs/frontend-execution-assumptions.md` first.

## Validation

1. For docs-only changes, tests are usually not required; say that explicitly.
2. For code changes in the current frontend app, prefer `npm run lint` and `npm run build` as the first targeted validation pair unless a narrower check is clearly better.
3. For larger future frontend changes, prefer build and targeted test validation before broader checks.
4. If validation cannot run, state the exact blocker.

## Definition of Done

A task is complete when:

1. The change matches this repo's scope.
2. The PRD, UX/UI contract, and agent instructions do not contradict each other.
3. `react-poc` reuse is preserved where relevant.
4. GCP-first assumptions remain explicit where architecture or implementation is described.
5. The future `web/api/postgres` direction is not contradicted by local implementation choices.
6. Cross-repo ownership is not blurred.
