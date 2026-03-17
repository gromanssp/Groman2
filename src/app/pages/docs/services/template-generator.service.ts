import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemplateGeneratorService {

  async generateTemplate(): Promise<void> {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();

    // Root config files
    zip.file('package.json', this.packageJson());
    zip.file('angular.json', this.angularJson());
    zip.file('tsconfig.json', this.tsconfigJson());
    zip.file('tsconfig.app.json', this.tsconfigAppJson());
    zip.file('.editorconfig', this.editorconfig());

    // Source files
    zip.file('src/index.html', this.indexHtml());
    zip.file('src/main.ts', this.mainTs());
    zip.file('src/styles.css', this.stylesCss());

    // App shell
    zip.file('src/app/app.component.ts', this.appComponentTs());
    zip.file('src/app/app.component.html', this.appComponentHtml());
    zip.file('src/app/app.component.css', this.appComponentCss());
    zip.file('src/app/app.config.ts', this.appConfigTs());
    zip.file('src/app/app.routes.ts', this.appRoutesTs());

    // Layouts
    zip.file('src/app/layouts/dashboard/dashboard.component.ts', this.dashboardLayoutTs());
    zip.file('src/app/layouts/dashboard/dashboard.component.html', this.dashboardLayoutHtml());
    zip.file('src/app/layouts/dashboard/dashboard.component.css', this.dashboardLayoutCss());

    // Core components
    zip.file('src/app/components/sidebar/sidebar.component.ts', this.sidebarTs());
    zip.file('src/app/components/sidebar/sidebar.component.html', this.sidebarHtml());
    zip.file('src/app/components/sidebar/sidebar.component.css', this.sidebarCss());
    zip.file('src/app/components/navbar/navbar.component.ts', this.navbarTs());
    zip.file('src/app/components/navbar/navbar.component.html', this.navbarHtml());
    zip.file('src/app/components/navbar/navbar.component.css', this.navbarCss());
    zip.file('src/app/components/stat-card/stat-card.component.ts', this.statCardTs());
    zip.file('src/app/components/stat-card/stat-card.component.html', this.statCardHtml());
    zip.file('src/app/components/stat-card/stat-card.component.css', this.statCardCss());

    // Shared components
    zip.file('src/app/shared/components/badge/badge.component.ts', this.badgeTs());
    zip.file('src/app/shared/components/badge/badge.component.html', this.badgeHtml());
    zip.file('src/app/shared/components/badge/badge.component.css', this.badgeCss());
    zip.file('src/app/shared/components/modal/modal.component.ts', this.modalTs());
    zip.file('src/app/shared/components/modal/modal.component.html', this.modalHtml());
    zip.file('src/app/shared/components/modal/modal.component.css', this.modalCss());
    zip.file('src/app/shared/components/collapse-panel/collapse-panel.component.ts', this.collapsePanelTs());
    zip.file('src/app/shared/components/collapse-panel/collapse-panel.component.html', this.collapsePanelHtml());
    zip.file('src/app/shared/components/collapse-panel/collapse-panel.component.css', this.collapsePanelCss());
    zip.file('src/app/shared/components/progress-bar/progress-bar.component.ts', this.progressBarTs());
    zip.file('src/app/shared/components/progress-bar/progress-bar.component.html', this.progressBarHtml());
    zip.file('src/app/shared/components/progress-bar/progress-bar.component.css', this.progressBarCss());
    zip.file('src/app/shared/components/data-table/data-table.component.ts', this.dataTableTs());
    zip.file('src/app/shared/components/data-table/data-table.component.html', this.dataTableHtml());
    zip.file('src/app/shared/components/data-table/data-table.component.css', this.dataTableCss());
    zip.file('src/app/shared/components/code-snippet/code-snippet.component.ts', this.codeSnippetTs());
    zip.file('src/app/shared/components/code-snippet/code-snippet.component.html', this.codeSnippetHtml());
    zip.file('src/app/shared/components/code-snippet/code-snippet.component.css', this.codeSnippetCss());
    zip.file('src/app/shared/components/spinner/spinner.component.ts', this.spinnerTs());
    zip.file('src/app/shared/components/spinner/spinner.component.html', this.spinnerHtml());
    zip.file('src/app/shared/components/spinner/spinner.component.css', this.spinnerCss());
    zip.file('src/app/shared/components/date-picker/date-picker.component.ts', this.datePickerTs());
    zip.file('src/app/shared/components/date-picker/date-picker.component.html', this.datePickerHtml());
    zip.file('src/app/shared/components/date-picker/date-picker.component.css', this.datePickerCss());

    // Directives
    zip.file('src/app/directives/tooltip.directive.ts', this.tooltipDirectiveTs());
    zip.file('src/app/directives/collapse.directive.ts', this.collapseDirectiveTs());

    // Services
    zip.file('src/app/services/sidebar.service.ts', this.sidebarServiceTs());
    zip.file('src/app/services/theme.service.ts', this.themeServiceTs());

    // Pages
    zip.file('src/app/pages/home/home.component.ts', this.homeTs());
    zip.file('src/app/pages/home/home.component.html', this.homeHtml());
    zip.file('src/app/pages/home/home.component.css', this.homeCss());
    zip.file('src/app/pages/not-found/not-found.component.ts', this.notFoundTs());
    zip.file('src/app/pages/not-found/not-found.component.html', this.notFoundHtml());
    zip.file('src/app/pages/not-found/not-found.component.css', this.notFoundCss());

    // Environment
    zip.file('src/environments/environment.ts', this.environmentTs());
    zip.file('src/environments/environment.prod.ts', this.environmentProdTs());

    // README
    zip.file('README.md', this.readmeMd());

    const blob = await zip.generateAsync({ type: 'blob' });
    this.downloadBlob(blob, 'groman2-template.zip');
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ─── Root Config Files ────────────────────────────────

  private packageJson(): string {
    return JSON.stringify({
      name: 'groman2-template',
      version: '1.0.0',
      scripts: {
        ng: 'ng',
        start: 'ng serve',
        build: 'ng build',
        watch: 'ng build --watch --configuration development',
        test: 'ng test'
      },
      private: true,
      dependencies: {
        '@angular/animations': '^21.2.4',
        '@angular/common': '^21.2.4',
        '@angular/compiler': '^21.2.4',
        '@angular/core': '^21.2.4',
        '@angular/forms': '^21.2.4',
        '@angular/platform-browser': '^21.2.4',
        '@angular/platform-browser-dynamic': '^21.2.4',
        '@angular/router': '^21.2.4',
        'chart.js': '^4.3.0',
        'ng2-charts': '^10.0.0',
        'rxjs': '~7.8.0',
        'tslib': '^2.3.0',
        'zone.js': '~0.15.1'
      },
      devDependencies: {
        '@angular-devkit/build-angular': '^21.2.2',
        '@angular/cli': '^21.2.2',
        '@angular/compiler-cli': '^21.2.4',
        '@types/jasmine': '~5.1.0',
        'jasmine-core': '~5.2.0',
        'karma': '~6.4.0',
        'karma-chrome-launcher': '~3.2.0',
        'karma-coverage': '~2.2.0',
        'karma-jasmine': '~5.1.0',
        'karma-jasmine-html-reporter': '~2.1.0',
        'typescript': '~5.9.3'
      }
    }, null, 2);
  }

  private angularJson(): string {
    return JSON.stringify({
      $schema: './node_modules/@angular/cli/lib/config/schema.json',
      version: 1,
      newProjectRoot: 'projects',
      projects: {
        'groman2-template': {
          projectType: 'application',
          root: '',
          sourceRoot: 'src',
          prefix: 'app',
          architect: {
            build: {
              builder: '@angular-devkit/build-angular:application',
              options: {
                outputPath: 'dist/groman2-template',
                index: 'src/index.html',
                browser: 'src/main.ts',
                tsConfig: 'tsconfig.app.json',
                assets: [{ glob: '**/*', input: 'public' }],
                styles: ['src/styles.css'],
                scripts: []
              },
              configurations: {
                production: {
                  budgets: [
                    { type: 'initial', maximumWarning: '1.2MB', maximumError: '2MB' },
                    { type: 'anyComponentStyle', maximumWarning: '4kB', maximumError: '8kB' }
                  ],
                  outputHashing: 'all'
                },
                development: {
                  optimization: false,
                  extractLicenses: false,
                  sourceMap: true
                }
              },
              defaultConfiguration: 'production'
            },
            serve: {
              builder: '@angular-devkit/build-angular:dev-server',
              configurations: {
                production: { buildTarget: 'groman2-template:build:production' },
                development: { buildTarget: 'groman2-template:build:development' }
              },
              defaultConfiguration: 'development'
            }
          }
        }
      }
    }, null, 2);
  }

  private tsconfigJson(): string {
    return JSON.stringify({
      compileOnSave: false,
      compilerOptions: {
        outDir: './dist/out-tsc',
        strict: true,
        noImplicitOverride: true,
        noPropertyAccessFromIndexSignature: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        sourceMap: true,
        declaration: false,
        downlevelIteration: true,
        experimentalDecorators: true,
        moduleResolution: 'bundler',
        importHelpers: true,
        target: 'ES2022',
        module: 'ES2022',
        lib: ['ES2022', 'dom'],
        skipLibCheck: true
      },
      angularCompilerOptions: {
        enableI18nLegacyMessageIdFormat: false,
        strictInjectionParameters: true,
        strictInputAccessModifiers: true,
        strictTemplates: true
      }
    }, null, 2);
  }

  private tsconfigAppJson(): string {
    return JSON.stringify({
      extends: './tsconfig.json',
      compilerOptions: { outDir: './out-tsc/app', types: [] },
      files: ['src/main.ts'],
      include: ['src/**/*.d.ts']
    }, null, 2);
  }

  private editorconfig(): string {
    return `root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
`;
  }

  // ─── Source Files ─────────────────────────────────────

  private indexHtml(): string {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Groman2 Template</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
`;
  }

  private mainTs(): string {
    return `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
`;
  }

  private stylesCss(): string {
    return `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

:root {
  --bg-main: #0a0b10;
  --bg-surface: rgba(20, 22, 30, 0.6);
  --bg-surface-hover: rgba(255, 255, 255, 0.08);
  --text-primary: #ffffff;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-gradient: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  --accent-gradient-hover: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
  --glass-border: 1px solid rgba(255, 255, 255, 0.06);
  --glass-border-light: 1px solid rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
  --glass-blur: blur(16px);
  --font-family: 'Outfit', sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-round: 9999px;
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  font-family: var(--font-family);
  background-color: var(--bg-main);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.glass-panel {
  background: var(--bg-surface);
  backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: var(--radius-lg);
}

.text-gradient {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.heading-1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
.heading-2 { font-size: 2rem; font-weight: 600; line-height: 1.3; }
.heading-3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
.text-body { font-size: 1rem; color: var(--text-secondary); }
.text-small { font-size: 0.875rem; color: var(--text-muted); }

a { color: inherit; text-decoration: none; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 0.95rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.btn-primary { background: var(--accent-primary); color: #fff; }
.btn-primary:hover { background: var(--accent-secondary); }
.btn-gradient { background: var(--accent-gradient); color: #fff; border: none; }
.btn-gradient:hover { background: var(--accent-gradient-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4); }

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 0.95rem;
  transition: all var(--transition-fast);
}

.form-control:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
`;
  }

  // ─── App Shell ────────────────────────────────────────

  private appComponentTs(): string {
    return `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: block; height: 100%; }'],
  imports: [RouterOutlet]
})
export class AppComponent {}
`;
  }

  private appComponentHtml(): string {
    return '<router-outlet></router-outlet>\n';
  }

  private appComponentCss(): string {
    return ':host { display: block; height: 100%; }\n';
  }

  private appConfigTs(): string {
    return `import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables())
  ]
};
`;
  }

  private appRoutesTs(): string {
    return `import { Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];
`;
  }

  // ─── Layouts ──────────────────────────────────────────

  private dashboardLayoutTs(): string {
    return `import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, AsyncPipe]
})
export class DashboardComponent {
  private sidebarService = inject(SidebarService);
  collapsed$ = this.sidebarService.collapsed$;
}
`;
  }

  private dashboardLayoutHtml(): string {
    return `<div class="dashboard-wrapper" [class.sidebar-collapsed]="collapsed$ | async">
  <app-sidebar></app-sidebar>
  <div class="main-area">
    <app-navbar></app-navbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  </div>
