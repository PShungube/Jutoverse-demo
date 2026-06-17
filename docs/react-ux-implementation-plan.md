# React UX Implementation Plan

## Purpose

This document defines the implementation plan for the future React-based UX of `jutoverse_demo`.

The plan assumes:

- the UX layer is built in React with TypeScript
- the visual and interaction baseline is reused from `/Users/omid/projects/react-poc`
- the future local runtime architecture is a three-tier system: `web`, `api`, and `postgres`
- local orchestration is handled with Docker Compose
- non-local DEV and PROD deployments are planned for GKE on GCP

## Planning Assumptions

### Product Assumptions

- The demo remains centered on AI-driven government service optimization use cases.
- Hebrew RTL is a first-class requirement.
- English LTR remains supported.
- The cloud/platform language remains GCP-oriented in the user experience.

### Technical Assumptions

- The web tier will be a React single-page application.
- The API tier will own domain logic, orchestration, authentication boundaries, and database access.
- PostgreSQL will be the primary relational store for structured application data.
- Docker Compose will be the default local integration environment for the full stack.
- DEV and PROD should eventually run on GKE rather than Docker Compose.
- Infrastructure prerequisites for cloud deployment should be sourced from `/Users/omid/projects/jutomate-cloud-iac`.

## Target Architecture

### Logical Three-Tier Model

1. **Web:** React + TypeScript frontend responsible for UX/UI, routing, stateful interactions, and API integration.
2. **API:** Backend service responsible for business logic, AI workflow orchestration, document-processing coordination, audit logging, and persistence boundaries.
3. **Postgres:** Relational database responsible for structured persistence, workflow state, audit history, configuration, and relational reporting inputs.

### Local Runtime Model

The future local environment should run through Docker Compose with at least these services:

- `web`
- `api`
- `postgres`

Optional future local supporting services may be added only if justified, such as:

- `pgadmin`
- `mailhog`
- `redis`
- local object-storage emulator

These are optional and should not be treated as baseline requirements.

### Future DEV and PROD Runtime Model

The future non-local deployment model should target GKE-backed environments on GCP:

- **DEV project:** `jtm-playground-dev`
- **PROD project:** `jtm-playground-prod`
- **Primary region:** `europe-west1`
- **DEV cluster:** `jtm-playground-dev-euw1`
- **PROD cluster:** `jtm-playground-prod-euw1`

Docker Compose is for local development only. It is not the target runtime model for shared DEV or PROD environments.

These values are the required deployment contract for this project.

## Deployment Evolution Strategy

### Environment Intent

- **Local:** developer-owned full stack via Docker Compose
- **DEV:** shared integration and preview environment on GKE
- **PROD:** production environment on GKE with stronger runtime controls

### Runtime Progression

1. Start with local feature development in Docker Compose.
2. Package the web and API tiers as deployable container images.
3. Push images to Artifact Registry using environment-specific image prefixes from IaC outputs.
4. Deploy the application runtime to GKE DEV for shared validation.
5. Promote the same deployment model to GKE PROD with environment-specific configuration and stricter controls.

### Deployment Ownership Model

The future application should follow the ownership model defined in `docs/repo-ownership-model.md`:

- `/Users/omid/projects/jutoverse_demo` owns application code, Dockerfiles, local Compose files, app configuration contracts, and app-level smoke checks
- `/Users/omid/projects/jutomate-cloud-iac` owns GCP prerequisites and Terraform outputs
- `/Users/omid/projects/jutomate-tools` owns Kubernetes deployment and shared platform wiring for DEV and PROD, including Traefik, cert-manager, external-secrets, ingress definitions, and shared-environment Helm/manifests

### Expected IaC-Managed Inputs

The future app deployment should consume environment outputs rather than hardcoding infrastructure values. Expected inputs include:

- GCP project ID
- region
- GKE cluster name
- Artifact Registry image prefix
- static ingress IP contract where relevant
- hostname contract where relevant
- Cloud SQL instance and database contract for API persistence
- runtime service-account or Workload Identity contract
- Secret Manager secret-container IDs for runtime secrets

### Cloud Runtime Principles

- Docker Compose should never be treated as the source of truth for shared DEV or PROD behavior.
- The web tier should remain stateless and environment-configured.
- The API tier should integrate with managed cloud services through explicit configuration, not local assumptions.
- PostgreSQL in shared DEV and PROD should align to the GCP-managed database strategy rather than a containerized production database pattern.
- Secrets must follow cloud secret-management patterns in DEV and PROD; Compose `.env` convenience must remain local-only.
- Region, cluster, image-prefix, ingress, and identity values should be consumed from IaC contracts rather than copied into application code or docs as fixed assumptions.
- Shared-environment Kubernetes manifests, ingress wiring, and platform-integrated secret references should be owned by `jutomate-tools`, not by this repo.

## React UX Goals

### Primary UX Goals

