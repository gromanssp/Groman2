import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { TemplateGeneratorService } from './services/template-generator.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.css',
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsComponent {
  private templateGenerator = inject(TemplateGeneratorService);

  isGenerating = signal(false);

  navItems = [
    { path: 'overview', label: 'Overview' },
    { path: 'components', label: 'Components' },
    { path: 'directives', label: 'Directives' },
    { path: 'services', label: 'Services' },
    { path: 'pages', label: 'Pages' },
    { path: 'security', label: 'Security Audit' },
    { path: 'download', label: 'Download Template' }
  ];

  async downloadTemplate(): Promise<void> {
    this.isGenerating.set(true);
    try {
      await this.templateGenerator.generateTemplate();
    } finally {
      this.isGenerating.set(false);
    }
  }
}
