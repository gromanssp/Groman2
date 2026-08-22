import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';

@Component({
  selector: 'app-alerts-section',
  templateUrl: './alerts-section.component.html',
  styleUrl: '../section-shared.css',
  imports: [AlertComponent, CodeSnippetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsSectionComponent {
  protected readonly noticeVisible = signal(true);

  protected readonly codes = {
    variants: `<app-alert variant="success" title="Saved">Your changes are live.</app-alert>\n<app-alert variant="warning" title="Heads up">Quota is at 80%.</app-alert>\n<app-alert variant="danger" title="Failed">Could not reach the server.</app-alert>\n<app-alert variant="info">A new version is available.</app-alert>`,
    dismissible: `<app-alert variant="info" title="Tip" [dismissible]="true" [(visible)]="noticeVisible">\n  Press ⌘K to jump anywhere.\n</app-alert>`
  };
}
