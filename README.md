<p align="center">
  <img src="https://img.shields.io/badge/Angular-21.2.4-dd0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 21" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Chart.js-4.x-ff6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Standalone-Components-6366f1?style=for-the-badge" alt="Standalone" />
</p>

<h1 align="center">Groman2</h1>

<p align="center">
  <strong>Modern Angular 21 Dashboard Template</strong><br/>
  A premium dark glassmorphism admin panel with 10+ reusable components,<br/>
  12 color themes, and a complete component showcase.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/v0.2.0-stable-10b981?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/components-10+-6366f1?style=flat-square" alt="Components" />
  <img src="https://img.shields.io/badge/themes-12-a855f7?style=flat-square" alt="Themes" />
  <img src="https://img.shields.io/badge/pages-13-3b82f6?style=flat-square" alt="Pages" />
</p>

---

## Overview

Groman2 is a fully standalone Angular 21 dashboard template built with modern best practices: **signals**, **OnPush change detection**, **lazy-loaded routes**, and **CSS custom properties**. No NgModules — every component is standalone.

### Key Highlights

| Feature | Description |
|---------|-------------|
| **Dark Glassmorphism UI** | Premium glass-panel design with backdrop blur, subtle borders, and depth shadows |
| **12 Color Themes** | 6 accent colors × 2 navbar styles (dark + colored gradient) — switchable at runtime |
| **10 Shared Components** | Badge, Modal, Carousel, Collapse, Progress, Table, Spinner, DatePicker, CodeSnippet |
| **Component Showcase** | 16 interactive sections with live demos, toggleable options, and copy-ready code |
| **Full Auth Flow** | Login, Register, Profile, and Settings pages with local auth service |
| **Calendar** | Interactive monthly calendar with event creation, color-coded dots |
| **Charts** | Line, Bar, Doughnut, and Polar Area charts via Chart.js + ng2-charts |
| **Documentation Hub** | 7 doc sections: Overview, Components, Directives, Services, Pages, Security Audit, Download |
| **Template Download** | One-click ZIP export of a clean starter project with all components included |

---

## Tech Stack

```
Angular 21.2.4        Standalone components, signals, @if/@for control flow
TypeScript 5.9        Strict type checking
Chart.js 4 + ng2-charts 10   Data visualization
JSZip 3.10            Client-side ZIP generation for template download
CSS Custom Properties  Runtime theming — no SCSS, no Tailwind
```

---

## Project Structure

```
src/
├── app/
│   ├── components/              # Core layout components
│   │   ├── navbar/              #   Top bar with search, notifications, profile menu
│   │   ├── sidebar/             #   Collapsible navigation with icons
│   │   └── stat-card/           #   Dashboard metric cards
│   │
│   ├── shared/components/       # Reusable UI components
│   │   ├── badge/               #   Status badges (primary, success, warning, danger)
│   │   ├── carousel/            #   Image carousel with autoplay & indicators
│   │   ├── collapse-panel/      #   Expandable content panels
│   │   ├── code-snippet/        #   Syntax-highlighted code blocks
│   │   ├── data-table/          #   Sortable, striped, bordered tables
│   │   ├── date-picker/         #   Calendar date selection
│   │   ├── modal/               #   Dialog overlays with header/body/footer
│   │   ├── progress-bar/        #   Animated bars with variants & labels
│   │   ├── spinner/             #   Loading indicators (circular, dots, pulse)
│   │   └── donation-button/     #   CTA button component
│   │
│   ├── directives/              # Custom directives
│   │   ├── tooltip.directive.ts #   Hover tooltips
│   │   └── collapse.directive.ts#   Collapse/expand toggle
│   │
│   ├── services/                # Application services
│   │   ├── auth.service.ts      #   Authentication (signals, localStorage)
│   │   ├── sidebar.service.ts   #   Sidebar state management
│   │   └── theme.service.ts     #   12 themes with CSS variable injection
│   │
│   ├── layouts/                 # Page layouts
│   │   ├── dashboard/           #   Sidebar + Navbar + content area
│   │   └── auth/                #   Centered card with glow background
│   │
│   ├── pages/                   # Feature pages
│   │   ├── home/                #   Dashboard with stat cards + charts
│   │   ├── components/          #   16-section component showcase
│   │   ├── calendar/            #   Monthly calendar with events
│   │   ├── charts/              #   Chart.js visualizations
│   │   ├── wizard/              #   Multi-step form wizard
│   │   ├── profile/             #   User profile editor
│   │   ├── settings/            #   Theme switcher (dark/colored navbar)
│   │   ├── docs/                #   Documentation hub + ZIP download
│   │   ├── login/               #   Sign in page
│   │   ├── register/            #   Sign up page
│   │   └── not-found/           #   404 page
│   │
│   ├── app.config.ts            # Application providers
│   └── app.routes.ts            # Route definitions with lazy loading
│
├── assets/css/colors/           # Theme color CSS files
├── environments/                # Environment configurations
└── styles.css                   # Global CSS variables & utility classes
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
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build for Production

```bash
ng build --configuration production
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
<app-badge text="New" variant="primary"></app-badge>
<app-badge text="3" variant="danger" pill></app-badge>
```

### Modal
```html
<app-modal [isOpen]="show" title="Confirm" (closed)="show = false">
  <p>Are you sure?</p>
  <div modal-footer>
    <button class="btn btn-gradient" (click)="confirm()">Yes</button>
  </div>
</app-modal>
```

### Progress Bar
```html
<app-progress-bar [value]="75" variant="success" [striped]="true" [animated]="true" label="75%"></app-progress-bar>
```

### Data Table
```html
<app-data-table [columns]="columns" [data]="data" [striped]="true" [hover]="true"></app-data-table>
```

### Carousel
```html
<app-carousel [images]="slides" [autoPlay]="true" [interval]="5000"></app-carousel>
```

---

## Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **Standalone components** | No NgModules — cleaner imports, better tree-shaking |
| **Signals over RxJS** | Simpler state management for component-level state |
| **CSS custom properties** | Runtime theme switching without recompilation |
| **Lazy loading** | Components, Docs, Profile, and Settings are lazy-loaded for faster initial bundle |
| **OnPush change detection** | Better performance on all new components |
| **Local auth (no Firebase)** | Template works offline — plug in your own backend |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on port 4200 |
| `npm run build` | Production build |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests |

---

## License

Apache 2.0 license

---

<p align="center">
  Built with <strong>Angular 21</strong> · Designed with <strong>Glassmorphism</strong> · Themed with <strong>CSS Custom Properties</strong>
</p>