</div>
`;
  }

  private dashboardLayoutCss(): string {
    return `.dashboard-wrapper {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}
`;
  }

  // ─── Core Components ──────────────────────────────────

  private sidebarTs(): string {
    return `import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [RouterLink, RouterLinkActive, AsyncPipe]
})
export class SidebarComponent {
  private sidebarService = inject(SidebarService);
  collapsed$ = this.sidebarService.collapsed$;

  toggle(): void {
    this.sidebarService.toggle();
  }
}
`;
  }

  private sidebarHtml(): string {
    return `<aside class="sidebar" [class.collapsed]="collapsed$ | async">
  <div class="sidebar-header">
    <span class="heading-3">Groman<span class="text-gradient">2</span></span>
    <button class="toggle-btn" (click)="toggle()">Toggle</button>
  </div>
  <nav class="sidebar-nav">
    <a routerLink="/home" routerLinkActive="active" class="nav-item">Dashboard</a>
    <!-- Add your navigation items here -->
  </nav>
</aside>
`;
  }

  private sidebarCss(): string {
    return `.sidebar {
  width: 260px;
  background: var(--bg-surface);
  border-right: var(--glass-border);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-normal);
}
.sidebar.collapsed { width: 72px; }
.sidebar-header { padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; }
.sidebar-nav { padding: 0.5rem; flex: 1; }
.nav-item {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}
.nav-item:hover { background: var(--bg-surface-hover); color: var(--text-primary); }
.nav-item.active { color: var(--accent-primary); background: rgba(99, 102, 241, 0.1); }
.toggle-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; }
`;
  }

  private navbarTs(): string {
    return `import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private sidebarService = inject(SidebarService);

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }
}
`;
  }

  private navbarHtml(): string {
    return `<header class="navbar">
  <div class="navbar-left">
    <button class="hamburger-btn" (click)="toggleSidebar()">Menu</button>
    <input type="text" placeholder="Search..." class="search-input">
  </div>
  <div class="navbar-actions">
    <!-- Add notification bell, user profile, etc. -->
  </div>
