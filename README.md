<p align="center">
  <img src="https://img.shields.io/badge/Angular-21.2.4-dd0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 21" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Chart.js-4.x-ff6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Zoneless-signals-6366f1?style=for-the-badge" alt="Zoneless" />
  <img src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">Groman2</h1>

<p align="center">
  <strong>Zoneless Angular 21 Dashboard Template</strong><br/>
  A glassmorphism admin panel with 28 reusable components, a 10-directive composition kit,<br/>
  12 accent themes plus light/dark schemes, and a starter project you can download.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/v0.3.0-stable-10b981?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/components-28-6366f1?style=flat-square" alt="Components" />
  <img src="https://img.shields.io/badge/themes-12-a855f7?style=flat-square" alt="Themes" />
  <img src="https://img.shields.io/badge/directives-10-3b82f6?style=flat-square" alt="Directives" />
</p>

---

## Overview

Groman2 is a **zoneless** Angular 21 dashboard template. There is no `zone.js` dependency and no polyfill entry — signals are the only thing that tells Angular to re-render. Every component is standalone and OnPush, every route is lazy, every form is a Signal Form, and the downloadable starter project is mirrored from this codebase so it can never go stale.

### Key Highlights

| Feature | Description |
|---------|-------------|
| **Dark Glassmorphism UI** | Premium glass-panel design with backdrop blur, subtle borders, and depth shadows |
| **12 Color Themes** | 6 accent colors × 2 navbar styles (dark + colored gradient) — switchable at runtime |
| **Zoneless change detection** | `provideZonelessChangeDetection()`, no `zone.js` in `package.json`, no polyfills entry |
| **28 Shared Components** | Alert, Avatar, Badge, Breadcrumbs, Carousel, Chip, CodeSnippet, CollapsePanel, DataTable, DatePicker, Drawer, Dropdown, EmptyState, FileUpload, FormField, Icon, Modal, Pagination, ProgressBar, Skeleton, Spinner, Stepper, Tabs, Timeline, Toast, and the UI form controls |
| **10-directive composition kit** | `*appLet`, `appClickOutside`, `appAutofocus`, `appRipple`, `appLazyImg`, `appCellTemplate`, `appSkeleton`, `appPermission`, `appTooltip`, `appCollapse` |
| **Light + dark schemes** | The whole app retones from one token, `--overlay-rgb`, that every surface and border is built on |
| **Signal Forms** | `@angular/forms/signals` for login, register, profile, wizard and calendar — no `FormsModule` |
| **Component Showcase** | 28 interactive sections with live demos, toggleable options, and copy-ready code |
| **Full Auth Flow** | Login, Register, Profile, and Settings pages with local auth service |
| **Calendar** | Interactive monthly calendar with event creation, color-coded dots |
| **Charts** | Line, Bar, Doughnut, and Polar Area charts via Chart.js + ng2-charts |
| **Documentation Hub** | 7 doc sections: Overview, Components, Directives, Services, Pages, Security Audit, Download |
| **Template Download** | One-click ZIP of a clean starter project, mirrored from `src/` so it is never out of date |
| **Command palette** | ⌘K / Ctrl+K jumps to any page, built from the same definition as the sidebar |

---

## Tech Stack

```
Angular 21.2.4               Zoneless change detection, standalone components, signals
@angular/forms/signals       Model-driven, type-safe forms — no FormsModule
TypeScript 5.9               Strict mode, strictTemplates, strictStandalone
Chart.js 4 + ng2-charts 10   Data visualization, scoped to the two chart routes
JSZip 3.10                   Client-side ZIP generation for the template download
CSS Custom Properties        Runtime theming — no SCSS, no Tailwind
```

Notably **not** in the dependency list: `zone.js`.

---

## Project Structure

```
src/
├── app/
│   ├── components/              # App shell
│   │   ├── navbar/              #   Search/⌘K, theme toggle, notifications, account menu
│   │   ├── sidebar/             #   Collapsible groups, driven by nav-items.ts
│   │   └── stat-card/           #   Dashboard metric cards with skeleton support
│   │
│   ├── shared/
│   │   ├── components/          # 28-component UI library (see index.ts barrel)
│   │   └── ui.types.ts          # Shared size/variant vocabulary
│   │
│   ├── directives/              # Composition kit (10 directives + UI_DIRECTIVES barrel)
│   │
│   ├── services/                # All signal-based
│   │   ├── auth.service.ts      #   Session as signals, localStorage-backed
│   │   ├── auth.guard.ts        #   CanActivateFn for /profile and /settings
│   │   ├── sidebar.service.ts   #   Collapse + mobile drawer state
│   │   ├── theme.service.ts     #   12 accents × dark/light scheme
│   │   ├── toast.service.ts     #   Notification queue
│   │   ├── breakpoint.service.ts#   matchMedia as signals
│   │   ├── payment.service.ts   #   Demo donation flow
│   │   └── storage.ts           #   persistedSignal() helper
│   │
│   ├── layouts/                 # Dashboard (sidebar + navbar) and Auth (centered card)
│   │
│   ├── pages/                   # Every page lazily routed
│   │   ├── home/                #   Stat cards, theme-reactive charts, orders, activity
│   │   ├── components/          #   28-section component showcase
│   │   ├── docs/                #   Documentation hub
│   │   │   ├── template-src/    #     Starter template: mirror/ + _overrides/ + manifest
│   │   │   └── services/        #     TemplateGeneratorService (~90 lines, no duplicated code)
│   │   ├── calendar/ charts/ wizard/ profile/ settings/ login/ register/ not-found/
│   │
│   ├── app.config.ts            # Zoneless providers, router features, http
│   └── app.routes.ts            # Fully lazy route tree with titles and breadcrumbs
│
├── environments/                # Environment configurations
└── styles.css                   # Design tokens, light + dark schemes, utilities

scripts/
├── template-manifest.mjs        # Declares what ships in the starter ZIP
└── sync-template.mjs            # Mirrors src/ into the template; --write or verify
```

