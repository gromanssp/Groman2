import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { TemplateGeneratorService } from '../../services/template-generator.service';

@Component({
  selector: 'app-download-section',
  standalone: true,
  templateUrl: './download-section.component.html',
  styleUrl: './download-section.component.css',
  imports: [CodeSnippetComponent, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadSectionComponent {
  private templateGenerator = inject(TemplateGeneratorService);

  isGenerating = signal(false);

  readonly description = 'Download a clean Angular 21 project template with the Groman2 design system, all shared components, directives, and services pre-configured. No Firebase dependencies included.';

  readonly fileTree = `groman2-template/
\u251C\u2500\u2500 src/
\u2502   \u251C\u2500\u2500 app/
\u2502   \u2502   \u251C\u2500\u2500 components/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 sidebar/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 navbar/
\u2502   \u2502   \u2502   \u2514\u2500\u2500 stat-card/
\u2502   \u2502   \u251C\u2500\u2500 directives/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 tooltip.directive.ts
\u2502   \u2502   \u2502   \u2514\u2500\u2500 collapse.directive.ts
\u2502   \u2502   \u251C\u2500\u2500 layouts/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 dashboard-layout/
\u2502   \u2502   \u2502   \u2514\u2500\u2500 auth-layout/
\u2502   \u2502   \u251C\u2500\u2500 shared/components/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 badge/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 modal/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 collapse-panel/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 progress-bar/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 data-table/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 code-snippet/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 spinner/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 donation-button/
\u2502   \u2502   \u2502   \u2514\u2500\u2500 date-picker/
\u2502   \u2502   \u251C\u2500\u2500 services/
\u2502   \u2502   \u2502   \u251C\u2500\u2500 sidebar.service.ts
\u2502   \u2502   \u2502   \u2514\u2500\u2500 theme.service.ts
\u2502   \u2502   \u251C\u2500\u2500 app.config.ts
\u2502   \u2502   \u2514\u2500\u2500 app.routes.ts
\u2502   \u251C\u2500\u2500 assets/css/colors/
\u2502   \u251C\u2500\u2500 environments/
\u2502   \u2514\u2500\u2500 styles.css
\u251C\u2500\u2500 angular.json
\u251C\u2500\u2500 package.json
\u2514\u2500\u2500 tsconfig.json`;

  readonly instructions = [
    'Extract the downloaded ZIP file',
    'Run npm install to install dependencies',
    'Run ng serve to start the development server',
    'Open http://localhost:4200 in your browser'
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
