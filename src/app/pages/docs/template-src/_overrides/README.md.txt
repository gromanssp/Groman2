# Groman2 Template

A zoneless, signal-first Angular 21 dashboard starter with a glassmorphism design
system, a reusable component library and a directive kit for composing UI.

## Getting started

```bash
pnpm install
pnpm start
```

Then open http://localhost:4200.

## What's inside

**Architecture**

- **Zoneless change detection** — `provideZonelessChangeDetection()`, no `zone.js`
  dependency and no polyfill. Signals are what tell Angular to re-render.
- **OnPush everywhere** — every component uses `ChangeDetectionStrategy.OnPush`;
  the CLI schematics are configured to generate new ones the same way.
- **Signals only** — `input()` / `output()` / `model()` / `computed()`. No
  decorators, no `BehaviorSubject`, no `async` pipe.
- **Fully lazy routes** — both layouts and every page load on demand.
- **Signal Forms** — `@angular/forms/signals` for login, register, profile and
  calendar. No `FormsModule`, no `ReactiveFormsModule`.

**Component library** (`src/app/shared/components/`)

Alert · Avatar · Badge · Breadcrumbs · Carousel · Chip · Code snippet ·
Collapse panel · Data table · Date picker · Drawer · Dropdown · Empty state ·
File upload · Form field · Modal · Pagination · Progress bar · Skeleton ·
Spinner · Stepper · Tabs · Timeline · Toast · UI input / select / textarea /
switch / checkbox

**Directive kit** (`src/app/directives/`)

| Directive | Purpose |
| --- | --- |
| `*appLet` | Alias an expression without an artificial `@if` |
| `appClickOutside` | One outside-click listener instead of one per menu |
| `appAutofocus` | Focus a modal or drawer when it opens |
| `appRipple` | Click feedback that never touches component state |
| `appLazyImg` | Defer image requests until they scroll into view |
| `appCellTemplate` | Per-column templates for the data table |
| `appSkeleton` | Mask any block while its data loads |
| `appPermission` | Show content only for the given roles |
| `appTooltip` | Body-rendered tooltip, never clipped by `overflow` |
| `appCollapse` | Height-animated collapse |

Import them individually, or spread the whole kit:

```ts
import { UI_DIRECTIVES } from './directives';

@Component({ imports: [...UI_DIRECTIVES] })
```

**Services** (`src/app/services/`)

- `ThemeService` — accent themes plus a dark/light scheme, applied as CSS
  custom properties on `<html>`.
- `SidebarService` — collapse and mobile-drawer state.
- `AuthService` — demo auth backed by `localStorage`; swap the three async
  methods for real HTTP calls.
- `ToastService` — notification queue, rendered by `<app-toast-host />`.
- `BreakpointService` — `matchMedia` as signals.
- `persistedSignal()` — a signal mirrored into `localStorage`.

## Theming

All colors are CSS custom properties in `src/styles.css`. Surfaces and borders
use `rgba(var(--overlay-rgb), α)`, and the light scheme flips `--overlay-rgb`,
so a single token switch retheme the whole app.

## Adding a page

1. Create the component (it will be standalone and OnPush by default).
2. Add a lazy route in `src/app/app.routes.ts` with a `title` and
   `data.breadcrumb`.
3. Add an entry to `NAV_GROUPS` in `src/app/components/sidebar/nav-items.ts` —
   the sidebar and the ⌘K command palette both pick it up automatically.

## Commands

```bash
pnpm start        # dev server
pnpm run build    # production build
pnpm test         # unit tests
```
