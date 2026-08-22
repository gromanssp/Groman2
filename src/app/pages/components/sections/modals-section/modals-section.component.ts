import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CodeSnippetComponent } from '../../../../shared/components/code-snippet/code-snippet.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-modals-section',
    templateUrl: './modals-section.component.html',
    styleUrl: './modals-section.component.css',
    imports: [CodeSnippetComponent, ModalComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalsSectionComponent {
  protected readonly showSmall = signal(false);
  protected readonly showMedium = signal(false);
  protected readonly showLarge = signal(false);

  codes = {
    small: `<app-modal [(isOpen)]="showSmall">\n  <p>Content here...</p>\n</app-modal>`,
    medium: `<app-modal [(isOpen)]="showMedium">\n  <p>Content here...</p>\n</app-modal>`,
    large: `<app-modal [(isOpen)]="showLarge">\n  <p>Content here...</p>\n</app-modal>`
  };
}