- Deliver a reusable React application shell that inherits the `react-poc` design and interaction system.
- Support modular feature development without coupling UX state to database or AI workflow internals.
- Keep the web tier fast to iterate, testable, and cleanly separable from the API tier.
- Preserve RTL/LTR behavior, accessibility, and token-based theming from the first iteration.

### UX Outcomes

- users can navigate clearly between primary work areas
- representatives can complete assisted-service workflows with minimal friction
- managers can review operational insights and recommendations with strong information hierarchy
- admin and review workflows remain auditable and easy to reason about

## Recommended Frontend Stack

### Core Stack

- `React`
- `TypeScript`
- `Vite`
- `React Router`

### Recommended Supporting Libraries

- a server-state library such as `@tanstack/react-query` for API fetching and cache lifecycle
- a lightweight client-state layer such as `zustand` or scoped React context for UI-only state
- `react-hook-form` for form management where complex input flows exist
- `zod` for frontend schema validation aligned with API contracts

These choices are recommendations, not hard requirements, but the implementation should avoid ad hoc state sprawl.

## UX Reuse Strategy From react-poc

### Mandatory Reuse Targets

- `src/styles.css`
- `src/theme/themeCatalog.ts`
- `src/theme/ThemeProvider.tsx`
- `src/i18n/`
- `src/components/common/LocaleSwitch.tsx`
- `src/components/common/RegionBadge.tsx`
- `src/components/common/FlagIcon.tsx`
- `src/assets/gcp-icons/products/svg/`

### Reuse Principles

- Port the token and theme runtime before building new screen-specific styling.
- Reuse shell, card, filter, badge, and control patterns before introducing new primitives.
- Keep the `Jutoverse` theme as the default demo presentation.
- Adapt patterns to this repo's needs instead of copying `react-poc` modules that do not match the product scope.

## Proposed UX Information Architecture

### Top-Level App Areas

The first React implementation should support a small, explicit app shell with the following top-level areas:

1. **Overview:** cross-program summary, alerts, key metrics, and entry points
2. **Service Operations:** interaction monitoring, anomaly review, inquiry taxonomy, and staffing insights
3. **Representative Assistant:** grounded knowledge lookup, live guidance, and translation support
4. **Citizen Services:** document intake, identity verification support, status tracking, and secure self-service flows
5. **Research Review:** proposal ingestion, ranking, summary review, and committee-oriented recommendation views
6. **Administration:** configuration, audit visibility, data-source status, and operational settings

### Navigation Principles

- Use one persistent shell-level navigation system.
- Keep section switching explicit and keyboard-accessible.
- Keep cross-module controls consistent in placement and behavior.
- Do not fragment navigation into unrelated local patterns.

## Proposed Screen Plan

### Phase 1 Screens

These screens establish the shell and core workflows:

1. app shell and landing dashboard
2. login or access-gate placeholder if authentication is deferred
3. overview dashboard
4. service operations dashboard
5. representative assistant workspace
6. citizen-service intake/status workspace
7. research-review queue and detail screen
8. admin/settings placeholder

### Phase 2 Screens

These screens deepen workflow maturity:

1. saved filters and views
2. audit trail detail views
3. document-processing result review
4. staffing forecast drilldowns
5. proposal comparison and decision-pack views
6. exception queues and human-escalation views

## Proposed Frontend Folder Structure

```text
src/
  app/
    providers/
    router/
    layout/
  theme/
  i18n/
  assets/
  components/
    common/
    shell/
    cards/
    forms/
    tables/
    charts/
  features/
    overview/
    service-operations/
    representative-assistant/
    citizen-services/
    research-review/
    administration/
  api/
    client/
    contracts/
    queries/
  hooks/
  lib/
  types/
  pages/
```

The structure should remain feature-oriented rather than growing into one large shared-components bucket.

## State and Data-Fetching Plan

### Client-Side State Boundaries

- Keep transient UI state in component state or feature-local stores.
- Keep server-derived state in a query/cache layer.
- Keep authentication/session state isolated from feature state.
- Do not persist large workflow state in browser storage unless there is a clear product need.

### API Interaction Rules

- The web tier should speak only to the API tier, never directly to PostgreSQL.
- All database-backed workflows should go through typed API contracts.
- Use optimistic UI only where reconciliation is well understood and reversible.
- Treat AI-generated outputs as server-owned records, not frontend-only ephemeral artifacts.

## UX-to-API Contract Planning

The frontend should be built against explicit API boundaries from the start.

### Contract Areas

- authentication and session
- user profile and role context
- operational metrics and dashboard summaries
- inquiry records and interaction analysis
- representative-assistant question/answer workflows
- document upload and extraction results
- citizen request and payment/status lookups
- proposal ingestion, scoring, summary, and committee review
- audit logs and administrative configuration

### Integration Principle

Design React feature modules around API resources and workflow boundaries, not around arbitrary pages alone.

