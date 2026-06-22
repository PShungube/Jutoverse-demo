# Repository Ownership Model

## Purpose

This document defines the intended ownership split for `jutoverse_demo` across the three adjacent repositories involved in delivery:

- `/Users/omid/projects/jutomate-cloud-iac`
- `/Users/omid/projects/jutomate-tools`
- `/Users/omid/projects/jutoverse_demo`

It exists to avoid blurred responsibility between infrastructure, Kubernetes deployment, and application code.

## Summary

The intended split for this project is:

- **`jutomate-cloud-iac`** owns GCP infrastructure and Terraform outputs
- **`jutomate-tools`** owns Kubernetes platform and shared-environment deployment assets
- **`jutoverse_demo`** owns the application code, local development stack, and app-level contracts

## Ownership Matrix

| Concern | Primary Owner | Notes |
| --- | --- | --- |
| GCP projects, networks, firewall policy, GKE clusters, Artifact Registry, Cloud SQL, static ingress IPs, runtime identity contracts, Terraform outputs | `/Users/omid/projects/jutomate-cloud-iac` | Infrastructure source of truth |
| Traefik, cert-manager, external-secrets, ClusterSecretStore, Kubernetes preflight, ingress inventory, platform guardrails, Helm deployment layer for shared environments | `/Users/omid/projects/jutomate-tools` | Kubernetes/platform source of truth |
| React web app, API code, local Docker Compose stack, Dockerfiles, application docs, app contracts, local tests, app image contents | `/Users/omid/projects/jutoverse_demo` | Application source of truth |

## Detailed Split

### `/Users/omid/projects/jutomate-cloud-iac`

This repo owns cloud and infrastructure concerns, including:

- GCP project and environment roots
- GKE cluster provisioning
- Artifact Registry repositories
- Cloud SQL instances and database infrastructure contracts
- Workload Identity and runtime service-account prerequisites
- static ingress IP contracts
- network and firewall rules
- Terraform outputs consumed by downstream repos

This repo does not own:

- application source code
- app-level Helm charts or Kubernetes manifests
- DNS-01 TXT updates in external DNS UIs
- Kubernetes TLS secret payloads committed in app repos

### `/Users/omid/projects/jutomate-tools`

This repo owns the Kubernetes and platform deployment layer for shared environments, including:

- Traefik
- cert-manager
- external-secrets
- ClusterSecretStore and related platform dependencies
- Kubernetes preflight and platform validation
- Helm charts, manifests, and values for shared-environment deployment paths
- ingress inventory and shared routing conventions
- platform handoff and runbook documentation

For this project, `jutomate-tools` should be treated as the owner of Kubernetes deployment assets for DEV and PROD.

This means `jutomate-tools` should own, for shared environments:

- app Helm chart or app deployment manifests
- Ingress or IngressRoute definitions
- references to TLS secrets and ingress classes
- external-secret references and platform-facing runtime wiring

### `/Users/omid/projects/jutoverse_demo`

This repo owns the application itself, including:

- React web code
- API code
- local Docker Compose stack
- Dockerfiles and image build context
- application configuration contracts
- application-level tests and smoke logic
- PRD, UX/UI contract, and implementation planning docs

This repo does not own, for shared DEV and PROD:

- GKE cluster provisioning
- shared Traefik configuration
- cert-manager installation or controller ownership
- external-secrets controller ownership
- shared-environment Helm release wiring if that wiring is standardized in `jutomate-tools`

## Environment Split

### Local Development

`jutoverse_demo` owns local development execution:

- Docker Compose
- local environment variables
- local PostgreSQL container
- local API and web runtime wiring

### Shared DEV and PROD

Shared cloud environments should follow this path:

1. `jutomate-cloud-iac` provides infrastructure prerequisites and outputs
2. `jutomate-tools` provides Kubernetes deployment and platform wiring
3. `jutoverse_demo` provides the application image and application-level runtime contract

## Deployment Contract

### Expected Flow

1. Application code is built from `jutoverse_demo`
2. Container images are published using infrastructure-provided registry contracts
3. `jutomate-tools` consumes infrastructure outputs and deploys the app on Kubernetes
4. Shared ingress, TLS references, and platform-integrated secrets are managed in the Kubernetes layer

### Important Boundary

Do not treat `jutoverse_demo` as the owner of shared-environment Kubernetes manifests unless the ownership model is explicitly changed.

This is a deliberate distinction from other examples in adjacent repos where an app repo may temporarily own its own route or chart.

## DNS and TLS Note

The full serving path may involve four ownership domains:

- `jutomate-cloud-iac` for infrastructure contracts such as static ingress IPs
- `jutomate-tools` for Kubernetes-side Traefik and TLS-secret references
- `jutoverse_demo` for app behavior and exposed service contract
- external/manual DNS operators for Squarespace-managed DNS records and manual DNS-01 steps where applicable

## Decision Rule

When a task spans multiple layers:

- change infrastructure in `jutomate-cloud-iac`
- change Kubernetes deployment/platform wiring in `jutomate-tools`
- change application code and local development behavior in `jutoverse_demo`

If a requested change crosses these boundaries, call it out explicitly rather than silently mixing responsibilities.
