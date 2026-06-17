# Frontend Execution Assumptions

## Purpose

This document records the concrete implementation assumptions approved for the first end-to-end frontend build of `jutoverse_demo`.

It is intentionally execution-oriented. It does not replace the PRD or the broader implementation plans.

## Assumptions

### Delivery Scope

- The current build target is a frontend-only live mockup.
- The implementation should cover all major UX areas described in the PRD.
- The goal is a polished demo experience, not a production-complete application.

### Runtime and Stack

- The web tier will be implemented as `React + TypeScript + Vite`.
- The application will run without a backend during this phase.
- All data access will be simulated through typed frontend adapters and fixture-backed mock resources.

### UX and Visual Direction

- The default visual treatment is `Jutoverse`.
- The frontend should reuse and adapt theme variables, shell behavior, locale switching patterns, and GCP visual language from `/Users/omid/projects/react-poc`.
- Reuse means selective adaptation into this repository, not a literal copy of unrelated modules.
- The resulting UI should feel premium, immersive, and presentation-ready, while remaining readable and accessible.

### Feature Coverage

- The first implementation will include all six top-level work areas:
  - `Overview`
  - `Service Operations`
  - `Representative Assistant`
  - `Citizen Services`
  - `Research Review`
  - `Administration`
- Each area may use mocked content and simulated states as long as the workflows are coherent and realistic.

### Interaction Model

- Panels, workspaces, and detail windows may be implemented as frontend-owned interactive surfaces with collapse, expand, and resize behaviors.
- Complex workflows such as document analysis, proposal screening, alerts, and assistant responses may be simulated through staged UI states.
- Browser persistence should remain minimal unless needed for theme, locale, or clear UX continuity.

### Responsive Support

- The UI must work across desktop, tablet, and mobile breakpoints.
- Desktop may use denser multi-panel layouts.
- Tablet and mobile may stack, simplify, or reflow panels as needed without losing feature access.

### Language and Direction

- Hebrew RTL is a first-class requirement in this build.
- English LTR remains supported.
- Layouts should remain Arabic-ready through logical CSS usage even if Arabic copy is not fully authored in this phase.

### Data and Content

- Exact backend response schemas do not yet exist, so frontend contracts may be inferred from the PRD and implementation plan.
- Mock content may be synthetic as long as it matches the product narrative and does not contradict the documented contract.
- AI outputs must be framed as reviewable, grounded, and non-final where the PRD requires human oversight.

### Non-Goals for This Phase

- real authentication integration
- real API endpoints
- real database persistence
- real GCP service integration
- shared-environment deployment assets

## Success Standard For This Build

The build is considered successful for this phase when:

- the app runs locally as a live mockup
- all major PRD feature areas are navigable
- the UI is visually coherent and meaningfully polished
- the implementation clearly reuses the `react-poc` design language
- panels and workflows feel interactive rather than static
- the experience holds up across multiple screen sizes