## PostgreSQL Planning Boundaries

The future database model should support:

- users and roles
- organization and tenant context if needed
- citizen service requests and statuses
- interaction transcripts and derived classifications
- staffing forecast inputs and generated outputs
- uploaded documents and extraction metadata
- proposal records, evaluations, and recommendations
- audit logs and configuration tables

The React web tier should not encode database assumptions beyond typed API contracts.

## Phased Delivery Plan

### Phase 0: Foundation

- initialize the React/Vite/TypeScript application
- port theme, i18n, RTL/LTR, and shell primitives from `react-poc`
- define app routing, provider structure, and base folder layout
- establish linting, testing, and environment-variable conventions

### Phase 1: UX Shell and Mocked Feature Flows

- build top-level navigation and layout
- implement overview and placeholder feature screens
- connect screens to local mock contracts or fixture data
- validate accessibility, direction, and theme behavior

### Phase 2: API Contract First Integration

- define API resource contracts
- implement typed frontend API client
- replace feature mocks with API-backed read workflows
- add loading, empty, error, and retry states across modules

### Phase 3: Workflow Completion

- implement mutation flows for review, triage, uploads, comments, and settings
- add richer detail views, filtering, and audit visibility
- refine role-sensitive behavior and action permissions

### Phase 4: Local Full-Stack Integration

- introduce Docker Compose for `web`, `api`, and `postgres`
- validate local startup, service health, migrations, and seeded data
- ensure frontend uses API base URLs and does not depend on local-only hacks

### Phase 5: Hardening

- add integration tests across major workflows
- add performance and bundle review
- tighten error boundaries, observability hooks, and empty-state behavior
- document deployment assumptions for later GCP mapping

## Docker Compose Planning

### Baseline Services

- `web`: React application container
- `api`: application backend container
- `postgres`: PostgreSQL container with persistent volume

### Compose Expectations

- one command should start the full local stack
- the web tier should depend on the API tier through explicit environment configuration
- the API tier should depend on PostgreSQL readiness
- schema migration and seed strategy should be explicit
- local developer data should be disposable and reproducible
- Compose-only shortcuts must not leak into the future GKE deployment model

## GKE Deployment Planning

### DEV Target

- shared deployment target on GKE in `jtm-playground-dev`
- cluster contract expected from IaC: `jtm-playground-dev-euw1`
- app images should be published under an Artifact Registry prefix provided by Terraform outputs
- app runtime manifests should be owned in `jutomate-tools` and should consume IaC outputs rather than duplicate infra values

### PROD Target

- production deployment target on GKE in `jtm-playground-prod`
- cluster contract expected from IaC: `jtm-playground-prod-euw1`
- production configuration should remain environment-specific and promotion-safe
- production ingress, DNS, and TLS should follow platform and ownership contracts rather than ad hoc app assumptions

### Backend Runtime Considerations

Because the future stack includes a real API and PostgreSQL tier, the deployment model should assume:

- managed Postgres in cloud environments instead of containerized Postgres for PROD
- secret containers in Secret Manager rather than committed secrets or plaintext manifests
- Workload Identity or equivalent cloud-native identity for runtime access where approved
- environment-specific hostname and ingress contracts sourced from IaC outputs

## Cross-Repo Delivery Sequence

For shared DEV and PROD deployments, the expected sequence is:

1. build the application image from `jutoverse_demo`
2. publish the image using registry contracts from `jutomate-cloud-iac`
3. update Kubernetes deployment assets in `jutomate-tools`
4. deploy through the Kubernetes/platform path owned by `jutomate-tools`
5. validate the app behavior back against the application contract owned here

## UX Quality Gates

The React UX work is not done unless it preserves:

- Hebrew RTL behavior
- English LTR behavior
- keyboard accessibility
- visible focus states
- reduced-motion support
- token-driven theming
- coherent empty/loading/error states
- separation between web-tier UI concerns and API-tier business logic

## Risks and Controls

| Risk | Impact | Control |
| --- | --- | --- |
| Copying `react-poc` too literally | unnecessary UI or technical baggage | reuse patterns selectively and keep this app feature-oriented |
| Letting the web tier absorb business logic | poor API boundary and harder backend evolution | enforce typed API contracts and server-owned workflow logic |
| Overusing browser persistence | stale or conflicting workflow state | keep persistence minimal and intentional |
| Weak RTL support early | expensive layout fixes later | port logical CSS and direction handling in Phase 0 |
| Delaying full-stack integration too long | hidden contract and data issues | introduce Docker Compose integration before feature sprawl |

## Definition of Done for the Plan

The implementation plan is satisfied when:

- the React web tier is clearly defined
- reuse boundaries from `react-poc` are explicit
- the future `web/api/postgres` architecture is accounted for
- Docker Compose is treated as the local full-stack baseline
- UX work is phased in a way that can move from mock data to API-backed workflows without redesign