</header>
`;
  }

  private navbarCss(): string {
    return `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: var(--glass-border);
}
.navbar-left { display: flex; align-items: center; gap: 1rem; }
.hamburger-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; }
.search-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-round);
  padding: 0.5rem 1rem;
  color: var(--text-primary);
  font-family: var(--font-family);
}
`;
  }

  private statCardTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  @Input() title = 'Statistic';
  @Input() value: string | number = '0';
  @Input() icon = '';
  @Input() trend = 0;
  @Input() accent: 'primary' | 'secondary' | 'success' | 'warning' = 'primary';
}
`;
  }

  private statCardHtml(): string {
    return `<div class="stat-card glass-panel">
  <div class="stat-header">
    <span class="stat-title">{{ title }}</span>
    <div class="stat-icon" [innerHTML]="icon"></div>
  </div>
  <div class="stat-value">{{ value }}</div>
  @if (trend !== 0) {
    <span class="stat-trend" [class.positive]="trend > 0" [class.negative]="trend < 0">
      {{ trend > 0 ? '+' : '' }}{{ trend }}%
    </span>
  }
</div>
`;
  }

  private statCardCss(): string {
    return `.stat-card { padding: 1.5rem; }
.stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.stat-title { color: var(--text-secondary); font-size: 0.9rem; }
.stat-icon { width: 40px; height: 40px; }
.stat-value { font-size: 2rem; font-weight: 700; }
.stat-trend { font-size: 0.85rem; font-weight: 500; }
.stat-trend.positive { color: var(--success); }
.stat-trend.negative { color: var(--danger); }
`;
  }

  // ─── Shared Components ────────────────────────────────

  private badgeTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: '<span class="badge" [class]="\'badge badge-\' + variant + \' badge-\' + size"><ng-content></ng-content></span>',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
