# UX UI Style Contract

## Purpose

This document defines the UX/UI implementation baseline for `jutoverse_demo`.

The demo must reuse the style system, interaction patterns, and frontend implementation approach from `/Users/omid/projects/react-poc` instead of creating a parallel design system.

## Source of Truth

The following files in `/Users/omid/projects/react-poc` are the authoritative style and implementation references for this demo:

- `docs/ux-ui-contract.md`
- `docs/theme-system.md`
- `src/styles.css`
- `src/theme/themeCatalog.ts`
- `src/theme/ThemeProvider.tsx`
- `src/i18n/`
- `src/components/common/LocaleSwitch.tsx`
- `src/components/common/RegionBadge.tsx`
- `src/components/common/FlagIcon.tsx`
- `src/assets/gcp-icons/products/svg/`

## Reuse Policy

### Mandatory Reuse

The demo should reuse or closely adapt the following patterns from `react-poc`:

- the centered app shell and content-width discipline
- the shared token-based theme system
- rounded card surfaces, subtle borders, layered shadows, and restrained hover lift
- pill-shaped buttons, toggles, chips, and segmented controls
- RTL/LTR-safe layout rules based on logical CSS properties
- accessibility patterns for focus, buttons, pressed state, modals, and reduced motion
- GCP-oriented visual language and iconography for technical or architecture views

### No Parallel Design System

Do not introduce:

- a separate color system outside the shared theme-token contract
- ad hoc spacing, radius, or shadow scales
- hardcoded left/right layout rules when logical properties can be used
- AWS-oriented iconography or Nimbus-branded visual language in the demo UI

## Demo Visual Direction

### Default Theme

Use the `Jutoverse` visual theme as the default presentation layer for this demo while preserving compatibility with the `react-poc` theme-token architecture.

This means the demo should prefer:

- dark navy surfaces
- cyan and blue primary emphasis
- luminous data and cloud accents
- restrained motion and subtle glow, not decorative excess

### Shared Design Language

The visual system should preserve the existing `react-poc` contract:

- token-driven colors and gradients
- consistent card radius and elevation
- strong hierarchy through headings, muted support text, and primary action emphasis
- quiet page backgrounds with readable content surfaces
- motion that respects `prefers-reduced-motion`

## Layout and Interaction Contract

### Application Shell

- Keep a clear top-level shell with consistent navigation, page heading, and action areas.
- Keep controls visually consistent across modules and screens.
- Reuse existing container-width, spacing-density, and control-group patterns before inventing new layout primitives.

### Cards and Panels

- Reuse card density, radius, border, and shadow behavior from `react-poc`.
- Use the same visual hierarchy for titles, metadata, badges, summaries, and empty states.
- Keep hover lift subtle and never use motion as the only state indicator.

### Forms, Search, and Filters

- Reuse pill/button/filter patterns from `react-poc`.
- Keep primary actions visually distinct through theme tokens, not custom one-off styling.
- Maintain keyboard-accessible controls and explicit labels for form inputs and search.

### Language and Direction

- Preserve Hebrew `rtl` support as a first-class requirement.
- Preserve English `ltr` support for demos, admin text, and fallback content.
- Keep layouts Arabic-ready by using the same logical CSS rules already established in `react-poc`.
- Do not hardcode global direction at the component level unless the content is chart-internal or spatially technical.

### Accessibility

- Use real buttons for navigation and segmented controls.
- Preserve visible focus states.
- Keep `aria-pressed` semantics for active toggles.
- Ensure modals and drawers support focus management and Escape close behavior.
- Avoid long or unnecessary animation and respect reduced-motion settings.

## Code Reuse Guidance

When implementation starts in this repository, prefer the following reuse order:

1. copy or adapt the token and theme runtime from `src/styles.css`, `src/theme/themeCatalog.ts`, and `src/theme/ThemeProvider.tsx`
2. copy or adapt shared localization and direction patterns from `src/i18n/` and `src/components/common/LocaleSwitch.tsx`
3. copy or adapt shared badges and geography visuals from `src/components/common/RegionBadge.tsx` and `src/components/common/FlagIcon.tsx`
4. reuse the local GCP icon set from `src/assets/gcp-icons/products/svg/`
5. adapt existing card, toolbar, filter, modal, and dashboard-shell patterns before creating new primitives

## Acceptance Criteria

The UX/UI implementation satisfies this contract only if:

- new screens visually align with the `react-poc` token system
- no separate design system is introduced
- GCP is the only cloud visual language used in the demo
- Hebrew RTL remains supported, English LTR remains supported, and layouts remain Arabic-ready
- controls, cards, focus states, and motion behavior follow the `react-poc` baseline
- any extension to the theme system is added through the same token-driven approach rather than hardcoded styling
