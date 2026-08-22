import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface TechItem {
  name: string;
  version: string;
  description: string;
}

interface ArchitectureNote {
  title: string;
  detail: string;
}

@Component({
  selector: 'app-overview-section',
  standalone: true,
  templateUrl: './overview-section.component.html',
  styleUrl: './overview-section.component.css',
  imports: [CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewSectionComponent {
  readonly projectName = 'Groman2';
  readonly projectVersion = '0.3.0';
  readonly angularVersion = '21.2.4';

  readonly techStack: TechItem[] = [
    { name: 'Angular', version: '21', description: 'Zoneless change detection, standalone components, signals' },
    { name: 'Signal Forms', version: '21', description: '@angular/forms/signals - model-driven, type-safe forms' },
    { name: 'Chart.js', version: '4', description: 'Flexible JavaScript charting library' },
    { name: 'ng2-charts', version: '10', description: 'Angular bindings for Chart.js' },
    { name: 'TypeScript', version: '5.9', description: 'Typed superset of JavaScript, strict mode on' },
    { name: 'JSZip', version: '3', description: 'Builds the downloadable starter template in the browser' }
  ];

  readonly architecture: ArchitectureNote[] = [
    {
      title: 'Zoneless change detection',
      detail:
        'provideZonelessChangeDetection() with no zone.js dependency and no polyfill entry. ' +
        'Signals are the only thing that tells Angular to re-render, which means no monkey-patched ' +
        'timers, a smaller bundle and a shorter startup path.'
    },
    {
      title: 'OnPush everywhere',
      detail:
        'Every component in the app declares ChangeDetectionStrategy.OnPush, and the CLI schematics ' +
        'are configured to generate new ones the same way.'
    },
    {
      title: 'Signals, not decorators',
      detail:
        'input() / output() / model() / computed() throughout. No @Input, no @Output, no ' +
        'BehaviorSubject and no async pipe anywhere in the codebase.'
    },
    {
      title: 'Fully lazy routing',
      detail:
        'Both layouts, every page and every demo section load on demand, so the initial bundle only ' +
        'carries the app shell and the router. Chart.js is scoped to the two routes that draw charts.'
    },
    {
      title: 'Composition through directives',
      detail:
        'Cross-cutting behaviour (outside clicks, tooltips, ripples, skeletons, permissions, lazy ' +
        'images) lives in standalone directives instead of being copy-pasted into components.'
    },
    {
      title: 'A template that cannot drift',
      detail:
        'The downloadable ZIP is mirrored from this app\'s own src/ by scripts/sync-template.mjs, and ' +
        'pnpm run build fails if the two ever diverge.'
    }
  ];

  readonly folderTree = `src/
\u251C\u2500\u2500 app/
\u2502   \u251C\u2500\u2500 components/        # App shell (sidebar, navbar, stat-card)
\u2502   \u251C\u2500\u2500 directives/        # Composition kit (10 directives + barrel)
\u2502   \u251C\u2500\u2500 layouts/           # Dashboard and Auth layouts
\u2502   \u251C\u2500\u2500 pages/             # Feature pages, each lazily routed
\u2502   \u251C\u2500\u2500 services/          # Auth, Sidebar, Theme, Toast, Breakpoint, storage
\u2502   \u251C\u2500\u2500 shared/
\u2502   \u2502   \u251C\u2500\u2500 components/    # UI library (28 components + barrel)
\u2502   \u2502   \u2514\u2500\u2500 ui.types.ts    # Shared size/variant vocabulary
\u2502   \u251C\u2500\u2500 app.config.ts      # Zoneless providers, router, http
\u2502   \u2514\u2500\u2500 app.routes.ts      # Fully lazy route tree
\u251C\u2500\u2500 environments/          # Environment configs
\u2514\u2500\u2500 styles.css             # Design tokens, light + dark schemes

scripts/
\u251C\u2500\u2500 template-manifest.mjs  # Declares what ships in the starter ZIP
\u2514\u2500\u2500 sync-template.mjs      # Mirrors src/ into the template, verifies sync`;

  readonly quickStartCode = `# Install dependencies
pnpm install

# Start the dev server
pnpm start          # http://localhost:4200

# Production build (verifies the starter template is in sync first)
pnpm run build

# Unit tests (Karma, no zone.js/testing)
pnpm test

# Regenerate the downloadable template after changing src/
pnpm run template:sync`;

  readonly zonelessCode = `// src/app/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch())
  ]
};

// There is no "zone.js" in package.json and no polyfills entry in angular.json.
// State that changes outside a template listener MUST be a signal, otherwise
// the view will not update:

//  Breaks under zoneless - a plain field mutated from a timer
copied = false;
copy() { this.copied = true; setTimeout(() => this.copied = false, 2000); }

//  Correct - the signal write notifies the scheduler
protected readonly copied = signal(false);
copy() { this.copied.set(true); setTimeout(() => this.copied.set(false), 2000); }`;
}
