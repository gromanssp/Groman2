import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css',
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsComponent {
  navItems = [
    { path: 'overview', label: 'Overview' },
    { path: 'components', label: 'Components' },
    { path: 'directives', label: 'Directives' },
    { path: 'services', label: 'Services' },
    { path: 'pages', label: 'Pages' },
    { path: 'security', label: 'Security Audit' },
    { path: 'download', label: 'Download Template' }
  ];
}
