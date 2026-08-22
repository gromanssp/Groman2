import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CollapsePanelComponent } from '../../../../shared/components/collapse-panel/collapse-panel.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

interface Panel {
  title: string;
  content: string;
  expanded: boolean;
}

@Component({
    selector: 'app-collapse-section',
    templateUrl: './collapse-section.component.html',
    styleUrl: './collapse-section.component.css',
    imports: [CollapsePanelComponent, CodeSnippetComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapseSectionComponent {
  protected readonly panels = signal<Panel[]>([
    { title: 'What is Angular?', content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.', expanded: false },
    { title: 'What are Components?', content: 'Components are the main building block for Angular applications. Each component consists of an HTML template, a TypeScript class that defines behavior, and a CSS selector that defines how the component is used in a template.', expanded: false },
    { title: 'What is Data Binding?', content: 'Data binding automatically keeps your page up-to-date based on your application state. You use data binding to specify things such as the source of an image, the state of a button, or data for a particular user.', expanded: false }
  ]);

  protected readonly accordionPanels = signal<Panel[]>([
    { title: 'Getting Started', content: 'Install the Angular CLI globally using npm install -g @angular/cli. Then create a new project with ng new my-app and serve it with ng serve.', expanded: true },
    { title: 'Project Structure', content: 'An Angular workspace contains one or more projects. A project is a set of files that make up an application or a library. The src folder contains the source files for the root-level application project.', expanded: false },
    { title: 'Deployment', content: 'When you are ready to deploy your Angular application, use ng build to compile the application into an output directory. The build artifacts will be stored in the dist/ directory.', expanded: false }
  ]);

  codes = {
    independent: `<app-collapse-panel title="Panel Title" [expanded]="false">\n  <p>Panel content here...</p>\n</app-collapse-panel>`,
    accordion: `toggleAccordion(index: number): void {\n  this.panels.forEach(p => p.expanded = false);\n  this.panels[index].expanded = true;\n}`
  };

  /** Accordion: opening one panel closes the rest. */
  protected toggleAccordion(index: number): void {
    this.accordionPanels.update(panels =>
      panels.map((panel, i) => ({ ...panel, expanded: i === index && !panels[index].expanded }))
    );
  }

  protected togglePanel(index: number): void {
    this.panels.update(panels =>
      panels.map((panel, i) => (i === index ? { ...panel, expanded: !panel.expanded } : panel))
    );
  }
}
