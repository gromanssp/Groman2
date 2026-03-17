import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
    selector: 'app-progress-section',
    templateUrl: './progress-section.component.html',
    styleUrl: './progress-section.component.css',
    imports: [ProgressBarComponent, CodeSnippetComponent]
})
export class ProgressSectionComponent {
  dynamicValue = 45;

  codes = {
    values: `<app-progress-bar [value]="25" label="25%">\n</app-progress-bar>`,
    variants: `<app-progress-bar [value]="70" variant="success"\n  label="Success"></app-progress-bar>`,
    striped: `<app-progress-bar [value]="80" variant="success"\n  [striped]="true" [animated]="true">\n</app-progress-bar>`,
    heights: `<app-progress-bar [value]="60" [height]="16">\n</app-progress-bar>`,
    interactive: `<app-progress-bar [value]="dynamicValue"\n  [variant]="dynamicValue >= 80 ? 'success' : 'danger'"\n  [striped]="true" [animated]="true">\n</app-progress-bar>`,
    stacked: `<app-progress-bar [value]="30" variant="success">\n</app-progress-bar>\n<app-progress-bar [value]="20" variant="warning">\n</app-progress-bar>`
  };

  increase(): void {
    this.dynamicValue = Math.min(100, this.dynamicValue + 10);
  }

  decrease(): void {
    this.dynamicValue = Math.max(0, this.dynamicValue - 10);
  }
}