`;
  }

  private badgeHtml(): string {
    return '<span class="badge"><ng-content></ng-content></span>\n';
  }

  private badgeCss(): string {
    return `.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-round);
  font-size: 0.8rem;
  font-weight: 500;
}
.badge-primary { background: rgba(99, 102, 241, 0.15); color: var(--accent-primary); }
.badge-success { background: rgba(16, 185, 129, 0.15); color: var(--success); }
.badge-warning { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
.badge-danger { background: rgba(239, 68, 68, 0.15); color: var(--danger); }
.badge-secondary { background: rgba(148, 163, 184, 0.15); color: var(--text-secondary); }
.badge-sm { padding: 0.15rem 0.5rem; font-size: 0.75rem; }
.badge-lg { padding: 0.35rem 1rem; font-size: 0.9rem; }
`;
  }

  private modalTs(): string {
    return `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
`;
  }

  private modalHtml(): string {
    return `@if (isOpen) {
  <div class="modal-backdrop" (click)="close()">
    <div class="modal-dialog" [class]="'modal-' + size" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" (click)="close()">X</button>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
}
`;
  }

  private modalCss(): string {
    return `.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-dialog {
  background: var(--bg-main);
  border: var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  width: 90%;
}
.modal-sm { max-width: 400px; }
.modal-md { max-width: 600px; }
.modal-lg { max-width: 800px; }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.close-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; }
`;
  }

  private collapsePanelTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-collapse-panel',
  template: \`
    <div class="collapse-panel glass-panel">
      <button class="collapse-header" (click)="expanded = !expanded">
        <span>{{ title }}</span>
        <span>{{ expanded ? '-' : '+' }}</span>
      </button>
      @if (expanded) {
        <div class="collapse-body"><ng-content></ng-content></div>
      }
    </div>
  \`,
  styleUrl: './collapse-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsePanelComponent {
  @Input() title = '';
  @Input() expanded = false;
}
`;
  }

  private collapsePanelHtml(): string {
    return '';
  }

  private collapsePanelCss(): string {
    return `.collapse-panel { overflow: hidden; }
.collapse-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 1rem;
  cursor: pointer;
}
.collapse-body { padding: 0 1.25rem 1rem; color: var(--text-secondary); }
`;
  }

  private progressBarTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: \`
    <div class="progress-track" [style.height.px]="height">
      <div class="progress-fill" [class]="'fill-' + variant"
        [class.striped]="striped" [class.animated]="animated"
        [style.width.%]="value">
      </div>
    </div>
    @if (label) { <span class="progress-label">{{ label }}</span> }
  \`,
  styleUrl: './progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() striped = false;
  @Input() animated = false;
  @Input() height = 8;
  @Input() label = '';
}
`;
  }

  private progressBarHtml(): string {
    return '';
  }

  private progressBarCss(): string {
    return `.progress-track {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-round);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: var(--radius-round);
  transition: width var(--transition-normal);
}
.fill-primary { background: var(--accent-primary); }
.fill-success { background: var(--success); }
.fill-warning { background: var(--warning); }
.fill-danger { background: var(--danger); }
.progress-label { font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem; }
`;
  }

  private dataTableTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  template: \`
    <div class="table-wrapper glass-panel">
      <table [class.striped]="striped" [class.hover]="hover" [class.bordered]="bordered">
        <thead>
          <tr>
            @for (col of columns; track col.key) {
              <th [style.width]="col.width">{{ col.label }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data; track $index) {
            <tr>
              @for (col of columns; track col.key) {
                <td>{{ row[col.key] }}</td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`,
  styleUrl: './data-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: Record<string, unknown>[] = [];
  @Input() striped = false;
  @Input() hover = true;
  @Input() bordered = false;
}
`;
  }

  private dataTableHtml(): string {
    return '';
  }

  private dataTableCss(): string {
    return `.table-wrapper { overflow-x: auto; padding: 1rem; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.75rem; text-align: left; }