---

## Pages & Features

### Dashboard
Stat cards showing Total Users, Revenue, Sales, and Bounce Rate with growth indicators. Interactive Line and Bar charts powered by Chart.js.

### Component Library
Interactive showcase with **16 sections**: Buttons, Button Groups, Badges, Cards (including feature cards inspired by SaaS dashboards), Carousel, Collapse, Forms, Modals, Navs, Progress Bars, Tables, Tooltips, Date Picker, Grid System, Icons, and Spinners. Each section includes live demos and code snippets.

### Calendar
Monthly grid calendar with:
- Color-coded event dots
- Event detail panel on date selection
- "New Event" modal with title, date, and color picker

### Settings — Theme Switcher
12 themes organized in two groups:
- **Dark Navbar** (6 colors) — standard dark surface navbar with accent highlights
- **Colored Navbar** (6 colors) — gradient navbar with white-contrast elements

Themes: Indigo, Blue, Green, Purple, Red, Teal. All switch instantly via CSS custom properties.

### Profile
Avatar with auto-generated initials, display name and email editing, password change form — all using the project's global `form-control` styling.

### Documentation
7 documentation sections covering every aspect of the project:
- **Overview** — Architecture, version, tech stack
- **Components** — Usage guide for all 10 shared components
- **Directives** — Tooltip and Collapse directive APIs
- **Services** — Auth, Sidebar, Theme service documentation
- **Pages** — Route structure and page descriptions
- **Security Audit** — Cybersecurity review of the template
- **Download Template** — One-click ZIP download with file tree preview

### Auth Pages
Login and Register pages with a centered glassmorphism card, gradient glow background, form validation, and Google sign-in button.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.19
- **npm** ≥ 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/groman2.git
cd groman2

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in `dist/groman2/`.

---

## Theming

Groman2 uses CSS custom properties for all colors. The `ThemeService` applies themes at runtime by setting variables on `document.documentElement.style`.

### Available Themes

| Theme | Primary | Navbar Variants |
|-------|---------|-----------------|
| Indigo | `#6366f1` | Dark · Colored |
| Blue | `#3b82f6` | Dark · Colored |
| Green | `#10b981` | Dark · Colored |
| Purple | `#a855f7` | Dark · Colored |
| Red | `#ef4444` | Dark · Colored |
| Teal | `#14b8a6` | Dark · Colored |

### Custom Theme

Add a new color to `ThemeService.COLORS`:

```typescript
{ key: 'amber', name: 'Amber', primary: '#f59e0b', secondary: '#d97706', gradientHover: '#fbbf24, #f59e0b' }
```

Both dark and colored navbar variants are auto-generated.

---

## Component API Reference

### Badge
```html
<app-badge variant="success" size="sm">Active</app-badge>
```

### Modal
```html
<app-modal title="Confirm" [(isOpen)]="showModal">
  <p>Are you sure?</p>
  <div modal-footer>
    <button class="btn btn-gradient" (click)="confirm()">Yes</button>
  </div>
</app-modal>
```

### Data Table
```html
<app-data-table [columns]="columns" [rows]="rows" [searchable]="true" [pageSize]="10">
  <ng-template appCellTemplate="status" let-value>
    <app-badge [variant]="value === 'Active' ? 'success' : 'secondary'">{{ value }}</app-badge>
  </ng-template>
</app-data-table>
```

### Signal Forms
```typescript
protected readonly model = signal({ email: '', role: '' });

protected readonly userForm = form(this.model, path => {
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Enter a valid email address' });
});
```
```html
<app-ui-input label="Email" type="email" [required]="true" [field]="userForm.email" />
<app-ui-select label="Role" [options]="roles" [field]="userForm.role" />
<button [disabled]="userForm().invalid()">Save</button>
```

### Toasts
```typescript
private readonly toasts = inject(ToastService);
this.toasts.success('Profile saved', { message: 'Your changes are live.' });
```

### Directive kit
```typescript
import { UI_DIRECTIVES } from './directives';

@Component({ imports: [...UI_DIRECTIVES] })
```

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Standalone components** | No NgModules — cleaner imports, better tree-shaking |
| **Zoneless change detection** | No monkey-patched timers, smaller bundle, shorter startup. The trade-off: state mutated outside a template listener *must* be a signal, or the view will not update |
| **Signals over RxJS** | Services expose signals, not observables — no subscriptions, no `async` pipe, and it is what makes zoneless work |
| **Directives for cross-cutting behaviour** | Outside clicks, tooltips, ripples and skeletons live in one place instead of being copy-pasted into every component |
| **Template mirrored, not duplicated** | The old generator kept 1,900 lines of source code as strings and drifted constantly. Now `scripts/sync-template.mjs` mirrors the real files and `npm run build` fails if they diverge |
| **CSS custom properties** | Runtime theme switching without recompilation |
| **Lazy loading** | Components, Docs, Profile, and Settings are lazy-loaded for faster initial bundle |
| **OnPush change detection** | Better performance on all new components |
| **Local auth (no Firebase)** | Template works offline — plug in your own backend |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on port 4200 |
| `npm run build` | Verify the starter template is in sync, then build for production |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests (Karma, no `zone.js/testing`) |
| `npm run template:sync` | Regenerate the downloadable template after changing `src/` |
| `npm run template:check` | Fail if the template has drifted from `src/` |

---

## License

Apache 2.0 license

---

<p align="center">
  Built with <strong>Angular 21</strong> · Designed with <strong>Glassmorphism</strong> · Themed with <strong>CSS Custom Properties</strong>
</p>
