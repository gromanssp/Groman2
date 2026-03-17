import { Routes } from '@angular/router';
import { DocsComponent } from './docs.component';
import { OverviewSectionComponent } from './sections/overview-section/overview-section.component';
import { ComponentsSectionComponent } from './sections/components-section/components-section.component';
import { DirectivesSectionComponent } from './sections/directives-section/directives-section.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';
import { PagesSectionComponent } from './sections/pages-section/pages-section.component';
import { SecuritySectionComponent } from './sections/security-section/security-section.component';
import { DownloadSectionComponent } from './sections/download-section/download-section.component';

export const DOCS_ROUTES: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewSectionComponent },
      { path: 'components', component: ComponentsSectionComponent },
      { path: 'directives', component: DirectivesSectionComponent },
      { path: 'services', component: ServicesSectionComponent },
      { path: 'pages', component: PagesSectionComponent },
      { path: 'security', component: SecuritySectionComponent },
      { path: 'download', component: DownloadSectionComponent }
    ]
  }
];
