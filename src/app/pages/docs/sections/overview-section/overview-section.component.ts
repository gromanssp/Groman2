import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface TechItem {
  name: string;
  version: string;
  description: string;
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
  readonly projectVersion = '0.2.0';
  readonly angularVersion = '21.2.4';

  readonly techStack: TechItem[] = [
    { name: 'Angular', version: '21', description: 'Modern web framework with signals and standalone components' },
    { name: 'Chart.js', version: '4', description: 'Flexible JavaScript charting library' },
    { name: 'ng2-charts', version: '10', description: 'Angular bindings for Chart.js' },
    { name: 'TypeScript', version: '5.9', description: 'Typed superset of JavaScript' }
  ];

  readonly folderTree = `src/
\u251C\u2500\u2500 app/
\u2502   \u251C\u2500\u2500 components/        # Core UI (sidebar, navbar, stat-card)
\u2502   \u251C\u2500\u2500 directives/        # Tooltip, Collapse
\u2502   \u251C\u2500\u2500 layouts/           # Dashboard, Auth layouts
\u2502   \u251C\u2500\u2500 pages/             # Feature pages
\u2502   \u251C\u2500\u2500 services/          # Auth, Sidebar, Payment, Theme
\u2502   \u251C\u2500\u2500 shared/components/ # Reusable components (9)
\u2502   \u251C\u2500\u2500 app.config.ts      # App providers
\u2502   \u2514\u2500\u2500 app.routes.ts      # Route definitions
\u251C\u2500\u2500 assets/css/colors/     # Theme color files
\u251C\u2500\u2500 environments/          # Environment configs
\u2514\u2500\u2500 styles.css             # Global CSS variables`;

  readonly quickStartCode = `# Clone the repository
git clone https://github.com/your-repo/groman2.git

# Install dependencies
cd groman2
npm install

# Start development server
ng serve

# Open in browser
# http://localhost:4200`;
}