th { color: var(--text-secondary); font-weight: 500; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
td { border-bottom: 1px solid rgba(255, 255, 255, 0.03); }
.striped tbody tr:nth-child(even) { background: rgba(255, 255, 255, 0.02); }
.hover tbody tr:hover { background: var(--bg-surface-hover); }
`;
  }

  private codeSnippetTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  template: \`
    <div class="code-block">
      <button class="copy-btn" (click)="copy()">{{ copied ? 'Copied!' : 'Copy' }}</button>
      <pre><code>{{ code }}</code></pre>
    </div>
  \`,
  styleUrl: './code-snippet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSnippetComponent {
  @Input() code = '';
  copied = false;

  copy(): void {
    navigator.clipboard.writeText(this.code);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
`;
  }

  private codeSnippetHtml(): string {
    return '';
  }

  private codeSnippetCss(): string {
    return `.code-block {
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
pre { padding: 1rem; margin: 0; overflow-x: auto; }
code { font-family: 'Courier New', monospace; font-size: 0.85rem; color: var(--text-secondary); }
.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--text-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}
`;
  }

  private spinnerTs(): string {
    return `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: '<div class="spinner" [class]="variant + \' \' + size" [style.--spinner-color]="color"></div>',
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() variant: 'circular' | 'dots' | 'pulse' = 'circular';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color = 'var(--accent-primary)';
}
`;
  }

  private spinnerHtml(): string {
    return '';
  }

  private spinnerCss(): string {
    return `.spinner.circular {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--spinner-color, var(--accent-primary));
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
.sm { width: 20px; height: 20px; }
.md { width: 32px; height: 32px; }
.lg { width: 48px; height: 48px; }
@keyframes spin { to { transform: rotate(360deg); } }
`;
  }

  private datePickerTs(): string {
    return `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  template: '<div class="date-picker"><input type="date" [placeholder]="placeholder" class="form-control"></div>',
  styleUrl: './date-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent {
  @Input() mode: 'single' | 'range' | 'minmax' = 'single';
  @Input() value: Date | null = null;
  @Input() rangeStart: Date | null = null;
  @Input() rangeEnd: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() placeholder = 'Select date';
  @Output() dateChange = new EventEmitter<Date>();
  @Output() rangeChange = new EventEmitter<{ start: Date; end: Date }>();
}
`;
  }

  private datePickerHtml(): string {
    return '';
  }

  private datePickerCss(): string {
    return `.date-picker { position: relative; }
`;
  }

  // ─── Directives ───────────────────────────────────────

  private tooltipDirectiveTs(): string {
    return `import { Directive, Input, ElementRef, HostListener, OnDestroy } from '@angular/core';

@Directive({ selector: '[appTooltip]' })
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  private tooltipEl: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    // Create and position tooltip element
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private removeTooltip(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
    }
  }
}
`;
  }

  private collapseDirectiveTs(): string {
    return `import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({ selector: '[appCollapse]' })
export class CollapseDirective implements OnChanges {
  @Input('appCollapse') isCollapsed = false;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const element = this.el.nativeElement;
    if (this.isCollapsed) {
      element.style.maxHeight = '0';
      element.style.overflow = 'hidden';
    } else {
      element.style.maxHeight = element.scrollHeight + 'px';
      element.style.overflow = 'visible';
    }
  }
}
`;
  }

  // ─── Services ─────────────────────────────────────────

  private sidebarServiceTs(): string {
    return `import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  private mobileOpenSubject = new BehaviorSubject<boolean>(false);

  collapsed$ = this.collapsedSubject.asObservable();
  mobileOpen$ = this.mobileOpenSubject.asObservable();

  get isCollapsed(): boolean { return this.collapsedSubject.value; }

  toggle(): void { this.collapsedSubject.next(!this.collapsedSubject.value); }
  collapse(): void { this.collapsedSubject.next(true); }
  expand(): void { this.collapsedSubject.next(false); }
  toggleMobile(): void { this.mobileOpenSubject.next(!this.mobileOpenSubject.value); }
  openMobile(): void { this.mobileOpenSubject.next(true); }
  closeMobile(): void { this.mobileOpenSubject.next(false); }
}
`;
  }

  private themeServiceTs(): string {
    return `import { Injectable } from '@angular/core';

export interface ThemeConfig {
  key: string;
  name: string;
  primary: string;
  secondary: string;
  gradientHover: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes: ThemeConfig[] = [
    { key: 'indigo', name: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', gradientHover: 'linear-gradient(135deg, #818cf8, #a78bfa)' },
    { key: 'blue', name: 'Blue', primary: '#3b82f6', secondary: '#2563eb', gradientHover: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
    { key: 'green', name: 'Green', primary: '#10b981', secondary: '#059669', gradientHover: 'linear-gradient(135deg, #34d399, #10b981)' },
    { key: 'purple', name: 'Purple', primary: '#a855f7', secondary: '#7c3aed', gradientHover: 'linear-gradient(135deg, #c084fc, #a78bfa)' },
    { key: 'red', name: 'Red', primary: '#ef4444', secondary: '#dc2626', gradientHover: 'linear-gradient(135deg, #f87171, #ef4444)' },
    { key: 'teal', name: 'Teal', primary: '#14b8a6', secondary: '#0d9488', gradientHover: 'linear-gradient(135deg, #2dd4bf, #14b8a6)' }
  ];

  constructor() {
    this.applyTheme(this.getTheme());
  }

  applyTheme(key: string): void {
    const theme = this.themes.find(t => t.key === key) || this.themes[0];
    const style = document.documentElement.style;
    style.setProperty('--accent-primary', theme.primary);
    style.setProperty('--accent-secondary', theme.secondary);
    style.setProperty('--accent-gradient', \`linear-gradient(135deg, \${theme.primary} 0%, \${theme.secondary} 100%)\`);
    style.setProperty('--accent-gradient-hover', theme.gradientHover);
    localStorage.setItem('groman-theme', key);
  }

  getTheme(): string {
    return localStorage.getItem('groman-theme') || 'indigo';
  }
}
`;
  }

  // ─── Pages ────────────────────────────────────────────

  private homeTs(): string {
    return `import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [StatCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
`;
  }

  private homeHtml(): string {
    return `<div class="page-container">
  <header class="page-header">
    <h1 class="heading-2">Dashboard</h1>
    <p class="text-body">Welcome to Groman2 Template. Start building your project here.</p>
  </header>
  <div class="stats-grid">
    <app-stat-card title="Total Users" value="0" [trend]="0" accent="primary"></app-stat-card>
    <app-stat-card title="Revenue" value="$0" [trend]="0" accent="success"></app-stat-card>
    <app-stat-card title="Orders" value="0" [trend]="0" accent="secondary"></app-stat-card>
    <app-stat-card title="Growth" value="0%" [trend]="0" accent="warning"></app-stat-card>
  </div>
</div>
`;
  }

  private homeCss(): string {
    return `.page-container { animation: fadeIn 0.5s ease-out; }
.page-header { margin-bottom: 2rem; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
  }

  private notFoundTs(): string {
    return `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  imports: [RouterLink]
})
export class NotFoundComponent {}
`;
  }

  private notFoundHtml(): string {
    return `<div class="not-found">
  <h1 class="heading-1">404</h1>
  <p class="text-body">Page not found</p>
  <a routerLink="/home" class="btn btn-primary">Go Home</a>
</div>
`;
  }

  private notFoundCss(): string {
    return `.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
  text-align: center;
}
`;
  }

  // ─── Environment ──────────────────────────────────────

  private environmentTs(): string {
    return `export const environment = {
  production: false
};
`;
  }

  private environmentProdTs(): string {
    return `export const environment = {
  production: true
};
`;
  }

  // ─── README ───────────────────────────────────────────

  private readmeMd(): string {
    return `# Groman2 Template

A modern Angular 21 dashboard template with dark glassmorphism design.

## Quick Start

\`\`\`bash
npm install
ng serve
\`\`\`

Open http://localhost:4200

## Features

- Dark glassmorphism UI design system
- CSS custom properties for easy theming
- 9 reusable shared components
- 2 custom directives
- Sidebar + Navbar layout
- 6 color themes (Indigo, Blue, Green, Purple, Red, Teal)
- Chart.js integration ready
- Fully standalone components (no NgModules)
- OnPush change detection

## Tech Stack

- Angular 21.2.4
- TypeScript 5.9
- Chart.js 4 + ng2-charts 10
- CSS Custom Properties
`;
  }
}
