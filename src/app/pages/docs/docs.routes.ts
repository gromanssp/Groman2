import { Routes } from '@angular/router';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        title: 'Overview · Groman2 docs',
        data: { breadcrumb: 'Overview' },
        loadComponent: () =>
          import('./sections/overview-section/overview-section.component').then(m => m.OverviewSectionComponent)
      },
      {
        path: 'components',
        title: 'Components · Groman2 docs',
        data: { breadcrumb: 'Components' },
        loadComponent: () =>
          import('./sections/components-section/components-section.component').then(m => m.ComponentsSectionComponent)
      },
      {
        path: 'directives',
        title: 'Directives · Groman2 docs',
        data: { breadcrumb: 'Directives' },
        loadComponent: () =>
          import('./sections/directives-section/directives-section.component').then(m => m.DirectivesSectionComponent)
      },
      {
        path: 'services',
        title: 'Services · Groman2 docs',
        data: { breadcrumb: 'Services' },
        loadComponent: () =>
          import('./sections/services-section/services-section.component').then(m => m.ServicesSectionComponent)
      },
      {
        path: 'pages',
        title: 'Pages · Groman2 docs',
        data: { breadcrumb: 'Pages' },
        loadComponent: () =>
          import('./sections/pages-section/pages-section.component').then(m => m.PagesSectionComponent)
      },
      {
        path: 'security',
        title: 'Security · Groman2 docs',
        data: { breadcrumb: 'Security' },
        loadComponent: () =>
          import('./sections/security-section/security-section.component').then(m => m.SecuritySectionComponent)
      },
      {
        path: 'download',
        title: 'Download · Groman2 docs',
        data: { breadcrumb: 'Download' },
        loadComponent: () =>
          import('./sections/download-section/download-section.component').then(m => m.DownloadSectionComponent)
      }
    ]
  }
];
